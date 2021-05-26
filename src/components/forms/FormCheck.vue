<template>
  <label class="form-check">
    <input v-bind="$attrs" :type="type" v-model="computedValue" ref="input" :value="nativeValue" />

    <span :class="spanClasses">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { computed, defineComponent, ref, toRefs, watch } from 'vue-demi';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';

export default defineComponent({
  name: 'AxFormCheck',
  inheritAttrs: false,
  mixins: [vModelMixin],
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

    const vmodelEvent = getVModelEvent();

    watch(vmodel, (val) => {
      localValue.value = val;
    });

    const spanClasses = computed(() => {
      return {
        full: props.full,
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

    return {
      spanClasses,
      computedValue,
      input,
    };
  },
});
</script>
