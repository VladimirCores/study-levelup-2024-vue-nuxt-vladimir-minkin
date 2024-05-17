import { TodoVO } from '~/model';

const list = <TodoVO>[];

class TodoState {
  get list() {
    return list;
  }
}

export default TodoState;
