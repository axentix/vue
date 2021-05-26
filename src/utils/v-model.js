import { isVue2, defineComponent } from 'vue-demi';

const props = {};
const defaultValue = {
  type: Boolean,
  default: false,
};

let key = 'modelValue',
  event = 'update:modelValue';

if (isVue2) {
  key = 'value';
  event = 'input';
}

props[key] = defaultValue;

export default defineComponent({
  props,
});

export const getVModelKey = () => key;

export const getVModelEvent = () => event;
