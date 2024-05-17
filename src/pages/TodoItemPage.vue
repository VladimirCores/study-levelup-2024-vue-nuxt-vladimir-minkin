<script setup lang="ts">
import ButtonLink from '~/components/buttons/ButtonLink.vue';
import { useRouter } from 'vue-router';
import { TodosVO, TodoVO } from '~/model';
import { useTodosStore } from '~/stores';
import { storeToRefs } from 'pinia';
import { onMounted, ref, Ref } from 'vue';

const router = useRouter();
const todosStore = useTodosStore();

const todoId = router.currentRoute.value.params.id;
const { list: todos }: { list: Ref<TodosVO> } = storeToRefs(todosStore);
const { requestTodoById: requestTodoData } = todosStore;
// const todos = (inject(PROVIDE_KEY_TODOS) as TodosStore).list;
const hasTodoList = todos.value.length > 0;
console.log('> TodoItemPage -> setup:', { hasTodoList });
const todo = ref<TodoVO | undefined>(hasTodoList
  ? (todos.value.find((todo: TodoVO) => todo.id === todoId)) : undefined);
onMounted(() => {
  if (!todo.value) {
    requestTodoData(parseInt(todoId as string)).then((data: TodoVO) => {
      todo.value = data;
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
