export let instances = [];

export const addInstance = (data) => {
  instances.push(data);
};

export const removeInstance = (ins) => {
  const i = instances.findIndex((instance) => instance.instance === ins);
  if (i !== -1) instances = instances.slice(i, 1);
};

export const getInstancesByType = (type) => {
  return instances.filter((ins) => ins.type === type && !ins.instance.isUnmounted).map((ins) => ins.instance);
};
