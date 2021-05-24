import Vue from 'vue';
import App from './App.vue';
// import VueAxentix from '@/index.esm';
import VueAxentix from '../';
import 'axentix/dist/css/axentix.min.css';

Vue.config.productionTip = false;

Vue.use(VueAxentix);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
