import { isVue2, defineComponent } from 'vue-demi';

const props = {};
const defaultValue = {
  default: false,
};

const key = isVue2 ? 'value' : 'modelValue',
  event = isVue2 ? 'input' : 'update:modelValue';

props[key] = defaultValue;

export default defineComponent({
  props,
});

export const getVModelKey = () => key;

export const getVModelEvent = () => event;
