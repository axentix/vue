<template>
  <component
    :is="tag"
    class="form-control"
    v-bind="$attrs"
    v-on="$listeners"
    ref="input"
    @focus="handle"
    @blur="handle"
  >
    <slot></slot>
  </component>
</template>

<script>
import { getParentByName } from '../../utils/utils';

export default {
  name: 'AxFormControl',
  data() {
    return {
      resizeRef: null,
    };
  },
  props: {
    tag: {
      type: String,
      default: 'input',
    },
  },
  methods: {
    setupListener() {
      if (this.resizeRef) return;

      this.resizeRef = this.handle.bind(this);
      window.addEventListener('resize', this.resizeRef);
    },
    removeListener() {
      if (!this.resizeRef) return;

      window.removeEventListener('resize', this.resizeRef);
      this.resizeRef = null;
    },
    handle() {
      const form = getParentByName(this.$parent, 'AxForm');
      if (!form || !form.material) {
        this.removeListener();
        return;
      }

      let formField = getParentByName(this.$parent, 'AxFormField');
      if (!formField || formField.default) {
        this.removeListener();
        return;
      }

      this.setupListener();

      formField = formField.$el;

      const isActive = formField.classList.contains('active');
      const hasContent =
        this.$refs.input.value.length > 0 ||
        (this.$refs.input.tagName !== 'SELECT' && this.$refs.input.placeholder.length > 0) ||
        this.$refs.input.tagName === 'SELECT' ||
        this.$refs.input.matches('[type="date"]') ||
        this.$refs.input.matches('[type="month"]') ||
        this.$refs.input.matches('[type="week"]') ||
        this.$refs.input.matches('[type="time"]');
      const isFocused = document.activeElement === this.$refs.input;
      const isDisabled =
        this.$refs.input.hasAttribute('disabled') || this.$refs.input.hasAttribute('readonly');

      isDisabled ? '' : this.updateInput(isActive, hasContent, isFocused, formField);
    },
    updateInput(isActive, hasContent, isFocused, formField) {
      const isTextArea = this.$refs.input.type === 'textarea';

      if (!isActive && (hasContent || isFocused)) {
        formField.classList.add('active');
      } else if (isActive && !(hasContent || isFocused)) {
        formField.classList.remove('active');
      }

      isTextArea ? '' : this.setFormPosition(formField);

      isFocused && !isTextArea
        ? formField.classList.add('is-focused')
        : formField.classList.remove('is-focused');

      isFocused && isTextArea
        ? formField.classList.add('is-txtarea-focused')
        : formField.classList.remove('is-txtarea-focused');
    },
    setFormPosition(formField) {
      const inputWidth = this.$refs.input.clientWidth,
        inputLeftOffset = this.$refs.input.offsetLeft;

      const topOffset = this.$refs.input.clientHeight + this.$refs.input.offsetTop + 'px';

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
    },
  },
  mounted() {
    this.handle();
  },
  updated() {
    this.handle();
  },
  beforeDestroy() {
    this.removeListener();
  },
};
</script>
