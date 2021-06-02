<template>
  <ul class="pagination" :class="classes">
    <slot name="prev">
      <li class="prev" @click.prevent="prev" :class="{ disabled: current === 1 }">
        <a>&#8249;</a>
      </li>
    </slot>

    <span v-for="(total, i) of pageCount" :key="i">
      <slot>
        <li @click="goto(i)" :class="{ classes, active: current === i + 1 }">
          <a>{{ i + 1 }}</a>
        </li>
      </slot>
    </span>

    <slot name="next">
      <li class="next" @click.prevent="next" :disabled="current === pageCount">
        <a>&#8250;</a>
      </li>
    </slot>
  </ul>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref, toRefs, watch } from 'vue-demi';
import { addInstance, getInstancesByType, removeInstance } from '../../utils/config';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default {
  name: 'AxPagination',
  mixins: [vModelMixin],
  props: {
    total: {
      type: Number,
      default: 0,
      validator: (val) => val > 0,
    },
    perPage: {
      type: Number,
      default: 10,
    },
    size: {
      type: String,
      defaut: '',
      validator: (val) => ['', 'small', 'large'].includes(val),
    },
    maxItems: {
      type: Number,
      default: 10,
    },
  },
  setup(props, ctx) {
    const activeItem = ref(1),
      pageCount = ref(Math.ceil(props.total / props.perPage)),
      vmodel = toRefs(props)[getVModelKey()],
      current = ref(vmodel.value);

    const vmodelEvent = getVModelEvent();

    const classes = computed(() => {
      return {
        small: props.size === 'small',
        large: props.size === 'large',
      };
    });

    onMounted(() => {
      addInstance({ type: 'Pagination', instance: getCurrentInstance() });
    });

    watch(vmodel, (state) => {
      if (state === null) return;
      current.value = state;
    });

    const prev = () => {
      if (vmodel.value !== 1) ctx.emit(vmodelEvent, vmodel.value - 1);
    };

    const next = () => {
      if (vmodel.value !== pageCount.value) ctx.emit(vmodelEvent, vmodel.value + 1);
    };

    const goto = (i) => {
      if (vmodel.value !== i) ctx.emit(vmodelEvent, i + 1);
    };

    return {
      pageCount,
      classes,
      activeItem,
      current,
      prev,
      next,
      goto,
    };
  },
};
</script>

<style lang="scss" >
.pagination {
  .prev,
  .next {
    height: 42px;
    font-size: 1.5rem !important;
  }
  &.small .prev,
  &.small .next {
    height: 31px;
    font-size: 1.2rem !important;
  }
  &.large .prev,
  &.large .next {
    height: 55px;
    font-size: 2rem !important;
  }
}
</style>