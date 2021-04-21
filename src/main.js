import * as components from './components';

const VueAxentix = {
  install(Vue) {
    for (const componentName in components) {
      const component = components[componentName];

      Vue.component(component.name, component);
    }
  },
};

export default VueAxentix;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueAxentix);
}
