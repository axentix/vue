import { isVue2 } from 'vue-demi';

const bindFunction = (el, binding) => {
  el.clickOutsideEvent = function (e) {
    if (!(el === e.target || el.contains(e.target))) {
      binding.value();
    }
  };
  document.addEventListener('click', el.clickOutsideEvent);
};

const unbindFunction = (el) => {
  document.removeEventListener('click', el.clickOutsideEvent);
};

const directive = isVue2
  ? { bind: bindFunction, unbind: unbindFunction }
  : { beforeMount: bindFunction, unmounted: unbindFunction };

export default directive;
