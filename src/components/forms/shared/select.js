import AxClickOutside from '../../../directives/click-outside';

export const selectMixin = {
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
    singleLine: {
      type: Boolean,
      default: false,
    },
    chips: {
      type: Boolean,
      default: false,
    },
    chipsClosable: {
      type: Boolean,
      default: false,
    },
  },
};

export const updateComputedItems = (
  computedItems,
  itemsRef,
  vmodel,
  props,
  multipleSelected,
  selected,
  ctx,
  vmodelEvent,
  resultValue,
  inputValue = ''
) => {
  computedItems.value = [...new Set(itemsRef.value)].reduce((acc, item, i) => {
    let obj;

    const baseObj = {
      index: i,
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
      if (typeof obj.value === 'undefined') obj.value = obj.name;
    }

    const isSelected =
      (obj.selected && !vmodel.value) ||
      (!props.multiple && vmodel.value === obj.value) ||
      (props.multiple && vmodel.value && vmodel.value.includes(obj.value)) ||
      (props.multiple && vmodel.value && vmodel.value.length === 0 && obj.selected);

    obj.selected = isSelected;

    if (isSelected) {
      props.multiple && !multipleSelected.value.some((el) => obj.value === el.value)
        ? multipleSelected.value.push(obj)
        : (selected.value = obj);

      if (inputValue && !props.multiple) inputValue.value = obj.name;
      ctx.emit(vmodelEvent, resultValue.value);
    }

    acc.push(obj);
    return acc;
  }, []);
};

export const toggleState = (state = false, isOpened, opacity, isTop, container) => {
  if (state) {
    isOpened.value = true;
    setTimeout(() => {
      const bottomEl = container.value.getBoundingClientRect().bottom;
      const isInViewport = bottomEl <= (window.innerHeight || document.documentElement.clientHeight) - 10;

      isInViewport ? (isTop.value = false) : (isTop.value = true);

      opacity.value = 1;
    }, 50);
    return;
  }

  opacity.value = 0;
  setTimeout(() => {
    isOpened.value = false;
    isTop.value = false;
  }, 300);
};

export const selectEl = (i, selected, computedItems, ctx, vmodelEvent, result) => {
  if (selected.value && selected.value.index >= 0 && i !== -1) {
    if (selected.value.index === i) return;
    const lastItem = computedItems.value[selected.value.index];
    lastItem.selected = false;
    computedItems.value.splice(selected.value.index, 1, lastItem);
  }

  if (i !== -1) {
    const item = computedItems.value[i];
    item.selected = true;
    selected.value = item;

    computedItems.value.splice(i, 1, item);
  } else {
    selected.value = {};
  }

  ctx.emit(vmodelEvent, result.value);
};

export const selectMultipleEl = (i, computedItems, multipleSelected, ctx, vmodelEvent, result) => {
  if (i < 0) return;
  const item = computedItems.value[i];

  const index = multipleSelected.value.findIndex((val) => val.value === item.value && item.selected);

  if (index !== -1) {
    item.selected = false;
    multipleSelected.value.splice(index, 1);
  } else {
    item.selected = true;
    multipleSelected.value.push(item);
  }

  computedItems.value.splice(i, 1, item);

  ctx.emit(vmodelEvent, result.value);
};

export const unselectEl = (i, computedItems, multipleSelected) => {
  if (i < 0) return;
  const item = computedItems.value[i];
  item.selected = false;
  computedItems.value.splice(i, 1, item);

  const index = multipleSelected.value.findIndex((val) => val.value === item.value);
  multipleSelected.value.splice(index, 1);
};
