import { use } from './utils/plugins';
import * as components from './components';
import { install } from 'vue-demi';

const VueAxentix = {
  install(Vue) {
    install();

    for (let name in components) {
      Vue.use(components[name]);
    }
  },
};

use(VueAxentix);

export default VueAxentix;

export * from './components';
