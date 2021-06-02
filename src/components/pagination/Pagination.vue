<template>
  <ul class="pagination" :class="classes">
    <slot name="prev">
      <li class="prev" @click.prevent="prev">
        <a>&#8249;</a>
      </li>
    </slot>

    <span v-for="(total, i) of pageCount" :key="i">
      <slot :active="isActive">
        <li :class="classes">
          <a href="#">{{ i + 1 }}</a>
        </li>
      </slot>
    </span>

    <slot name="next"></slot>
  </ul>
</template>

<script>
import { computed, getCurrentInstance, onMounted, ref } from 'vue-demi';
import { addInstance, getInstancesByType, removeInstance } from '../../utils/config';

export default {
  name: 'AxPagination',
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
      pageCount = ref(props.total / props.perPage);

    const classes = computed(() => {
      return {
        small: props.size === 'small',
        large: props.size === 'large',
      };
    });

    onMounted(() => {
      addInstance({ type: 'Pagination', instance: getCurrentInstance() });
    });

    return {
      pageCount,
      classes,
      activeItem,
    };
  },
};
</script>

<style lang="scss" >
.pagination {
  .prev {
    height: 42px;
    font-size: 1.5rem !important;
  }
  &.small .prev {
    height: 31px;
    font-size: 1.2rem !important;
  }
  &.large .prev {
    height: 55px;
    font-size: 2rem !important;
  }
}
</style>