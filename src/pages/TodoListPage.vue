<script setup lang="ts">

import { computed, onMounted, ref, watch } from 'vue';
import { LoadingState, NotificationType } from '~/enums';
import TodoInput from '~/components/TodoInput.vue';

import Notification from '~/components/general/Notification.vue';
import Spinner from '~/components/general/Spinner.vue';
import { NotificationVO, TodosVO, TodoVO } from '~/model';
import Resources from '~/constants/Resources.ts';
import TodoList from '~/components/TodoList.vue';
import Storage from '~/constants/Storage.ts';

import { useRouter } from 'vue-router';
import { debounce } from '~/utils/TimerUtils.ts';
import { askToConfirmUserAboutRemovalOfEnteredText } from '~/utils/ConfirmUtils.ts';
import { useTodosStore } from '~/stores';
import { storeToRefs } from 'pinia';

import { useQuery } from '@vue/apollo-composable';
import GetUserTodos from '~/model/graphql/getUserTodos.graphql.ts';

const router = useRouter();
const todosStore = useTodosStore();
const usersList = ref(['f6e66dbb-8b54-4c44-9ea9-db1aa753ed62', 'e0886d1b-70bb-409c-b65d-c81baf060634']);
const selectedUserIndex = ref(0);
const pageIndex = ref(0);
const pageLimit = ref(3);
let pageCount = -1;

const initialError = ref<Error | undefined>(undefined);
const { list: todos } = storeToRefs(todosStore);
// const todos = ref<TodosVO>((inject(PROVIDE_KEY_TODOS) as TodosStore).list as TodosVO);
const todosFiltered = ref<TodosVO>([]);
const selectedTodo = ref<TodoVO | undefined>(undefined);
const todoText = ref<string>('');
const todoSearch = ref<string>((router.currentRoute.value.query.search as string) || '');
const todoSearchLowerCase = computed(() => todoSearch.value.toLowerCase());

const stateProcessing = ref<LoadingState>(LoadingState.NONE);
const stateInitial = ref<LoadingState>(LoadingState.NONE);

const notification = ref<NotificationVO | null>();

const isNotificationVisible = computed<boolean>(() => !!notification.value);
const isInputLocked = computed<boolean>(() =>
  [LoadingState.LOADING].includes(stateProcessing.value) || !!initialError.value);
const isEditTodoEnabled = computed(() => !!selectedTodo.value);
const isSelectedTodoChanged = computed(() => todoText.value !== selectedTodo.value?.text);

const getFilteredTodoListFromSearch = (list: TodosVO, searchText: string) => !!searchText ? list.filter((todo) => todo.text.toLowerCase().includes(searchText)) : list;

const updateFilteredTodoList = () => {
  todosFiltered.value = getFilteredTodoListFromSearch(todos.value, todoSearchLowerCase.value);
};

const getSelectedUserId = computed(() => usersList.value[selectedUserIndex.value]);
const getPageOffset = computed(() => pageIndex.value * pageLimit.value);

const { result, onResult } = useQuery(GetUserTodos, () => (
  {
    userId: getSelectedUserId.value,
    limit: pageLimit.value,
    offset: getPageOffset.value
  }));

onResult(result => {
  if (result.loading) {
    stateInitial.value = LoadingState.LOADING;
  } else if(!result.loading && !result.error) {
    stateInitial.value = LoadingState.SUCCESS;
    pageCount = Math.ceil(result.data.todos_aggregate?.aggregate.count / pageLimit.value);
    onInitialDataLoadingSuccess(result.data.todos);
  }
  if (!result.loading) {
    restoreUserInputFromLocalStorage();
  }
  console.log('> useQuery -> onResult:', result);
});
watch(result, (value) => {
  console.log('> useQuery -> watch:', value);
});

const onInitialDataLoadingSuccess = (list: TodosVO) => {
  const newTodos = list.filter((item) => { return !todos.value.find((todo => todo.id === item.id)); });
  todos.value.push(...newTodos);
  updateFilteredTodoList();
};

const restoreUserInputFromLocalStorage = () => {
  const userInputFromLS = localStorage.getItem(Storage.LOCAL_KEY__USER_TODO_INPUT);
  if (userInputFromLS) {
    todoText.value = userInputFromLS;
  }
};

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
      onInitialDataLoadingSuccess(list);
      stateInitial.value = LoadingState.SUCCESS;
    })
    .catch((e) => {
      initialError.value = e;
      stateInitial.value = LoadingState.ERROR;
    })
    .finally(restoreUserInputFromLocalStorage);
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

const setSelectedTodo = (input: TodoVO | undefined) => {
  selectedTodo.value = input;
  todoText.value = selectedTodo.value?.text || '';
};

const shouldDeselectCurrentTodo = (todoVO: TodoVO | undefined) => !!selectedTodo.value && selectedTodo.value === todoVO;

const onTodoItemEdit = (index: number) => {
  console.log('> App -> onTodoItemEdit', { index });
  const todoVO = todos.value[index];
  if (!todoVO) return alert(`There is not todo with index: ${index}`);
  if (shouldDeselectCurrentTodo(todoVO)) {
    return setSelectedTodo(undefined);
  }
  // console.log('> isSelectedTodoChanged.value = ', isSelectedTodoChanged.value);
  if (askToConfirmUserAboutRemovalOfEnteredText(todoText.value, isSelectedTodoChanged.value)) {
    setSelectedTodo(todoVO);
  }
};

const onTodoItemDelete = (index: number) => {
  console.log('> App -> onTodoItemDelete', { index });
  if (confirm(`Are you sure to delete todo #${index+1}`)) {
    todos.value.splice(index, 1);
  }
};

onMounted(() => {
  console.log('> App -> onMounted');
});

watch(selectedUserIndex, (value, oldValue) => {
  if (value !== oldValue) todos.value = [];
});
watch(pageIndex, (value, oldValue) => {
  if (value !== oldValue) todos.value = [];
});
watch(todoText, (value) => {
  console.log('> App -> watch: todoText', { value, v: todoText.value });
  localStorage.setItem(Storage.LOCAL_KEY__USER_TODO_INPUT, value);
});

const todoSearchDebounce = debounce(500);

watch(todoSearch, (value) => {
  console.log('> App -> watch: todoSearch', { value, v: todoSearch.value });
  const { query: currentQuery } = router.currentRoute.value;
  const isSearchEmpty = !value;
  console.log('> \t currentQuery:', { currentQuery });
  router.replace({ query: isSearchEmpty ? { } : { search: value } });
  todoSearchDebounce().then(updateFilteredTodoList);
});
</script>
<template>
  <select v-model="selectedUserIndex">
    <option v-for="(userId, index) in usersList" :key="userId" :value="index">
      {{ userId }}
    </option>
  </select>
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
    :list="todosFiltered"
    :error="initialError?.toString()"
    :state-initial="stateInitial"
    :selected-todo="selectedTodo"
    @reload="onInitialDataReload"
    @complete="onTodoItemComplete"
    @delete="onTodoItemDelete"
    @edit="onTodoItemEdit"
  >
    <template #header>
      <div class="flex flex-col space-y-2 pb-2 w-full">
        <span class="text-xs text-gray-400">Number of items:
          <span class="font-bold text-gray-600">{{ todos.length }}</span></span>
        <div class="flex flex-row w-full space-x-2 items-center">
          <span class="text-xs text-gray-600">Search:</span>
          <input v-model="todoSearch" class="rounded border border-gray-400 h-[32px] p-1 w-full">
        </div>
      </div>
    </template>
  </TodoList>
  <div v-if="todos.length > 0" class="flex flex-col">
    <select v-model="pageIndex">
      <option v-for="(pageId, index) in pageCount" :key="pageId" :value="index">
        {{ pageId }}
      </option>
    </select>
    <div>
      {{ pageIndex + 1 }} / {{ pageCount }}
    </div>
  </div>
  <Transition name="fade">
    <Notification
      v-if="isNotificationVisible"
      v-bind="notification!"
      @close="onNotificationClose"
    />
  </Transition>
</template>
