<template>
  <form v-bind="$attrs" v-on="listeners" :class="classes">
    <slot></slot>
  </form>
</template>

<script>
import { computed, defineComponent } from 'vue-demi';

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

    return {
      classes,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
