<template>
  <component :is="tag" class="btn" :class="classes" v-bind="$attrs" v-on="listeners">
    <slot v-if="!outline">Button</slot>
    <span v-else :class="outlineClasses"><slot>Button</slot></span>
  </component>
</template>

<script>
import { computed, defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxBtn',
  props: {
    tag: {
      type: String,
      default: 'button',
      validator: (val) => ['a', 'button', 'div', 'router-link'].includes(val),
    },
    circle: {
      type: Boolean,
      default: false,
    },
    press: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    outlineOpening: {
      type: Boolean,
      default: false,
    },
    outlineInvert: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
      validator: (val) => ['small', 'large', ''].includes(val),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const classes = computed(() => {
      return {
        'btn-circle': props.circle,
        'btn-press': props.press,
        'btn-outline': props.outline,
        'btn-opening': props.outlineOpening,
        'btn-small': props.size === 'small',
        'btn-large': props.size === 'large',
        'btn-disabled': props.disabled,
      };
    });

    const outlineClasses = computed(() => {
      return {
        'btn-outline-text': props.outline,
        'btn-outline-invert': props.outlineInvert,
      };
    });

    return {
      classes,
      outlineClasses,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
