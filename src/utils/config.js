import { ref } from 'vue-demi';

export const instances = ref([]);

export const addInstance = (data) => instances.value.push(data);

export const removeInstance = (ins) => {
  const i = instances.value.findIndex((instance) => instance.instance === ins);
  if (i !== -1) instances.value.splice(i, 1);
};

export const getInstancesByType = (type) => {
  return instances.value
    .filter((ins) => ins.type === type && !ins.instance.isUnmounted)
    .map((ins) => ins.instance);
};
