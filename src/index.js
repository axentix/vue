import { use } from './utils/plugins';
import * as components from './components';
import { install } from 'vue-demi';
import AxClickOutside from './directives/click-outside';

const VueAxentix = {
  install(Vue) {
    install();

    Vue.directive('ax-click-outside', AxClickOutside);

    for (let name in components) {
      Vue.use(components[name]);
    }
  },
};

use(VueAxentix);

export default VueAxentix;

export * from './components';
