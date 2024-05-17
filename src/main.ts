import '~/style.css';

import { createApp } from 'vue';
import App from '~/App.vue';
import TodosStore from '~/stores/todosStore';
import {
  PROVIDE_KEY_SETTINGS,
  PROVIDE_KEY_TODOS
} from '~/constants';
import THEME from '~/assets/settings/theme.json';

import runServer from '~/server.ts';
import router from '~/router.ts';
import { createPinia } from 'pinia';

if (process.env.NODE_ENV === 'development') {
  runServer();
}
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide(PROVIDE_KEY_SETTINGS, { theme: THEME });
app.provide(PROVIDE_KEY_TODOS, new TodosStore());

app.mount(document.getElementById('app') as Element);

