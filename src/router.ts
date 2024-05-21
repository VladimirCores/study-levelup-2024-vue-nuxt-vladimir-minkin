import { createWebHistory, createRouter } from 'vue-router';

import TodoListPage from '~/pages/TodoListPage.vue';
import Routes, { LIST_OF_ALLOWED_ROUTES_UNAUTHENTICATED } from '~/constants/Routes.ts';
import LoginPage from '~/pages/LoginPage.vue';

const routes = [
  { path: Routes.HOME, component: TodoListPage },
  { path: Routes.LOGIN, component: LoginPage },
  { path: Routes.TODO_ITEM, component: () => import('~/pages/TodoItemPage.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const isAuthenticated = true;//Math.random() > 0.5;
  console.log('> router -> beforeEach', { isAuthenticated });
  const shouldNavigateToLoginPage = !LIST_OF_ALLOWED_ROUTES_UNAUTHENTICATED.includes(to.path) && !isAuthenticated;
  if (shouldNavigateToLoginPage) next(Routes.LOGIN);
  else next();
});

export default router;
