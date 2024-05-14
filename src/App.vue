<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { LoadingState, NotificationType } from '~/enums';
import TodoInput from '~/components/TodoInput.vue';
import TodoHeader from '~/components/TodoHeader.vue';
import Notification from '~/components/general/Notification.vue';
import Spinner from '~/components/general/Spinner.vue';
import { NotificationVO, TodosVO, TodoVO } from '~/model';
import Resources from '~/constants/Resources.ts';
import TodoList from '~/components/TodoList.vue';
import Storage from '~/constants/Storage.ts';

const user = ref<Record<string, any>>({ avatar: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 5)}` });

const initialError = ref<Error | undefined>(undefined);
const todos = ref<TodosVO>([]);
const selectedTodo = ref<TodoVO | undefined>(undefined);
const todoText = ref<string>('');

const stateProcessing = ref<LoadingState>(LoadingState.NONE);
const stateInitial = ref<LoadingState>(LoadingState.NONE);

const notification = ref<NotificationVO | null>();

const isNotificationVisible = computed<boolean>(() => !!notification.value);
const isInputLocked = computed<boolean>(() =>
  [LoadingState.LOADING].includes(stateProcessing.value) || !!initialError.value);
const isEditTodoEnabled = computed(() => !!selectedTodo.value);
const isSelectedTodoChanged = computed(() => todoText.value !== selectedTodo.value?.text);

const fetchInitialData = () => {
  initialError.value = undefined;
  stateInitial.value = LoadingState.LOADING;
  return fetch(Resources.TODOS)
    .then((res) => res.json())
    .then((data: any) => {
      if (data.hasOwnProperty('errors')) throw new Error('Data structure missing');
      return data.list as TodosVO;
    })
    .then((list: TodosVO) => {
      todos.value = list;
      stateInitial.value = LoadingState.SUCCESS;
    })
    .catch((e) => {
      initialError.value = e;
      stateInitial.value = LoadingState.ERROR;
    })
    .finally(() => {
      const userInputFromLS = localStorage.getItem(Storage.LOCAL_KEY__USER_TODO_INPUT);
      if (userInputFromLS) {
        todoText.value = userInputFromLS;
      }
    });
};

const onTodoInputChange = (text: string) => {
  console.log('> App -> onTodoInputChange', { text });
};

const onTodoInputEdit = () => {
  console.log('> App -> onTodoInputEdit', { text: todoText.value });
  selectedTodo.value!.text = todoText.value;
  todoText.value = '';
  selectedTodo.value = undefined;
};

const onTodoInputCreate = () => {
  console.log('> App -> onTodoInputCreate', { text: todoText.value });
  const isTextEmpty = todoText.value.length === 0;
  if (isTextEmpty) return notification.value = {
    message: 'Empty text is not allowed.',
    type: NotificationType.INFO
  };

  notification.value = null;
  stateProcessing.value = LoadingState.LOADING;

  fetch(Resources.TODOS,
    {
      method: 'POST',
      body: JSON.stringify({ text: todoText.value })
    })
    .then((resp) => resp.json())
    .then((data: any) => {
      if (data.hasOwnProperty('errors')) throw new Error(data.errors!);
      return data as TodoVO;
    })
    .then((todoVO: TodoVO) => {
      stateProcessing.value = LoadingState.SUCCESS;
      todos.value.unshift(todoVO);
      todoText.value = '';
      notification.value = {
        message: 'Todo create success',
        type: NotificationType.SUCCESS
      };
    })
    .catch((errors: any) => {
      notification.value = {
        message: errors.toString(),
        type: NotificationType.ERROR
      };
      stateProcessing.value = LoadingState.ERROR;
    });
};

const onNotificationClose = () => {
  console.log('> App -> onNotificationClose');
  notification.value = null;
};

const onInitialDataReload = () => {
  console.log('> App -> onInitialDataReload');
  fetchInitialData();
};

const onTodoItemComplete = (index: number) => {
  console.log('> App -> onTodoItemComplete', { index });
  const todoVO = todos.value[index];
  if (todoVO) {
    todoVO.completed = !todoVO.completed;
  }
};

const onTodoItemEdit = (index: number) => {
  console.log('> App -> onTodoItemEdit', { index });
  const todoVO = todos.value[index];
  if (!todoVO) return alert(`There is not todo with index: ${index}`);
  const shouldDeselectCurrentTodo = !!selectedTodo.value && selectedTodo.value === todoVO;
  if (shouldDeselectCurrentTodo) {
    selectedTodo.value = undefined;
    todoText.value = '';
    return;
  }
  const isInputEmpty = !todoText.value;
  console.log('> isSelectedTodoChanged.value = ', isSelectedTodoChanged.value);
  if (isInputEmpty || (!isInputEmpty && !isSelectedTodoChanged.value) || (!isInputEmpty && confirm('Text you have entered will be removed. Do you want to continue?')))
  {
    selectedTodo.value = todoVO;
    todoText.value = selectedTodo.value.text;
  }
};

const onTodoItemDelete = (index: number) => {
  console.log('> App -> onTodoItemDelete', { index });
  if (confirm(`Are you sure to delete todo #${index+1}`))
  {
    todos.value.splice(index, 1);
  }
};

onMounted(() => {
  console.log('> App -> onMounted');
  fetchInitialData();
});

watch(todoText, (value) => {
  console.log('> App -> watch: todoText', { value, v: todoText.value });
  localStorage.setItem(Storage.LOCAL_KEY__USER_TODO_INPUT, value);
});

</script>
<template>
  <div class="app flex flex-col space-y-2 items-start justify-start mt-2">
    <TodoHeader :user="user" />
    <TodoInput
      v-model:text="todoText"
      :locked="isInputLocked"
      :is-editable="isEditTodoEnabled"
      :is-action-possible="!selectedTodo || (selectedTodo && isSelectedTodoChanged)"
      @create="onTodoInputCreate"
      @edit="onTodoInputEdit"
      @change="onTodoInputChange"
    >
      <template #default>
        <Spinner v-if="stateProcessing === LoadingState.LOADING" />
      </template>
    </TodoInput>
    <TodoList
      :list="todos"
      :error="initialError?.toString()"
      :state-initial="stateInitial"
      :selected-todo="selectedTodo"
      @reload="onInitialDataReload"
      @complete="onTodoItemComplete"
      @delete="onTodoItemDelete"
      @edit="onTodoItemEdit"
    >
      <template #header="{ length }">
        <div class="pb-2">
          <span class="text-xs text-gray-400">Number of items:
            <span class="font-bold text-gray-600">{{ length }}</span></span>
        </div>
      </template>
    </TodoList>
  </div>
  <Transition name="fade">
    <Notification
      v-if="isNotificationVisible"
      v-bind="notification!"
      @close="onNotificationClose"
    />
  </Transition>
</template>
<style>
.app {
  @apply container;
  @apply leading-none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
