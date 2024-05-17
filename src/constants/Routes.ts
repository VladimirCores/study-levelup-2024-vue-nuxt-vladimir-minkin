const Routes = {
  HOME: '/',
  TODO_ITEM: '/:id'
};

export const getTodoItemRouteById = (id: string) => Routes.TODO_ITEM.replace(':id', id);

export default Routes;
