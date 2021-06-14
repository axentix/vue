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
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  watch,
} from 'vue-demi';
import { addInstance, removeInstance } from '../../utils/config';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import validateMixin, { validateField } from './shared/validate';

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

    const vmodelEvent = getVModelEvent();

    const formUniqid = inject('ax-form-uniqid'),
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

    onMounted(() => {
      addInstance({ type: 'AxFormSwitch', instance: getCurrentInstance(), FormUniqid: formUniqid });
    });

    onUnmounted(() => {
      removeInstance(getCurrentInstance());
    });

    return {
      classes,
      input,
      slider,
      style,
      computedValue,
      validate,
    };
  },
});
</script>
