import { isVue3 } from 'vue-demi';

export const use = (plugin) => {
  if (isVue3) return;

  if (typeof window !== 'undefined' && (window as any).Vue) (window as any).Vue.use(plugin);
};

export const registerComponent = (Vue, component) => {
  Vue.component(component.name, component);
};

export const registerComponentProgrammatic = (Vue, property, component) => {
  if (isVue3) {
    Vue.config.globalProperties.$axentix[property] = component;
    return;
  }

  if (!Vue.prototype.$axentix) Vue.prototype.$axentix = {};
  Vue.prototype.$axentix[property] = component;
};
