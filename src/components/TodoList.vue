<script setup lang="ts">
import Strings from '~/constants/Strings.ts';
import { LoadingState } from '~/enums';
import { TodosVO, TodoVO } from '~/model';
import TodoItem from '~/components/TodoItem.vue';
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
</script>
<template>
  <div class="flex flex-row w-full">
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
      <ul class="flex flex-col space-y-1 w-full">
        <TodoItem
          v-for="(todo, index) in (list as TodosVO)"
          :key="todo.id"
          v-bind="todo"
          :is-selected="selectedTodo === todo"
          @complete="$emit('complete', index)"
          @delete="$emit('delete', index)"
          @edit="$emit('edit', index)"
        />
      </ul>
    </div>
    <div v-else>
      {{ Strings.TODO_STATE__NO_DATA }}
    </div>
  </div>
</template>
