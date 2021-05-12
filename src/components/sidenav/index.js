import AxSidenav from './Sidenav.vue';
import AxSidenavLink from './SidenavLink.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxSidenav);
    registerComponent(Vue, AxSidenavLink);
  },
};

use(Plugin);

export default Plugin;

export { AxSidenav, AxSidenavLink };
