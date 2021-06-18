import AxTab from './Tab.vue';
import AxTabItem from './TabItem.vue';
import AxTabLink from './TabLink.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxTab);
    registerComponent(Vue, AxTabItem);
    registerComponent(Vue, AxTabLink);
  },
};

use(Plugin);

export default Plugin;

export { AxTab, AxTabItem, AxTabLink };
