<template>
  <ax-form-field v-bind="$attrs" v-ax-click-outside="() => toggle(false)">
    <div>
      <ax-form-control
        :value="multiple ? result.join(', ') : result.name"
        readonly
        custom-select
        tag="input"
        type="text"
        @click="() => toggle(true)"
      ></ax-form-control>

      <div class="form-select-content" :style="style">
        <div
          class="form-select-item"
          v-for="(item, i) in computedItems"
          :key="i"
          :class="{ selected: item.selected }"
          @click.prevent="() => select(i)"
        >
          <ax-form-check v-model="item.selected" v-if="multiple">{{ item.name }}</ax-form-check>
          <template v-else>{{ item.name }}</template>
        </div>
      </div>
    </div>
  </ax-form-field>
</template>

<script>
import { computed, defineComponent, onMounted, ref, toRefs, watch } from 'vue-demi';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import AxClickOutside from '../../directives/click-outside';

export default defineComponent({
  name: 'AxFormSelect',
  mixins: [vModelMixin],
  directives: {
    axClickOutside: AxClickOutside,
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    closeOnClick: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const computedItems = ref([]),
      isOpened = ref(false),
      selected = ref({}),
      multipleSelected = ref([]),
      opacity = ref(0),
      vmodel = toRefs(props)[getVModelKey()];

    const vmodelEvent = getVModelEvent();

    const style = computed(() => {
      return {
        display: isOpened.value ? 'block' : '',
        opacity: opacity.value,
      };
    });

    const result = computed(() => {
      if (!props.multiple) {
        return selected.value;
      }

      return multipleSelected.value.reduce((acc, val) => {
        acc.push(val.value);
        return acc;
      }, []);
    });

    watch(vmodel, (val) => {
      if (!props.multiple) {
        if (val === selected.value.value) return;
        const i = computedItems.value.findIndex((item) => item.value === val);
        select(i);
        return;
      }

      val.map((v) => {
        if (!result.value.includes(v)) {
          const i = computedItems.value.findIndex((item) => item.value === v);
          console.log('hey', v, i);
          selectMultiple(i);
        }
      });
    });

    watch(
      () => props.items,
      () => {
        updateComputedItems();
      }
    );

    const updateComputedItems = () => {
      computedItems.value = props.items.reduce((acc, item, i) => {
        let obj;
        const baseObj = {
          index: i,
          selected: (item.selected && !vmodel.value) || (!props.multiple && vmodel.value === item),
        };

        if (typeof item !== 'object') {
          obj = Object.assign(
            {
              name: item,
              value: item,
            },
            baseObj
          );
        } else {
          obj = Object.assign(item, baseObj);
        }

        acc.push(obj);
        return acc;
      }, []);
    };

    const toggle = (state = false) => {
      if (state) {
        isOpened.value = true;
        setTimeout(() => {
          opacity.value = 1;
        }, 50);
        return;
      }

      opacity.value = 0;
      setTimeout(() => {
        isOpened.value = false;
      }, 300);
    };

    const select = (i) => {
      if (props.multiple) return selectMultiple(i);

      if (selected.value && selected.value.index >= 0) {
        if (selected.value.index === i) return;
        const lastItem = computedItems.value[selected.value.index];
        lastItem.selected = false;
        computedItems.value.splice(selected.value.index, 1, lastItem);
      }

      const item = computedItems.value[i];
      item.selected = true;
      selected.value = item;

      computedItems.value.splice(i, 1, item);

      ctx.emit(vmodelEvent, item.value);

      if (props.closeOnClick) toggle();
    };

    const selectMultiple = (i) => {
      if (!props.multiple) return;

      const item = computedItems.value[i];

      const index = multipleSelected.value.findIndex((val) => val.value === item.value && item.selected);

      if (index !== -1) {
        multipleSelected.value.splice(index, 1);
        item.selected = false;
      } else {
        multipleSelected.value.push(item);
        item.selected = true;
      }

      console.log(index, item, multipleSelected.value);

      computedItems.value.splice(i, 1, item);

      ctx.emit(vmodelEvent, result.value);
    };

    onMounted(() => {
      updateComputedItems();
    });

    return {
      style,
      toggle,
      select,
      result,
      computedItems,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-select-content {
  box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 8px 10px 1px rgb(0 0 0 / 14%),
    0 3px 14px 2px rgb(0 0 0 / 12%);
  background-color: #fff;
  color: #000;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  display: none;
  z-index: 40;
  transition: opacity 0.3s ease;

  .form-select-item {
    display: flex;
    align-items: center;
    min-height: 48px;
    position: relative;
    padding: 1rem 1.25rem;
    cursor: pointer;
    transition: color 0.2s ease;
    will-change: color;

    &::before {
      content: '';
      position: absolute;
      background-color: currentColor;
      opacity: 0;
      pointer-events: none;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      transition: opacity 0.2s ease;
      will-change: opacity;
    }

    &.selected {
      color: var(--form-material-color);
    }

    &:hover,
    &.selected,
    &:focus {
      &::before {
        opacity: 0.12;
      }
    }

    label {
      color: inherit !important;
      font-size: 1rem !important;
      transition: none !important;

      input {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>