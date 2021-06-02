import AxForm from './Form.vue';
import AxFormCheck from './FormCheck.vue';
import AxFormControl from './FormControl.vue';
import AxFormField from './FormField.vue';
import AxFormFile from './FormFile.vue';
import AxFormGroup from './FormGroup.vue';
import AxFormSwitch from './FormSwitch.vue';
import AxFormSelect from './FormSelect.vue';

import { use, registerComponent } from '../../utils/plugins';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, AxForm);
    registerComponent(Vue, AxFormCheck);
    registerComponent(Vue, AxFormControl);
    registerComponent(Vue, AxFormField);
    registerComponent(Vue, AxFormFile);
    registerComponent(Vue, AxFormGroup);
    registerComponent(Vue, AxFormSwitch);
    registerComponent(Vue, AxFormSelect);
  },
};

use(Plugin);

export default Plugin;

export { AxForm, AxFormCheck, AxFormControl, AxFormField, AxFormFile, AxFormGroup, AxFormSwitch };
