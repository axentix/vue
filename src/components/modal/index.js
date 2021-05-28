import AxModal from './Modal.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxModal);
  },
};

use(Plugin);

export default Plugin;

export { AxModal };
