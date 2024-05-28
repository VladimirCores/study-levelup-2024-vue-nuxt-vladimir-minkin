import '~/style.css';

import { createApp } from 'vue';
import App from '~/App.vue';
import TodosStore from '~/stores/todosStore';
import {
  PROVIDE_KEY_SETTINGS,
  PROVIDE_KEY_TODOS
} from '~/constants';
import THEME from '~/assets/settings/theme.json';

import router from '~/router.ts';
import { createPinia } from 'pinia';
import { DefaultApolloClient } from '@vue/apollo-composable';
import apolloClient from '~/apollo.ts';

const isDevelopment = import.meta.env.DEV;
const isGraphQL = import.meta.env.MODE === 'graphql';
if (isDevelopment && !isGraphQL) {
  console.log('> App -> import mirage server');
  await import('~/server.ts')
    .then(({ default: runServer }) => runServer());
}

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.provide(PROVIDE_KEY_SETTINGS, { theme: THEME });
app.provide(PROVIDE_KEY_TODOS, new TodosStore());
app.provide(DefaultApolloClient, apolloClient);

app.mount(document.getElementById('app') as Element);

