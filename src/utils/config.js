export let instances = [];

export const addInstance = (data) => {
  instances.push(data);
};

export const getInstancesByType = (type) => {
  return instances.filter((ins) => ins.type === type).map((ins) => ins.instance);
};
