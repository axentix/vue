export const getParentByName = (parent, name) => {
  let component;
  while (parent && !component) {
    if (parent.$options.name === name) component = parent;
    parent = parent.$parent;
  }
  return component;
};
