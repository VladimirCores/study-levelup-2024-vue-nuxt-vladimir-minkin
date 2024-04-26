<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import Strings from './constants/Strings.ts';
import { LoadingState } from '~/enums';
import Resources from '~/constants/Resources.ts';

const todos = ref<any[] | Error>([]);
const state = ref<LoadingState>(LoadingState.NONE);

onMounted(() => {
  state.value = LoadingState.LOADING;
  fetch(Resources.TODOS)
    .then((res) => res.json())
    .then((json) => {
      if (!json.list) throw new Error('Data structure missing');
      todos.value = json.list;
      state.value = LoadingState.SUCCESS;
    })
    .catch((e) => {
      todos.value = e;
      state.value = LoadingState.ERROR;
    });
});

</script>
<template>
  <div class="container flex flex-col space-y-2 items-start justify-start leading-none">
    <div class="flex flex-row items-center space-x-2">
      <h1 class="text-2xl font-semibold leading-none">
        Todo App
      </h1>
      <Icon icon="tabler:a-b" class="text-md" />
    </div>
    <div class="flex flex-row space-x-2">
      <input type="text" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="This is placeholder">
      <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
        Create
      </button>
    </div>
    <div class="flex flex-row">
      <div v-if="state === LoadingState.LOADING">
        {{ Strings.TODO_STATE__LOADING }}
      </div>
      <div v-else-if="state === LoadingState.ERROR">
        {{ Strings.TODO_STATE__ERROR }}
        {{ todos }}
      </div>
      <div v-else-if="state === LoadingState.SUCCESS" class="flex flex-col">
        {{ todos }}
      </div>
      <div v-else>
        {{ Strings.TODO_STATE__NO_DATA }}
      </div>
    </div>
  </div>
</template>
