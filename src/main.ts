import { createApp } from 'vue';
import { pinia, router } from './plugins';
import './style.scss';
import App from './App.vue';

createApp(App).use(pinia).use(router).mount('#app');
