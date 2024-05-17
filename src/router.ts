import { createWebHistory, createRouter } from 'vue-router';

import TodoListPage from '~/pages/TodoListPage.vue';
import Routes from '~/constants/Routes.ts';

const routes = [
  { path: Routes.HOME, component: TodoListPage },
  { path: Routes.TODO_ITEM, component: () => import('~/pages/TodoItemPage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
