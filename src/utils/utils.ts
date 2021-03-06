export const getParentByName = (parent, name) => {
  while (parent) {
    if (parent.proxy && parent.proxy.$options.name === name) return parent;
    parent = parent.parent;
  }
  return false;
};
