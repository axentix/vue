import AxCollapsible from './Collapsible.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxCollapsible);
  },
};

use(Plugin);

export default Plugin;

export { AxCollapsible };
