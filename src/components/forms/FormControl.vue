<template>
  <component
    :is="tag"
    class="form-control"
    v-bind="$attrs"
    v-on="listeners"
    ref="input"
    @focus="handle"
    @blur="handle"
  >
    <slot></slot>
  </component>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, onUnmounted, onUpdated, ref } from 'vue-demi';
import { getParentByName } from '../../utils/utils';

export default defineComponent({
  name: 'AxFormControl',
  props: {
    tag: {
      type: String,
      default: 'input',
    },
  },
  setup(_, ctx) {
    const resizeRef = ref(null),
      input = ref(null);

    const parent = getCurrentInstance().parent;

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
      const hasContent =
        input.value.value.length > 0 ||
        (input.value.tagName !== 'SELECT' && input.value.placeholder.length > 0) ||
        input.value.tagName === 'SELECT' ||
        input.value.matches('[type="date"]') ||
        input.value.matches('[type="month"]') ||
        input.value.matches('[type="week"]') ||
        input.value.matches('[type="time"]');
      const isFocused = document.activeElement === input.value;
      const isDisabled = input.value.hasAttribute('disabled') || input.value.hasAttribute('readonly');

      isDisabled ? '' : updateInput(isActive, hasContent, isFocused, formField);
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
      input,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
