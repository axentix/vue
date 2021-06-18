<template>
  <label class="form-switch" :class="labelClasses">
    <slot name="false-value"></slot>

    <input
      type="checkbox"
      v-model="computedValue"
      v-bind="$attrs"
      ref="input"
      @input="validate"
      @change="validate"
    />
    <span class="slider" :class="classes" :style="style" ref="slider"></span>

    <slot></slot>
  </label>
</template>

<script>
import { computed, defineComponent, inject, onMounted, onUnmounted, ref, toRefs, watch } from 'vue-demi';
import { addComponent, removeComponent, generateUid } from '../../utils/global';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import validateMixin, { resetFormField, validateField } from './shared/validate';

export default defineComponent({
  name: 'AxFormSwitch',
  inheritAttrs: false,
  mixins: [vModelMixin, validateMixin],
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
      default: '#4c9f85',
    },
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()],
      input = ref(null),
      slider = ref(null),
      localValue = ref(vmodel.value);

    const vmodelEvent = getVModelEvent(),
      uid = generateUid();

    const FormUid = inject('ax-form-uid'),
      formField = inject('ax-form-field');

    watch(vmodel, (val) => {
      localValue.value = val;
    });

    const classes = computed(() => {
      return {
        thin: props.thin,
        small: props.size === 'small',
        large: props.size === 'large',
      };
    });

    const style = computed(() => {
      return {
        '--form-switch-active-color': props.color,
      };
    });

    const computedValue = computed({
      get() {
        return localValue.value;
      },
      set(val) {
        localValue.value = val;
        ctx.emit(vmodelEvent, val);
      },
    });

    const validate = () => validateField(props, localValue, formField);

    const resetValidation = () => resetFormField(formField);

    onMounted(() => {
      addComponent({ type: 'FormSwitch', uid, data: { FormUid, validate } });
    });

    onUnmounted(() => {
      removeComponent(uid);
    });

    return {
      classes,
      input,
      slider,
      style,
      computedValue,
      validate,
      resetValidation,
    };
  },
});
</script>
