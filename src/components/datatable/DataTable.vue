<template>
  <div>
    <div class="table-responsive">
      <table class="table" :class="[classes, { 'table-hover': hover }]">
        <thead>
          <tr class="datatable-head">
            <th
              v-for="(header, i) in localHeaders"
              :key="i"
              :class="{ 'datatable-sortable': header.sortable !== false }"
              @click="sortBy(header)"
            >
              {{ header.text }}

              <template v-if="header.sortable !== false">
                <slot name="sort-asc" v-if="sortedHeader === header && isAsc">
                  <span class="datatable-icon">&uarr;</span>
                </slot>

                <slot class="datatable-icon" name="sort-desc" v-if="sortedHeader === header && !isAsc">
                  <span class="datatable-icon">&darr;</span>
                </slot>

                <slot class="datatable-icon" name="sort-desc" v-if="sortedHeader !== header">
                  <span class="datatable-icon">&varr;</span>
                </slot>
              </template>
            </th>

            <th v-if="expandable" width="20"></th>
          </tr>
        </thead>

        <tbody>
          <tr class="datatable-progress" v-if="loading">
            <td :colspan="expandable ? localHeaders.length + 1 : localHeaders.length">
              <slot name="progress-bar">
                <div class="progress progress-indeterminate progress-small">
                  <div class="progress-bar primary"></div>
                </div>
              </slot>
            </td>
          </tr>

          <tr v-if="computedItems.length === 0">
            <td :colspan="expandable ? localHeaders.length + 1 : localHeaders.length" class="text-center">
              {{ noDataText }}
            </td>
          </tr>

          <!-- eslint-disable-next-line vue/no-v-for-template-key -->
          <template v-for="(item, i) in computedItems" :key="i">
            <tr>
              <td v-for="(header, j) in localHeaders" :key="j">
                <slot :name="'item.' + header.value" :item="item">
                  {{ item[header.value] }}
                </slot>
              </td>

              <td v-if="expandable">
                <slot name="expand-btn">
                  <ax-btn
                    @click="expandItem(item)"
                    circle
                    size="small"
                    class="shadow-0 d-flex vcenter fx-center"
                  >
                    <svg
                      class="datatable-expand-arrow"
                      :class="{ 'datatable-expanded': item.expanded }"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      focusable="false"
                      width="1.3rem"
                      height="1.3rem"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
                      />
                    </svg>
                  </ax-btn>
                </slot>
              </td>
            </tr>

            <tr v-if="expandable" :key="'expand-' + i" class="datatable-expanded">
              <td
                :colspan="localHeaders.length + 1"
                :style="{ display: item.expanded ? 'table-cell' : 'none' }"
              >
                <slot name="expanded-item" :item="item"> </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div class="datatable-footer">
      <ax-pagination
        :total="search ? filteredItems.length : localItems.length"
        :perPage="perPage"
        :size="paginationSize"
        v-model="page"
        class="mr-auto"
        v-if="pagination"
      ></ax-pagination>

      <template v-if="computedItems.length === 0"> - </template>

      <template v-else>
        {{ firstItemIndex + 1 }} -
        {{ lastItemIndex > computedItems.length * page ? total : computedItems.length * page }}
        {{ paginationText }}
        {{ total }}
      </template>

      <template v-if="!pagination">
        <ax-btn class="ml-4 rounded-2 shadow-0" :disabled="page === 1" @click.prevent="goto(page - 1)">
          &lsaquo;
        </ax-btn>

        <ax-btn
          class="ml-2 rounded-2 shadow-0"
          :disabled="page === totalPage || totalPage === 0"
          @click.prevent="goto(page + 1)"
        >
          &rsaquo;
        </ax-btn>
      </template>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, toRefs, ref, watch } from 'vue-demi';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';

export default defineComponent({
  name: 'AxDataTable',
  mixins: [vModelMixin],
  inheritAttrs: false,
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    classes: {
      type: String,
      default: '',
    },
    search: {
      type: String,
      default: '',
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    paginationSize: {
      type: String,
      default: '',
      validator: (val) => ['', 'small', 'large'].includes(val),
    },
    perPage: {
      type: Number,
      default: 10,
      validator: (val) => val > 0,
    },
    expandable: {
      type: Boolean,
      default: false,
    },
    singleExpand: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: true,
    },
    noDataText: {
      type: String,
      default: 'No data available.',
    },
    paginationText: {
      type: String,
      default: 'of',
    },
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()];
    const vmodelEvent = getVModelEvent();

    const localHeaders = ref([]);
    const localItems = ref([]);
    const page = ref(vmodel.value || 1);
    const firstItemIndex = ref(1);
    const lastItemIndex = ref(10);
    const total = ref(props.items.length);
    const totalPage = ref(Math.ceil(props.perPage / total.value));
    const expandedItems = ref([]);
    const sortedHeader = ref(null);
    const isAsc = ref(false);

    watch(
      () => props.headers,
      () => {
        updateLocalHeaders();
      }
    );

    watch(
      () => props.items,
      () => {
        updateLocalItems();
      }
    );

    watch(
      () => props.modelValue,
      (val) => {
        if (page.value === val) return;
        page.value = val;
      }
    );

    watch(page, (val) => {
      ctx.emit(vmodelEvent, val);
    });

    watch(
      () => props.search,
      () => {
        goto(1);
      }
    );

    const filteredItems = computed(() => {
      return localItems.value.filter((item) => {
        const keys = Object.keys(item);
        return keys.some((key) => {
          const header = getHeaderForKeyItem(key);
          if (key === 'expanded' || !header || header.filterable === false) return false;
          const val = item[key];
          if (!val) return false;
          try {
            return val.toString().toLowerCase().includes(props.search.toLowerCase());
          } catch (error) {
            console.error(error);
            return false;
          }
        });
      });
    });

    const computedItems = computed(() => {
      let data = props.search ? filteredItems.value : localItems.value;
      if (sortedHeader.value && sortedHeader.value.sortable !== false) {
        data = sortData([...data]);
        if (!isAsc.value) data = data.reverse();
      }
      updateIndexData();
      return data.slice(firstItemIndex.value, lastItemIndex.value);
    });

    const goto = (p) => {
      if (p <= 1) return (page.value = 1);
      else if (p >= totalPage.value) return (page.value = totalPage.value);
      page.value = p;
    };

    const updateIndexData = () => {
      firstItemIndex.value = (page.value - 1) * props.perPage;
      lastItemIndex.value = page.value * props.perPage;
      total.value = props.search ? filteredItems.value.length : localItems.value.length;
      totalPage.value = Math.ceil(total.value / props.perPage);
    };

    const getHeaderForKeyItem = (key) => {
      return localHeaders.value.find((header) => header.value === key);
    };

    const updateLocalHeaders = () => {
      if (props.headers.length === 0) return (localHeaders.value = []);
      localHeaders.value = [...props.headers].reduce((acc, header) => {
        if (typeof header === 'object') {
          acc.push(header);
        } else {
          acc.push({
            text: header,
            value: header,
          });
        }
        return acc;
      }, []);
    };

    const updateLocalItems = () => {
      localItems.value = [...props.items];
    };

    const expandItem = (item) => {
      const index = localItems.value.findIndex((el) => el === item);
      if (index === -1) return;
      if (props.singleExpand) {
        expandedItems.value.map((el) => {
          if (el === item) return;
          const i = localItems.value.findIndex((x) => x === el);
          el.expanded = false;
          localItems.value.splice(i, 1, el);
        });
        expandedItems.value = [];
      }
      if (item.expanded) {
        const i = expandedItems.value.findIndex((el) => el === item);
        expandedItems.value.splice(i, 1);
        item.expanded = false;
      } else {
        item.expanded = true;
        expandedItems.value.push(item);
      }
      localItems.value.splice(index, 1, item);
    };

    const sortBy = (header) => {
      if (header.sortable === false) return;
      if (sortedHeader.value === header && !isAsc.value) {
        sortedHeader.value = null;
        isAsc.value = false;
        return;
      }
      sortedHeader.value = header;
      isAsc.value = !isAsc.value;
    };

    const sortData = (data) => {
      return data.sort((a, b) => {
        const aVal = a[sortedHeader.value.value];
        const bVal = b[sortedHeader.value.value];
        if (aVal === null || aVal === undefined || bVal === null || bVal === undefined) return -1;
        if (typeof aVal === 'string') {
          return aVal.localeCompare(bVal);
        } else if (Array.isArray(aVal)) {
          return bVal.length - aVal.length;
        }
        return aVal - bVal;
      });
    };

    onMounted(() => {
      updateLocalHeaders();
      updateLocalItems();

      ctx.emit('setup');
    });

    return {
      computedItems,
      localHeaders,
      localItems,
      sortedHeader,
      page,
      firstItemIndex,
      lastItemIndex,
      total,
      isAsc,
      totalPage,
      goto,
      sortBy,
      expandItem,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>

<style lang="scss" scoped>
.datatable-progress td {
  padding: 0 !important;
  border-bottom: 0 !important;
}

.datatable-expand-arrow {
  fill: currentColor;
  transition: transform 0.3s ease;
  transform: rotate(0);

  &.datatable-expanded {
    transform: rotate(180deg);
  }
}

.datatable-head {
  th {
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &.datatable-sortable {
      cursor: pointer;

      .datatable-icon {
        font-size: 1rem;
        opacity: 0;
        transition: inherit;
      }

      &:hover {
        opacity: 1;
        .datatable-icon {
          opacity: 0.9;
        }
      }
    }
  }
}

.datatable-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.datatable-expanded {
  &:hover {
    background-color: unset !important;
  }

  td {
    padding: 1rem !important;
  }
}
</style>
