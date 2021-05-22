<template>
  <label class="form-switch" :class="labelClasses">
    <slot name="false-value"></slot>

    <input type="checkbox" v-model="computedValue" v-bind="$attrs" ref="input" />
    <span class="slider" :class="classes" :style="style" ref="slider"></span>

    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'AxFormSwitch',
  inheritAttrs: false,
  data() {
    return {
      localValue: this.value,
    };
  },
  props: {
    value: [String, Number, Boolean, Function, Object, Array],
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
  watch: {
    value(val) {
      this.localValue = val;
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
    computedValue: {
      get() {
        return this.localValue;
      },
      set(val) {
        this.localValue = val;
        this.$emit('input', val);
      },
    },
  },
};
</script>
