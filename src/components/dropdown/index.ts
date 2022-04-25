import AxDropdown from './Dropdown.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxDropdown);
  },
};

use(Plugin);

export default Plugin;

export { AxDropdown };
