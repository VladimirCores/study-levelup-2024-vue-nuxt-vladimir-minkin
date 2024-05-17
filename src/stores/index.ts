import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TodosVO } from '~/model';
import { getTodoItemPathById } from '~/constants/Resources.ts';

const todos = <TodosVO>[];

export const useTodosStore = defineStore('todos', () => {
  const list = ref<TodosVO>(todos);
  const requestTodoById = async (id: number) => fetch(getTodoItemPathById(id)).then((res) => res.json());
  return { list, requestTodoById };
});
