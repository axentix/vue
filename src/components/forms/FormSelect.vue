<template>
  <div v-bind="$attrs" v-ax-click-outside="() => toggle(false)">
    <ax-form-control custom-select tag="div" @click.native="() => toggle(true)" :single-line="singleLine">
      <template v-if="!chips">
        {{ multiple ? result.join(', ') : result.name }}
      </template>
      <template v-else>
        <template v-if="!multiple">{{ result.name }}</template>
        <div class="form-chips" v-else v-for="(value, i) in result" :key="'auto-val-' + i">
          {{ value }}

          <span class="form-chips-closable" v-if="chipsClosable" @click.prevent.stop="select(value)">
            <svg
              version="1.1"
              viewBox="0 0 512 512"
              xml:space="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
              />
            </svg>
          </span>
        </div>
      </template>
    </ax-form-control>

    <div class="form-select-content" :style="style" ref="container">
      <slot name="prepend" :toggle="toggle"></slot>

      <div
        class="form-select-item"
        v-for="(item, i) in computedItems"
        :key="'show-item-' + i"
        :class="{ selected: item.selected, disabled: item.disabled }"
        @click.prevent="item.disabled ? '' : select(item.value)"
      >
        <ax-form-check v-model="item.selected" v-if="multiple" :disabled="item.disabled">
          {{ item.name }}
        </ax-form-check>
        <template v-else>{{ item.name }}</template>
      </div>

      <slot name="append" :toggle="toggle"></slot>
    </div>
  </div>
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
import {
  selectEl,
  selectMixin,
  selectMultipleEl,
  toggleState,
  unselectEl,
  updateComputedItems,
} from './shared/select';
import validateMixin, { resetFormField, validateField } from './shared/validate';

export default defineComponent({
  name: 'AxFormSelect',
  mixins: [vModelMixin, selectMixin, validateMixin],
  setup(props, ctx) {
    const computedItems = ref([]),
      isOpened = ref(false),
      isTop = ref(false),
      container = ref(null),
      selected = ref({}),
      multipleSelected = ref([]),
      firstToggle = ref(true),
      opacity = ref(0),
      itemsRef = toRefs(props).items,
      vmodel = toRefs(props)[getVModelKey()];

    const vmodelEvent = getVModelEvent();

    const formUniqid = inject('ax-form-uniqid'),
      formField = inject('ax-form-field');

    const style = computed(() => {
      return {
        display: isOpened.value ? 'block' : '',
        opacity: opacity.value,
        bottom: isTop.value ? 0 : '',
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

    watch(result, () => {
      validate();
    });

    watch(vmodel, (val) => {
      if (!props.multiple) {
        if (selected.value && val === selected.value.value) return;
        const i = computedItems.value.findIndex((item) => item.value === val);
        if (i >= 0) select(i);
        return;
      }

      const added = val.filter((item) => !result.value.includes(item));
      const removed = result.value.filter((item) => !val.includes(item));

      [...added, ...removed].map((v) => {
        const i = computedItems.value.findIndex((item) => item.value === v);
        if (i >= 0) selectMultiple(i);
      });
    });

    watch(itemsRef, () => {
      updateComputedItems(computedItems, itemsRef, vmodel, props, multipleSelected, selected);
    });

    const toggle = (state = false) => {
      if (firstToggle.value && state) firstToggle.value = false;

      if (!state && !firstToggle.value) validate();
      else if (!firstToggle.value) resetFormField(formField);
      toggleState(state, isOpened, opacity, isTop, container);
    };

    const select = (value) => {
      const i = computedItems.value.findIndex((item) => item.value === value);
      if (i === -1) return;
      if (props.multiple) return selectMultiple(i);

      selectEl(i, selected, computedItems, ctx, vmodelEvent);

      if (props.closeOnClick) toggle();
    };

    const selectMultiple = (i) => {
      if (!props.multiple) return;

      selectMultipleEl(i, computedItems, multipleSelected, ctx, vmodelEvent, result);
    };

    const validate = () => {
      if (props.multiple) return validateField(props, multipleSelected, formField);
      return validateField(props, selected, formField);
    };

    onMounted(() => {
      addInstance({ type: 'AxFormSelect', instance: getCurrentInstance(), FormUniqid: formUniqid });
      updateComputedItems(computedItems, itemsRef, vmodel, props, multipleSelected, selected);
    });

    onUnmounted(() => {
      removeInstance(getCurrentInstance());
    });

    return {
      style,
      toggle,
      select,
      result,
      container,
      computedItems,
      validate,
    };
  },
});
</script>

<style lang="scss">
.form-select-content {
  box-shadow: 0 5px 8px 0 rgb(0 0 0 / 10%), 0 3px 8px 3px rgb(0 0 0 / 10%);
  background-color: #fff;
  color: #000;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  display: none;
  z-index: 40;
  transition: opacity 0.3s ease;
  max-height: 18rem;
  overflow-y: auto;

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

    &.disabled {
      color: rgba(0, 0, 0, 0.3);
      cursor: default;
      pointer-events: none;

      &::before {
        opacity: 0.1;
      }
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

.form-chips {
  --form-chips-background: #e2e2e2;
  --form-chips-color: #000000;
  --form-chips-closable-background: #686868;
  --form-chips-closable-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0.125rem;
  border-radius: 20px;
  background-color: var(--form-chips-background);
  color: var(--form-chips-color);

  .form-chips-closable {
    color: var(--form-chips-closable-color);
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin-left: 0.25rem;
    overflow: hidden;
    font-size: 1rem;
    line-height: 1;
    z-index: 2;
    background-color: var(--form-chips-closable-background);
    transition: opacity 0.2s ease;

    svg {
      fill: currentColor;
      width: 0.6rem;
      height: 0.6rem;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
