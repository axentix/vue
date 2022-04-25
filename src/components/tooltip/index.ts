import AxTooltip from './Tooltip.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxTooltip);
  },
};

use(Plugin);

export default Plugin;

export { AxTooltip };
