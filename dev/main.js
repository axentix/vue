import { createApp } from 'vue';
import App from './App.vue';
import VueAxentix from '@/index';

import 'axentix/dist/axentix.min.css';

const app = createApp(App);
app.use(VueAxentix);
app.mount('#app');
