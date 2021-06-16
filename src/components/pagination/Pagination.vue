<template>
  <ul class="pagination" :class="classes" v-bind="$attrs" v-on="listeners">
    <slot name="first-arrow" :goto="goto" :pageCount="pageCount" :isDisabled="current === 1">
      <li class="arrow" @click.prevent="goto(1)" :class="{ disabled: current === 1 }">
        <a>&#171;</a>
      </li>
    </slot>

    <slot name="prev-arrow" :prev="prev" :pageCount="pageCount" :isDisabled="current === 1">
      <li class="arrow" @click.prevent="prev" :class="{ disabled: current === 1 }">
        <a>&#8249;</a>
      </li>
    </slot>

    <div v-for="(total, i) of pageCount" :key="i" class="flex">
      <slot
        v-if="isShown(i)"
        :pageNumber="i + 1"
        :activePage="current - 1"
        :isActive="current - 1 === i"
        :goto="goto"
      >
        <li @click="goto(i + 1)" :class="{ active: current - 1 === i }">
          <a>{{ i + 1 }}</a>
        </li>
      </slot>

      <li v-else-if="i === 1 || i === pageCount - 2" class="dots">...</li>
    </div>

    <slot name="next-arrow" :next="next" :pageCount="pageCount" :isDisabled="current === pageCount">
      <li class="arrow" @click.prevent="next" :class="{ disabled: current === pageCount }">
        <a>&#8250;</a>
      </li>
    </slot>

    <slot name="last-arrow" :goto="goto" :pageCount="pageCount" :isDisabled="current === pageCount">
      <li class="arrow" @click.prevent="goto(pageCount)" :class="{ disabled: current === pageCount }">
        <a>&#187;</a>
      </li>
    </slot>
  </ul>
</template>

<script>
import { computed, ref, toRefs, watch } from 'vue-demi';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default {
  name: 'AxPagination',
  mixins: [vModelMixin],
  props: {
    total: {
      type: Number,
      default: 0,
      required: true,
      validator: (val) => val >= 0,
    },
    perPage: {
      type: Number,
      default: 10,
      validator: (val) => val > 0,
    },
    size: {
      type: String,
      defaut: '',
      validator: (val) => ['', 'small', 'large'].includes(val),
    },
    maxVisible: {
      type: Number,
      default: 7,
      validator: (val) => val > 2 || val === 0,
    },
  },
  setup(props, ctx) {
    const pageCount = ref(Math.ceil(props.total / props.perPage)),
      vmodel = toRefs(props)[getVModelKey()],
      current = ref(1);

    let shownCount = 1,
      rest = 0;
    const vmodelEvent = getVModelEvent();

    const classes = computed(() => {
      return {
        small: props.size === 'small',
        large: props.size === 'large',
      };
    });

    watch(vmodel, (state) => {
      if (state === null || current.value === state) return;
      current.value = state;
    });

    watch(current, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    watch(
      () => props.total,
      () => {
        resetPageCount();
      }
    );

    watch(
      () => props.perPage,
      () => {
        resetPageCount();
      }
    );

    const resetPageCount = () => {
      pageCount.value = Math.ceil(props.total / props.perPage);
    };

    const prev = () => {
      if (current.value !== 1) {
        ctx.emit('prev', current.value - 1);
        current.value -= 1;
      }
    };

    const next = () => {
      if (current.value !== pageCount.value) {
        ctx.emit('next', current.value + 1);
        current.value += 1;
      }
    };

    const goto = (i) => {
      if (current.value !== i) {
        ctx.emit('goto', i);
        current.value = i;
      }
    };

    const isShown = (i) => {
      if (props.maxVisible < 3 || props.maxVisible > pageCount.value) return true;
      let active = current.value - 1;

      if (i === 0 || i === pageCount.value - 1 || active === i) {
        handleActiveOrExtremity(i);

        return true;
      }

      if (active <= Math.floor(props.maxVisible / 2)) {
        return handleBeginning(i, active);
      } else if (pageCount.value - active + 1 < props.maxVisible) {
        return handleEnding(i, active);
      } else if (shownCount < props.maxVisible) {
        return handleMiddle(i, active);
      }

      return false;
    };

    const handleActiveOrExtremity = (i) => {
      shownCount++;
      if (i === pageCount.value - 1) {
        rest = 0;
        shownCount = 1;
      }
    };

    const handleBeginning = (i, active) => {
      if (i < active || shownCount < props.maxVisible) {
        shownCount++;

        return true;
      }

      return false;
    };

    const handleEnding = (i, active) => {
      if (i < active && i <= pageCount.value - props.maxVisible) return false;
      shownCount++;

      return true;
    };

    const handleMiddle = (i, active) => {
      if (rest === 0) rest = (props.maxVisible - shownCount) / 2;

      const showable = active - i < Math.ceil(rest) || active - i <= Math.floor(rest);
      if (!showable) return false;
      shownCount++;

      return true;
    };

    return {
      pageCount,
      classes,
      current,
      prev,
      next,
      goto,
      isShown,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
};
</script>

<style lang="scss">
.pagination {
  user-select: none;

  .flex {
    display: flex;
  }

  .dots {
    margin: 0 1rem;

    &:hover {
      background: transparent;
    }
  }

  .arrow {
    height: 42px;
    font-size: 1.5rem !important;
  }

  &.small .arrow {
    height: 31px;
    font-size: 1.2rem !important;
  }

  &.large .arrow {
    height: 55px;
    font-size: 2rem !important;
  }
}
</style>
