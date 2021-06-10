<template>
  <component
    :is="tag"
    class="form-control"
    :class="classes"
    v-bind="$attrs"
    ref="input"
    @focus="handle"
    @blur="handle"
    @click="handleDiv"
    @change="onInput"
    @input="onInput"
    v-ax-click-outside="() => handleDiv(false)"
  >
    <slot></slot>
  </component>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
  toRefs,
  watch,
} from 'vue-demi';
import { getParentByName } from '../../utils/utils';
import AxClickOutside from '../../directives/click-outside';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';

export default defineComponent({
  name: 'AxFormControl',
  directives: {
    axClickOutside: AxClickOutside,
  },
  mixins: [vModelMixin],
  props: {
    tag: {
      type: String,
      default: 'input',
    },
    customSelect: {
      type: Boolean,
      default: false,
    },
    singleLine: {
      type: Boolean,
      default: false,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const resizeRef = ref(null),
      vmodel = toRefs(props)[getVModelKey()],
      localValue = ref(vmodel.value),
      isClicked = ref(false),
      input = ref(null);

    const vmodelEvent = getVModelEvent();

    watch(vmodel, (val) => {
      localValue.value = val;
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

    watch(computedValue, (val) => {
      if (props.tag === 'div') return;
      input.value.value = val;
      handle();
    });

    const parent = getCurrentInstance().parent;

    const classes = computed(() => {
      return {
        'custom-select': props.customSelect,
        'single-line': props.singleLine,
      };
    });

    const onInput = (e) => {
      if (props.lazy && e.type === 'input') return;
      computedValue.value = e.target.value;
    };

    const setupListener = () => {
      if (resizeRef.value) return;

      resizeRef.value = handle.bind();
      window.addEventListener('resize', resizeRef.value);
    };

    const removeListener = () => {
      if (!resizeRef.value) return;

      window.removeEventListener('resize', resizeRef.value);
      resizeRef.value = null;
    };

    const handleDiv = (state = true) => {
      if (props.tag !== 'div') return;
      isClicked.value = state;
      handle();
    };

    const handle = () => {
      const form = getParentByName(parent, 'AxForm');
      if (!form || !form.props.material) {
        removeListener();
        return;
      }

      let formField = getParentByName(parent, 'AxFormField');
      if (!formField || formField.props.default) {
        removeListener();
        return;
      }

      setupListener();

      formField = formField.refs.field;

      const isActive = formField.classList.contains('active');

      let hasContent;
      if (props.tag === 'div') {
        hasContent = input.value.innerHTML.trim() !== '';
      } else {
        hasContent =
          input.value.value.length > 0 ||
          (input.value.tagName !== 'SELECT' && input.value.placeholder.length > 0) ||
          input.value.tagName === 'SELECT' ||
          input.value.matches('[type="date"]') ||
          input.value.matches('[type="month"]') ||
          input.value.matches('[type="week"]') ||
          input.value.matches('[type="time"]');
      }

      const isFocused = document.activeElement === input.value || (props.tag === 'div' && isClicked.value);

      updateInput(isActive, hasContent, isFocused, formField);
    };

    const updateInput = (isActive, hasContent, isFocused, formField) => {
      const isTextArea = input.value.type === 'textarea';

      if (!isActive && (hasContent || isFocused)) {
        formField.classList.add('active');
      } else if (isActive && !(hasContent || isFocused)) {
        formField.classList.remove('active');
      }

      isTextArea ? '' : setFormPosition(formField);

      isFocused && !isTextArea
        ? formField.classList.add('is-focused')
        : formField.classList.remove('is-focused');

      isFocused && isTextArea
        ? formField.classList.add('is-txtarea-focused')
        : formField.classList.remove('is-txtarea-focused');
    };

    const setFormPosition = (formField) => {
      const inputWidth = input.value.clientWidth,
        inputLeftOffset = input.value.offsetLeft;

      const topOffset = input.value.clientHeight + input.value.offsetTop + 'px';

      formField.style.setProperty('--form-material-position', topOffset);

      let offset = inputLeftOffset,
        side = 'left',
        width = '100%',
        labelLeft = '0';

      if (formField.classList.contains('form-rtl')) {
        side = 'right';
        offset = formField.clientWidth - inputWidth - inputLeftOffset;
      }

      formField.style.setProperty(`--form-material-${side}-offset`, offset + 'px');

      if (offset != 0) {
        width = inputWidth + 'px';
        labelLeft = inputLeftOffset;
      }

      formField.style.setProperty('--form-material-width', width);

      const label = formField.querySelector('label');
      if (!label) return;
      label.style.left = labelLeft + 'px';
    };

    onMounted(() => {
      handle();
    });

    onUpdated(() => {
      handle();
    });

    onUnmounted(() => {
      removeListener();
    });

    return {
      handle,
      handleDiv,
      input,
      classes,
      computedValue,
      onInput,
    };
  },
});
</script>

<style lang="scss" scoped>
.form-field .form-control.custom-select {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  padding: 0.5rem;
  min-height: 2.5rem;
  cursor: pointer !important;
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20xmlns%3Axlink%3D'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink'%20aria-hidden%3D'true'%20focusable%3D'false'%20width%3D'1.5rem'%20height%3D'1.5rem'%20style%3D'-ms-transform%3A%20rotate(360deg)%3B%20-webkit-transform%3A%20rotate(360deg)%3B%20transform%3A%20rotate(360deg)%3B'%20preserveAspectRatio%3D'xMidYMid%20meet'%20viewBox%3D'0%200%2024%2024'%3E%3Cpath%20d%3D'M8.12%209.29L12%2013.17l3.88-3.88a.996.996%200%201%201%201.41%201.41l-4.59%204.59a.996.996%200%200%201-1.41%200L6.7%2010.7a.996.996%200%200%201%200-1.41c.39-.38%201.03-.39%201.42%200z'%20fill%3D'%23626262'%2F%3E%3C%2Fsvg%3E") !important;
  background-repeat: no-repeat !important;
  background-origin: content-box !important;
  background-position: right -0.25rem center !important;
  color: inherit !important;
  border-bottom: 1px solid #c7c7c7 !important;

  &[disabled] {
    cursor: default !important;
  }

  &.single-line {
    white-space: nowrap;
    overflow-x: hidden;
  }
}

.form-material .form-field .form-control.custom-select {
  padding: 0.5rem 0;
}
</style>
