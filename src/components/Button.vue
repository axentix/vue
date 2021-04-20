<template>
  <component :is="type" class="btn" :class="[getClasses, ...extraClasses]" @click="onClick">
    <slot v-if="!outline"></slot>
    <span v-else :class="getOutlineClasses"><slot>Button</slot></span>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (val) => ['a', 'button', 'div'].includes(val),
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
    extraClasses: {
      type: Array,
      default: () => ['primary', 'rounded-1'],
    },
  },
  computed: {
    getClasses() {
      return {
        circle: this.circle,
        press: this.press,
        outline: this.outline,
        opening: this.outlineOpening,
        small: this.size === 'small',
        large: this.size === 'large',
        disabled: this.disabled,
      };
    },
    getOutlineClasses() {
      return {
        'outline-text': this.outline,
        'outline-invert': this.outlineInvert,
      };
    },
  },
  methods: {
    onClick() {
      this.$emit('onClick');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~axentix/src/scss/components/button';
</style>
