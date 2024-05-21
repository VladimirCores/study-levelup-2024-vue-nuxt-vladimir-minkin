<script setup lang="ts">
import ButtonLink from '~/components/buttons/ButtonLink.vue';
import { useRouter } from 'vue-router';
import { TodoVO } from '~/model';
import { useTodosStore } from '~/stores';
import { onMounted, ref } from 'vue';

const router = useRouter();
const todosStore = useTodosStore();

const todoId = router.currentRoute.value.params.id as string;
const { requestTodoById: requestTodoData, getTodoItemFromListById } = todosStore;
console.log('> TodoItemPage -> setup:', { todoId });
const todo = ref<TodoVO | undefined>(getTodoItemFromListById(todoId));
const isLoading = ref<boolean>(!todo.value);
const loadingError = ref<string | undefined>();
onMounted(() => {
  if (isLoading.value) {
    requestTodoData(parseInt(todoId as string))
      .then((data: TodoVO) => {
        todo.value = data;
      })
      .catch((e) => {
        loadingError.value = e.toString();
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
});
</script>
<template>
  <span>Todo Item Page {{ todoId }}</span>
  <div v-if="todo">
    {{ todo }}
  </div>
  <span>
    <ButtonLink title="Home" to="/" />
  </span>
</template>
