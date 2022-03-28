import { ref, Ref } from 'vue-demi';

interface StoreData {
  type: string;
  uid: string;
  data: any;
}

export const store: Ref<Array<StoreData>> = ref([]);

export const addComponent = (data: StoreData) => store.value.push(data);

export const removeComponent = (uid: string) => {
  const i = store.value.findIndex((c) => c.uid === uid);
  if (i !== -1) store.value.splice(i, 1);
};

export const getComponentsByType = (type: string) => {
  return store.value.filter((ins) => ins.type === type);
};

export const generateUid = () => Date.now() + Math.random().toString().split('.')[1];
