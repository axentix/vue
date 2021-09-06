<template>
  <div class="btn-group" :class="classes" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxBtnGroup',
  props: {
    vertical: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
      validator: (val) => ['small', 'large', ''].includes(val),
    },
  },
  setup(props, ctx) {
    const classes = computed(() => {
      return {
        'btn-group-vertical': props.vertical,
        'btn-group-small': props.size === 'small',
        'btn-group-large': props.size === 'large',
      };
    });

    return {
      classes,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
