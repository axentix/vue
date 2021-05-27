<template>
  <div class="form-field" :class="classes" v-bind="$attrs" v-on="listeners" ref="field" :style="style">
    <label v-if="label">{{ label }}</label>

    <slot></slot>

    <span class="form-helper" :class="helperClasses" v-if="helper">{{ helper }}</span>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue-demi';

export default defineComponent({
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
    materialColor: {
      type: String,
      default: '#4c9f85',
    },
  },
  setup(props, ctx) {
    const classes = computed(() => {
      return {
        inline: props.inline,
        'form-default': props.default,
        'form-rtl': props.rtl,
      };
    });

    const style = computed(() => {
      return {
        '--form-material-color': props.materialColor,
      };
    });

    const field = ref(null);

    return {
      classes,
      field,
      style,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
