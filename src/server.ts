import { createServer } from 'miragejs';

const runServer = () => createServer({
  routes() {
    this.namespace = 'api';

    this.get('/todos', () => {
      if (Math.random() < 0.5) { return new Error(); }
      return {
        list: [
          { id: 1, title: 'Inception', completed: false },
          { id: 2, title: 'Interstellar', completed: false },
          { id: 3, title: 'Dunkirk', completed: false },
        ],
      };
    });
  },
});

export default runServer;
