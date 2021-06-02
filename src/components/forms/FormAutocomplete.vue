<template>
  <div v-bind="$attrs" v-ax-click-outside="() => toggle(false)">
    <ax-form-control
      custom-select
      tag="input"
      type="text"
      @click.native="() => toggle(true)"
      :single-line="singleLine"
      v-model="inputValue"
      v-if="!multiple && !chips"
    ></ax-form-control>

    <ax-form-control
      custom-select
      tag="div"
      @click.native="() => toggle(true)"
      :single-line="singleLine"
      v-else
    >
      <!-- <template v-if="!chips">
        {{ multiple ? result.join(', ') : result.name }}
      </template>
      <template v-else>
        <template v-if="!multiple">{{ result.name }}</template>
        <div class="form-chips" v-else v-for="(value, i) in result" :key="i">
          {{ value }}

          <span class="form-chips-closable" v-if="chipsClosable" @click.prevent.stop="removeByValue(value)"
            >&times;</span
          >
        </div>
      </template> -->
      <template v-if="multiple">
        <div
          class="form-autocomplete-selected"
          :class="{ 'form-autocomplete-focused': i === result.length - 1 && isFocused }"
          v-for="(value, i) in result"
          :key="i"
        >
          {{ value }}<template v-if="i !== result.length - 1">,</template>
        </div>
        <input type="text" class="form-autocomplete-input" ref="input" v-model="inputValue" />
      </template>
    </ax-form-control>

    <div class="form-select-content" :style="style" ref="container">
      <slot name="prepend" :toggle="toggle"></slot>

      <div
        class="form-select-item"
        v-for="(item, i) in filteredItems"
        :key="i"
        :class="{ selected: item.selected, disabled: item.disabled }"
        @click.prevent="item.disabled ? '' : select(item.value)"
      >
        <ax-form-check v-model="item.selected" v-if="multiple" :disabled="item.disabled">{{
          item.name
        }}</ax-form-check>
        <template v-else>{{ item.name }}</template>
      </div>

      <slot name="append" :toggle="toggle"></slot>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref, toRefs, watch } from 'vue-demi';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import {
  removeByVal,
  selectEl,
  selectMixin,
  selectMultipleEl,
  toggleState,
  unselectEl,
  updateComputedItems,
} from './shared/select';

export default defineComponent({
  name: 'AxFormAutocomplete',
  mixins: [vModelMixin, selectMixin],
  props: {
    filter: {
      type: Function,
      default: (items, query) =>
        items.filter((item) => item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1),
    },
  },
  setup(props, ctx) {
    const computedItems = ref([]),
      isOpened = ref(false),
      isTop = ref(false),
      container = ref(null),
      input = ref(null),
      inputValue = ref(''),
      selected = ref({}),
      multipleSelected = ref([]),
      opacity = ref(0),
      isFocused = ref(false),
      itemsRef = ref(props.items),
      vmodel = toRefs(props)[getVModelKey()];

    const vmodelEvent = getVModelEvent();

    const style = computed(() => {
      return {
        display: isOpened.value ? 'block' : '',
        opacity: opacity.value,
        bottom: isTop.value ? '100%' : '',
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

    const filteredItems = computed(() => {
      const filtered = props.filter(computedItems.value, inputValue.value);
      return filtered;
    });

    watch(inputValue, (val) => {
      if (selected.value.index >= 0 && val === '' && !props.multiple) {
        unselectEl(selected.value.index, computedItems, multipleSelected);
        ctx.emit(vmodelEvent, val);
      }
    });

    watch(vmodel, (val) => {
      if (!props.multiple) {
        if (val === selected.value.value) return;
        select(val);
        return;
      }

      const added = val.filter((item) => !result.value.includes(item));
      const removed = result.value.filter((item) => !val.includes(item));

      added.map((v) => {
        const i = computedItems.value.findIndex((item) => item.value === v);
        selectMultiple(i);
      });

      removed.map((v) => {
        const i = computedItems.value.findIndex((item) => item.value === v);
        unselectEl(i, computedItems, multipleSelected);
      });
    });

    watch(itemsRef, () => {
      updateComputedItems(computedItems, itemsRef, vmodel, props, multipleSelected, selected);
    });

    const setupListeners = () => {
      window.addEventListener('keyup', onBackspace);
      document.addEventListener('click', removeFocus);
    };

    const removeListeners = () => {
      window.removeEventListener('keyup', onBackspace);
      document.removeEventListener('click', removeFocus);
    };

    const toggle = (state = false) => toggleState(state, isOpened, opacity, isTop, container);

    const removeByValue = (value) => removeByVal(value, computedItems, multipleSelected);

    const select = (value) => {
      const i = computedItems.value.findIndex((item) => item.value === value);
      if (i === -1) return;
      if (props.multiple) return selectMultiple(i);

      selectEl(i, selected, computedItems, ctx, vmodelEvent);
      inputValue.value = value;

      if (props.closeOnClick) toggle();
    };

    const selectMultiple = (i) => {
      if (!props.multiple) return;

      selectMultipleEl(i, computedItems, multipleSelected, ctx, vmodelEvent, result);
      input.value.focus();
    };

    const onBackspace = (e) => {
      if (e.keyCode !== 8 || inputValue.value !== '' || multipleSelected.value.length === 0) return;

      if (isFocused.value) {
        const itemIndex = multipleSelected.value[multipleSelected.value.length - 1].index;
        selectMultiple(itemIndex);
      } else {
        isFocused.value = true;
        input.value.blur();
      }
    };

    const removeFocus = () => {
      isFocused.value = false;
    };

    onMounted(() => {
      setupListeners();
      updateComputedItems(computedItems, itemsRef, vmodel, props, multipleSelected, selected);
    });

    onUnmounted(() => {
      removeListeners();
    });

    return {
      style,
      toggle,
      select,
      result,
      container,
      input,
      isFocused,
      removeByValue,
      inputValue,
      filteredItems,
    };
  },
});
</script>

<style lang="scss">
:root {
  --form-autocomplete-focus: #4c9f85;
}

.form-autocomplete-input {
  outline: none;
  display: flex;
  width: 100%;
  max-width: 100%;
  border: none;
  margin-right: 1rem;
}

.form-autocomplete-selected {
  margin-right: 0.25rem;

  &.form-autocomplete-focused {
    color: var(--form-autocomplete-focus);
  }
}
</style>
