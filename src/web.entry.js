import './style/style.scss';
import { createApp } from './entry';

const { app } = createApp(window.__INITIAL_STATE__);
app.$mount('#app');
