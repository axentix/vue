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
  inject,
  isVue2,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue-demi';
import AxClickOutside from '../../directives/click-outside';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import validateMixin, { validateField } from './shared/validate';
import { addComponent, removeComponent, generateUid } from '../../utils/global';

export default defineComponent({
  name: 'AxFormControl',
  directives: {
    axClickOutside: AxClickOutside,
  },
  mixins: [vModelMixin, validateMixin],
  props: {
    tag: {
      type: String,
      default: 'input',
    },
    customSelect: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: Number,
      default: -1,
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
      formFieldClasses = reactive({
        active: false,
        'is-focused': false,
        'is-txtarea-focused': false,
      }),
      formFieldStyle = reactive({
        '--form-material-position': 0,
        '--form-material-left-offset': 0,
        '--form-material-right-offset': 0,
        '--form-material-width': 0,
      }),
      input = ref(null);

    const vmodelEvent = getVModelEvent(),
      uid = generateUid();

    const isMaterial = inject('ax-form-material', false),
      FormUid = inject('ax-form-uid'),
      formField = inject('ax-form-field');

    watch(formField, () => {
      handle();
    });

    watch(formFieldClasses, () => {
      isVue2
        ? (formField.value.data.extraClasses = formFieldClasses)
        : (formField.value.proxy.extraClasses = formFieldClasses);
    });

    watch(formFieldStyle, () => {
      isVue2
        ? (formField.value.data.extraStyle = formFieldStyle)
        : (formField.value.proxy.extraStyle = formFieldStyle);
    });

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
      validate();
    });

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

    const handleDiv = (state = true, e) => {
      if (props.tag !== 'div') return;
      isClicked.value = state;
      handle(e);
    };

    const handle = (e) => {
      if (!isMaterial) {
        removeListener();
        return;
      }

      if (!formField.value || (isVue2 ? formField.value.props.default : formField.value.ctx.default)) {
        removeListener();
        return;
      }

      if (e && (e.type === 'click' || e.type === 'blur')) validate();

      setupListener();

      const isActive = formFieldClasses.active;

      let hasContent;
      if (props.tag === 'div') {
        hasContent = props.autocomplete !== -1 ? props.autocomplete > 0 : input.value.innerHTML.trim() !== '';
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

      updateInput(isActive, hasContent, isFocused);
    };

    const updateInput = (isActive, hasContent, isFocused) => {
      const isTextArea = input.value.type === 'textarea';

      if (!isActive && (hasContent || isFocused)) {
        formFieldClasses.active = true;
      } else if (isActive && !(hasContent || isFocused)) {
        formFieldClasses.active = false;
      }

      isTextArea ? '' : setFormPosition();

      isFocused && !isTextArea
        ? (formFieldClasses['is-focused'] = true)
        : (formFieldClasses['is-focused'] = false);

      isFocused && isTextArea
        ? (formFieldClasses['is-txtarea-focused'] = true)
        : (formFieldClasses['is-txtarea-focused'] = false);
    };

    const setFormPosition = () => {
      const inputWidth = input.value.clientWidth,
        inputLeftOffset = input.value.offsetLeft;

      const topOffset = input.value.clientHeight + input.value.offsetTop + 'px';

      formFieldStyle['--form-material-position'] = topOffset;

      let offset = inputLeftOffset,
        side = 'left',
        width = inputWidth + 'px',
        labelLeft = '0';

      if (formField.value.props['form-rtl']) {
        side = 'right';
        offset = formField.value.refs.field.clientWidth - inputWidth - inputLeftOffset;
      }

      formFieldStyle[`--form-material-${side}-offset`] = offset + 'px';

      if (offset != 0) labelLeft = inputLeftOffset;

      formFieldStyle['--form-material-width'] = width;

      const label = formField.value.refs.labelRef;
      if (!label) return;
      label.style.left = labelLeft + 'px';
    };

    const validate = () => validateField(props, localValue, formField);

    onMounted(() => {
      addComponent({ type: 'FormControl', uid, data: { FormUid, validate } });
      handle();
    });

    onUpdated(() => {
      handle();
    });

    onUnmounted(() => {
      removeListener();
      removeComponent(uid);
    });

    return {
      handle,
      handleDiv,
      input,
      classes,
      computedValue,
      onInput,
      validate,
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
