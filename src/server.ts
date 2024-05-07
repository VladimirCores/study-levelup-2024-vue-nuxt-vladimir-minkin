import { createServer, Factory, Model, Response } from 'miragejs';
import { TodosVO, TodoVO } from '~/model';
import { faker } from '@faker-js/faker';

const generateError = (msg: string) => {
  const headers = {};
  const data = { errors: [msg] };
  return new Response(500, headers, data);
};

const runServer = () => createServer({
  models: {
    todos: Model.extend<TodoVO[]>([]),
  },
  factories: {
    todo: Factory.extend<TodoVO>({
      id(i: number) { return i.toString(); },
      text() { return faker.lorem.text(); },
      createdAt() { return Date.now(); },
      completed() { return false; },
    })
  },
  routes() {
    this.namespace = 'api';

    this.get('/todos', () => {
      // if (Math.random() < 0.5) return generateError('Server did not respond');
      return {
        list: [
          { id: '1', text: 'Inception', completed: false, createdAt: Date.now() },
          { id: '2', text: 'Interstellar', completed: false, createdAt: Date.now() },
          { id: '3', text: 'Dunkirk', completed: false, createdAt: Date.now() },
        ] as TodosVO,
      };
    });
    this.post('/todos', (_, request) => {
      if (Math.random() < 0.5) return generateError('Server error saving data');
      const todo = JSON.parse(request.requestBody) as TodoVO;
      const createdAt = Date.now();
      return {
        id: createdAt.toString(),
        text: todo.text,
        createdAt,
        completed: false,
      };
    });
  },
});

export default runServer;
