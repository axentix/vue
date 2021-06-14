import { isVue2 } from 'vue-demi';

export default {
  props: {
    rules: {
      type: Array,
      default: () => [],
    },
    errorColor: {
      type: String,
      default: '#DF2C29',
    },
  },
};

export const resetFormField = (formField) => {
  if (isVue2) {
    formField.value.data.notValidHelper = null;
    formField.value.data.notValidColor = null;
  } else {
    formField.value.proxy.notValidHelper = null;
    formField.value.proxy.notValidColor = null;
  }
};

export const validateField = (props, localValue, formField) => {
  if (props.rules.length === 0) return true;

  let notValidRule;
  for (const rule of props.rules) {
    const res = rule(localValue.value);
    if (res !== true) {
      notValidRule = res;
      break;
    }
  }

  if (!notValidRule || !formField.value) {
    resetFormField(formField);
    return true;
  }

  if (typeof notValidRule === 'string') {
    isVue2
      ? (formField.value.data.notValidHelper = notValidRule)
      : (formField.value.proxy.notValidHelper = notValidRule);
  }

  isVue2
    ? (formField.value.data.notValidColor = props.errorColor)
    : (formField.value.proxy.notValidColor = props.errorColor);
  return false;
};
