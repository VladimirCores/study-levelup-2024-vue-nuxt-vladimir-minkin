import '~/style.css';

import { createApp } from 'vue';
import App from '~/App.vue';
import { PROVIDE_KEY_SETTINGS } from '~/constants';
import THEME from '~/assets/settings/theme.json';

import runServer from '~/server.ts';

if (process.env.NODE_ENV === 'development') {
  runServer();
}
const app = createApp(App);

app.provide(PROVIDE_KEY_SETTINGS, { theme: THEME });

app.mount(document.getElementById('app') as Element);

