<template>
  <form v-bind="$attrs" v-on="listeners" :class="classes">
    <slot></slot>
  </form>
</template>

<script>
import { computed, defineComponent, isVue2, provide } from 'vue-demi';
import { instances } from '../../utils/config';

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

    const validType = ['AxFormControl', 'AxFormCheck', 'AxFormAutocomplete', 'AxFormSwitch'],
      uniqid = 'axForm' + Date.now();

    provide('ax-form-material', props.material);
    provide('ax-form-uniqid', uniqid);

    const validate = () =>
      instances.value
        .filter(
          (ins) => validType.includes(ins.type) && !ins.instance.isUnmounted && ins.FormUniqid === uniqid
        )
        .map((ins) => {
          if (isVue2) return ins.instance.proxy.validate();
          return ins.instance.ctx.validate();
        })
        .every((b) => b);

    return {
      classes,
      validate,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
