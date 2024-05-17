const Resources = {
  TODOS: '/api/todos',
  TODO_ITEM: '/api/todos/:id'
};

export const getTodoItemPathById = (index: number) => Resources.TODO_ITEM.replace(':id', `${index}`);

export default Resources;
