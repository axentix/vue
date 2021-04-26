import { use } from './utils/plugins';
import * as components from './components';

const VueAxentix = {
  install(Vue) {
    for (let name in components) {
      Vue.use(components[name]);
    }
  },
};

use(VueAxentix);

export default VueAxentix;

export * from './components';
