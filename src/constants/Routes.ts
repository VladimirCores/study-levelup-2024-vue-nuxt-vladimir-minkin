const Routes = {
  HOME: '/',
  LOGIN: '/login',
  TODO_ITEM: '/:id'
};

export const LIST_OF_ALLOWED_ROUTES_UNAUTHENTICATED = [
  Routes.HOME,
  Routes.LOGIN,
];

export const getTodoItemRouteById = (id: string) => Routes.TODO_ITEM.replace(':id', id);

export default Routes;
