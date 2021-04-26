import plugin, * as components from '@/index.esm';

Object.entries(components).map(([name, component]) => {
  if (name !== 'default') {
    plugin[name] = component;
  }
});

export default plugin;
