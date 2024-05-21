import { defineStore } from 'pinia';
import { ref } from 'vue';
import { TodosVO, TodoVO } from '~/model';
import { getTodoItemPathById } from '~/constants/Resources.ts';

const todos = <TodosVO>[];

export const useTodosStore = defineStore('todos', () => {
  const list = ref<TodosVO>(todos);
  const requestTodoById = async (id: number) => fetch(getTodoItemPathById(id)).then((res) => res.json()).catch((e) => {
    console.log('> useTodosStore -> requestTodoById: error =', e);
    throw e;
  });
  const getTodoItemFromListById = (todoId: string) => todos.find((todo: TodoVO) => todo.id === todoId);
  return { list, requestTodoById, getTodoItemFromListById };
});
