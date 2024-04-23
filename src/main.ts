import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { PROVIDE_KEY_SETTINGS } from './constants';
import THEME from './assets/settings/theme.json';

const app = createApp(App);

app.provide(PROVIDE_KEY_SETTINGS, { theme: THEME });

app.mount(document.getElementById('app') as Element);

