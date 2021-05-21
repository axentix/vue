<template>
  <div class="form-field" :class="classes" v-bind="$attrs" v-on="$listeners">
    <label v-if="label">{{ label }}</label>

    <slot></slot>

    <span class="form-helper" :class="helperClasses" v-if="helper">{{ helper }}</span>
  </div>
</template>

<script>
export default {
  name: 'AxFormField',
  props: {
    label: {
      type: String,
      default: '',
    },
    inline: {
      type: Boolean,
      default: false,
    },
    helper: {
      type: String,
      default: '',
    },
    helperClasses: {
      type: String,
      default: '',
    },
    default: {
      type: Boolean,
      default: false,
    },
    rtl: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        inline: this.inline,
        'form-default': this.default,
        'form-rtl': this.rtl,
      };
    },
  },
};
</script>
