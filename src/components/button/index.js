import AxBtn from './Button.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxBtn);
  },
};

use(Plugin);

export default Plugin;

export { AxBtn };
