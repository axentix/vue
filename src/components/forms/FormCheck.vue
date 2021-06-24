<template>
  <label class="form-check">
    <input
      v-bind="$attrs"
      :type="type"
      v-model="computedValue"
      ref="input"
      @input="validate"
      @change="validate"
      @click.stop
    />

    <span :class="spanClasses">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { computed, defineComponent, inject, onMounted, onUnmounted, ref, toRefs, watch } from 'vue-demi';
import { addComponent, removeComponent, generateUid } from '../../utils/global';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import validateMixin, { resetFormField, validateField } from './shared/validate';

export default defineComponent({
  name: 'AxFormCheck',
  inheritAttrs: false,
  mixins: [vModelMixin, validateMixin],
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
    nativeValue: [String, Number, Boolean, Function, Object, Array],
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()],
      input = ref(null),
      localValue = ref(vmodel.value);

    const vmodelEvent = getVModelEvent(),
      uid = generateUid();

    watch(vmodel, (val) => {
      localValue.value = val;
    });

    const spanClasses = computed(() => {
      return {
        full: props.full,
      };
    });

    const FormUid = inject('ax-form-uid'),
      formField = inject('ax-form-field');

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
      addComponent({ type: 'FormCheck', uid, data: { FormUid, validate } });
      if (props.nativeValue && !vmodel.value) computedValue.value = props.nativeValue;
    });

    onUnmounted(() => {
      removeComponent(uid);
    });

    return {
      spanClasses,
      computedValue,
      validate,
      input,
      resetValidation,
    };
  },
});
</script>
