import AxLightbox from './Lightbox.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxLightbox);
  },
};

use(Plugin);

export default Plugin;

export { AxLightbox };
