import AxPagination from './Pagination.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxPagination);
  },
};

use(Plugin);

export default Plugin;

export { AxPagination };
