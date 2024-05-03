<script setup lang="ts">
import Strings from '~/constants/Strings.ts';
import { LoadingState } from '~/enums';
import { TodosVO } from '~/model';
import TodoItem from '~/components/TodoItem.vue';
defineProps<{
  stateInitial: LoadingState,
  error: string,
  list: TodosVO
}>();
</script>
<template>
  <div class="flex flex-row w-full">
    <div v-if="LoadingState.LOADING === stateInitial">
      {{ Strings.TODO_STATE__LOADING }}
    </div>
    <div v-else-if="LoadingState.ERROR === stateInitial">
      {{ Strings.TODO_STATE__ERROR }}
      {{ error }}
    </div>
    <template v-else-if="LoadingState.SUCCESS === stateInitial">
      <ul class="flex flex-col space-y-1 w-full">
        <TodoItem
          v-for="todo in (list as TodosVO)"
          :key="todo.id"
          v-bind="todo"
        />
      </ul>
    </template>
    <div v-else>
      {{ Strings.TODO_STATE__NO_DATA }}
    </div>
  </div>
</template>
