<template>
  <component :is="tag" class="btn" :class="classes" v-bind="$attrs" v-on="listeners">
    <slot v-if="!outline">Button</slot>
    <span v-else :class="outlineClasses"><slot>Button</slot></span>
  </component>
</template>

<script>
import { computed, defineComponent, getCurrentInstance, onMounted, onUnmounted } from 'vue-demi';
import { addInstance, removeInstance } from '../../utils/config';

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
        circle: props.circle,
        press: props.press,
        outline: props.outline,
        opening: props.outlineOpening,
        small: props.size === 'small',
        large: props.size === 'large',
        disabled: props.disabled,
      };
    });

    const outlineClasses = computed(() => {
      return {
        'outline-text': props.outline,
        'outline-invert': props.outlineInvert,
      };
    });

    onMounted(() => {
      addInstance({ type: 'Button', instance: getCurrentInstance() });
    });

    onUnmounted(() => {
      removeInstance(getCurrentInstance());
    });

    return {
      classes,
      outlineClasses,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
