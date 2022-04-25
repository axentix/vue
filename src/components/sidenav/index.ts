import AxSidenav from './Sidenav.vue';
import AxSidenavLink from './SidenavLink.vue';
import AxSidenavHeader from './SidenavHeader.vue';
import AxSidenavFooter from './SidenavFooter.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxSidenav);
    registerComponent(Vue, AxSidenavLink);
    registerComponent(Vue, AxSidenavHeader);
    registerComponent(Vue, AxSidenavFooter);
  },
};

use(Plugin);

export default Plugin;

export { AxSidenav, AxSidenavLink, AxSidenavHeader, AxSidenavFooter };
