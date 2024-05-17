<script setup lang="ts">
import Strings from '~/constants/Strings.ts';
import { LoadingState } from '~/enums';
import { TodosVO, TodoVO } from '~/model';
import TodoItem from '~/components/TodoItem.vue';
import { getTodoItemRouteById } from '~/constants/Routes.ts';
defineProps<{
  stateInitial: LoadingState,
  error: string | undefined,
  selectedTodo?: TodoVO,
  list: TodosVO
}>();
defineEmits<{
  complete: [number],
  edit: [number],
  delete: [number],
  reload: []
}>();
const generateUniqueKey = (id: string = '') => `${Date.now() + id}`;
</script>
<template>
  <div :key="generateUniqueKey()" class="flex flex-row w-full">
    <div v-if="LoadingState.LOADING === stateInitial">
      {{ Strings.TODO_STATE__LOADING }}
    </div>
    <div
      v-else-if="LoadingState.ERROR === stateInitial"
      class="flex flex-col space-y-2 w-full items-start"
    >
      <span class="font-bold">{{ Strings.TODO_STATE__ERROR }}</span>
      <span class="text-xs">{{ error }}</span>
      <button
        class="p-2 border bg-gray-200 rounded-lg"
        @click.prevent.stop="$emit('reload')"
      >
        Reload
      </button>
    </div>
    <div
      v-else-if="LoadingState.SUCCESS === stateInitial"
      class="flex flex-col w-full"
    >
      <slot name="header" :length="list.length" />
      <ul v-if="list.length" class="flex flex-col space-y-1 w-full">
        <template
          v-for="(todo, index) in (list as TodosVO)"
          :key="generateUniqueKey(todo.id)"
        >
          <RouterLink :to="`${getTodoItemRouteById(todo.id!)}`">
            <TodoItem
              v-bind="todo"
              :is-selected="selectedTodo === todo"
              @complete="$emit('complete', index)"
              @delete="$emit('delete', index)"
              @edit="$emit('edit', index)"
            />
          </RouterLink>
        </template>
      </ul>
      <div v-else class="p-2 border rounded w-full text-center">
        <span class="text-xs font-bold text-gray-600">No elements present</span>
      </div>
    </div>
    <div v-else>
      {{ Strings.TODO_STATE__NO_DATA }}
    </div>
  </div>
</template>
