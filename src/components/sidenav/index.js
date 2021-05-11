import AxSidenav from './Sidenav.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxSidenav);
  },
};

use(Plugin);

export default Plugin;

export { AxSidenav };
