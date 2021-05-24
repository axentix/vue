<template>
  <component :is="tag" class="btn" :class="classes" v-bind="$attrs">
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
  setup(props) {
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

    return {
      classes,
      outlineClasses,
    };
  },
  // computed: {
  //   classes() {
  //     return {
  //       circle: this.circle,
  //       press: this.press,
  //       outline: this.outline,
  //       opening: this.outlineOpening,
  //       small: this.size === 'small',
  //       large: this.size === 'large',
  //       disabled: this.disabled,
  //     };
  //   },
  //   outlineClasses() {
  //     return {
  //       'outline-text': this.outline,
  //       'outline-invert': this.outlineInvert,
  //     };
  //   },
  // },
});
</script>
