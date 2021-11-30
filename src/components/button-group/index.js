import AxBtnGroup from './ButtonGroup.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxBtnGroup);
  },
};

use(Plugin);

export default Plugin;

export { AxBtnGroup };
