import AxDataTable from './DataTable.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxDataTable);
  },
};

use(Plugin);

export default Plugin;

export { AxDataTable };
