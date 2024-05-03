<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { LoadingState, NotificationType } from '~/enums';
import TodoInput from '~/components/TodoInput.vue';
import TodoHeader from '~/components/TodoHeader.vue';
import Notification from '~/components/general/Notification.vue';
import Spinner from '~/components/general/Spinner.vue';
import { NotificationVO, TodosVO, TodoVO } from '~/model';
import Resources from '~/constants/Resources.ts';
import TodoList from '~/components/TodoList.vue';

const user = ref<Record<string, any>>({ avatar: `https://i.pravatar.cc/150?img=${Math.ceil(Math.random() * 5)}` });

const error = ref<Error | null>(null);
const todos = ref<TodosVO>([]);
const todoText = ref<string>('');

const stateProcessing = ref<LoadingState>(LoadingState.NONE);
const stateInitial = ref<LoadingState>(LoadingState.NONE);

const notification = ref<NotificationVO | null>();

const isNotificationVisible = computed(() => !!notification.value);
const isInputLocked = computed(() => [LoadingState.LOADING].includes(stateProcessing.value));

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

onMounted(() => {
  stateInitial.value = LoadingState.LOADING;
  fetch(Resources.TODOS)
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
      error.value = e;
      stateInitial.value = LoadingState.ERROR;
    });
});
</script>
<template>
  <div class="app flex flex-col space-y-2 items-start justify-start pt-2">
    <TodoHeader :user="user" />
    <div class="flex flex-row space-x-3 items-center">
      <TodoInput v-model:text="todoText" :locked="isInputLocked" @create="onTodoInputCreate" />
      <Spinner v-if="stateProcessing === LoadingState.LOADING" />
    </div>
    <TodoList :list="todos" :error="error" :state-initial="stateInitial" />
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
