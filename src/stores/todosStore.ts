import { TodosVO } from '~/model';

const list = <TodosVO>[];

class TodoState {
  get list() {
    return list;
  }
}

export default TodoState;
