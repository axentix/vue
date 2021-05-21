<template>
  <label class="form-check">
    <input v-bind="$attrs" :type="type" v-model="computedValue" ref="input" :value="nativeValue" />

    <span :class="spanClasses">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'AxFormCheck',
  inheritAttrs: false,
  data() {
    return {
      localValue: this.value,
    };
  },
  props: {
    type: {
      type: String,
      default: 'checkbox',
      validator: (val) => ['checkbox', 'radio'].includes(val),
    },
    full: {
      type: Boolean,
      default: false,
    },
    value: [String, Number, Boolean, Function, Object, Array],
    nativeValue: [String, Number, Boolean, Function, Object, Array],
  },
  watch: {
    value(val) {
      this.localValue = val;
    },
  },
  computed: {
    spanClasses() {
      return {
        full: this.full,
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
