<template>
  <div
    class="form-field"
    :class="[classes, extraClasses]"
    v-bind="$attrs"
    v-on="listeners"
    ref="field"
    :style="[style, extraStyle]"
  >
    <label v-if="label" ref="labelRef">{{ label }}</label>

    <slot></slot>

    <span class="form-helper" :class="helperClasses" v-if="helper && !notValidHelper">{{ helper }}</span>
    <span class="form-helper text-error" :class="helperClasses" v-else-if="notValidHelper">
      {{ notValidHelper }}
    </span>
  </div>
</template>

<script>
import { computed, defineComponent, provide, reactive, ref } from 'vue-demi';

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
        'form-inline': props.inline,
        'form-default': props.default,
        'form-rtl': props.rtl,
        'not-valid': notValidColor.value ? true : false,
      };
    });

    const notValidColor = ref(null),
      notValidHelper = ref(null),
      extraClasses = ref(null),
      extraStyle = ref(null),
      labelRef = ref(null),
      field = ref(null);

    provide(
      'ax-form-field',
      reactive({
        notValidColor,
        notValidHelper,
        extraClasses,
        extraStyle,
        default: props.default,
        rtl: props.rtl,
        field,
        labelRef,
      })
    );

    const style = computed(() => {
      return {
        '--ax-form-material-color': notValidColor.value ? notValidColor.value : props.materialColor,
      };
    });

    return {
      classes,
      field,
      labelRef,
      style,
      notValidColor,
      notValidHelper,
      extraClasses,
      extraStyle,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>

<style lang="scss">
.form-material .form-field:not(.form-default).not-valid {
  label {
    color: var(--ax-form-material-color);
  }

  &::after {
    width: var(--ax-form-material-width);
  }
}
</style>
