<template>
  <form v-bind="$attrs" v-on="listeners" :class="classes">
    <slot></slot>
  </form>
</template>

<script>
import { computed, defineComponent, provide } from 'vue-demi';
import { generateUid, store } from '../../utils/global';

export default defineComponent({
  name: 'AxForm',
  props: {
    material: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const classes = computed(() => {
      return {
        'form-material': props.material,
      };
    });

    const validType = ['FormControl', 'FormCheck', 'FormAutocomplete', 'FormSwitch'],
      uid = generateUid();

    provide('ax-form-material', props.material);
    provide('ax-form-uid', uid);

    const validate = () =>
      store.value
        .filter((c) => validType.includes(c.type) && c.data.FormUid === uid)
        .map((c) => c.data.validate())
        .every((b) => b);

    return {
      classes,
      validate,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
