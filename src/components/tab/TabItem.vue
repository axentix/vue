<template>
  <div v-bind="$attrs" v-on="listeners" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent, inject, onBeforeMount, onMounted, reactive, ref, watch } from 'vue-demi';
import { generateUid } from '../../utils/global';

export default defineComponent({
  name: 'AxTabItem',
  props: {
    id: String,
  },
  setup(props, ctx) {
    const isRegistered = ref(false),
      data = reactive({
        uid: generateUid(),
        hide: true,
        id: props.id,
      }),
      tabItems = inject('ax-tab-items');

    const style = computed(() => {
      return {
        display: data.hide ? 'none' : 'block',
      };
    });

    watch(tabItems, () => {
      registerTabItem();
    });

    const registerTabItem = () => {
      if (!tabItems.value || isRegistered.value) return;

      tabItems.value.push(data);

      isRegistered.value = true;
    };

    const removeTabItem = () => {
      if (!tabItems.value || !isRegistered.value) return;

      const index = tabItems.value.findIndex((item) => item.uid === data.uid);
      tabItems.value.splice(index, 1);
    };

    onMounted(() => {
      registerTabItem();
    });

    onBeforeMount(() => {
      removeTabItem();
    });

    return {
      style,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
