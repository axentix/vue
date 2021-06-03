<template>
  <ul class="pagination" :class="classes">
    <slot name="prev">
      <li class="prev" @click.prevent="prev" :class="{ disabled: current === 1 }">
        <a>&#8249;</a>
      </li>
    </slot>

    <span v-for="(total, i) of pageCount" :key="i">
      <slot v-if="isShown(i)" :pageNumber="i + 1" :current="current - 1" :isActive="current - 1 === i">
        <li @click="goto(i + 1)" :class="{ classes, active: current - 1 === i }">
          <a>{{ i + 1 }}</a>
        </li>
      </slot>
    </span>

    <slot name="next">
      <li class="next" @click.prevent="next" :class="{ disabled: current === pageCount }">
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
    maxVisible: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx) {
    const activeItem = ref(1),
      pageCount = ref(Math.ceil(props.total / props.perPage)),
      vmodel = toRefs(props)[getVModelKey()],
      current = ref(vmodel.value);

    let shownCount = 1,
      rest = 0;
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
      if (vmodel.value !== i + 1) ctx.emit(vmodelEvent, i);
    };

    const isShown = (i) => {
      if (props.maxVisible < 3 || props.maxVisible > pageCount.value) return true;
      let active = current.value - 1;

      if (i === 0 || i === pageCount.value - 1 || active === i) {
        shownCount++;
        if (i === pageCount.value - 1) {
          rest = 0;
          shownCount = 1;
        }

        return true;
      }

      if (active <= Math.ceil(props.maxVisible / 2)) {
        if (i < active || shownCount <= props.maxVisible) {
          shownCount++;

          return true;
        }
      } else if (pageCount.value - active < props.maxVisible) {
        if (i < active && i < pageCount.value - props.maxVisible) return false;
        shownCount++;

        return true;
      } else if (shownCount < props.maxVisible) {
        if (rest === 0) rest = (props.maxVisible - shownCount) / 2;

        const showable = active - i < Math.ceil(rest) || active - i <= Math.floor(rest);
        if (!showable) return false;
        shownCount++;

        return true;
      }

      return false;
    };

    return {
      pageCount,
      classes,
      activeItem,
      current,
      prev,
      next,
      goto,
      isShown,
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