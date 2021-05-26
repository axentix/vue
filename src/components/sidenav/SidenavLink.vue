<template>
  <component :is="tag" class="sidenav-link" :class="classes" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </component>
</template>

<script>
import { computed, defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxSidenavLink',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'a',
    },
  },
  setup(props, ctx) {
    const classes = computed(() => {
      return {
        active: props.active,
      };
    });

    return {
      classes,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
