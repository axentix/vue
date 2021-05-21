<template>
  <label class="form-switch" :class="labelClasses">
    <slot name="false-value"></slot>

    <input type="checkbox" v-bind="$attrs" v-on="$listeners" />
    <span class="slider" :class="classes" :style="style"></span>

    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'AxFormSwitch',
  inheritAttrs: false,
  props: {
    labelClasses: {
      type: String,
      default: '',
    },
    thin: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: '',
      validator: (val) => ['small', 'large', ''].includes(val),
    },
    color: {
      type: String,
      default: '#e92626',
    },
  },
  computed: {
    classes() {
      return {
        thin: this.thin,
        small: this.size === 'small',
        large: this.size === 'large',
      };
    },
    style() {
      return {
        '--form-switch-active-color': this.color,
      };
    },
  },
};
</script>
