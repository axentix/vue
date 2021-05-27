<template>
  <div
    class="collapsible overflow-hidden"
    ref="collapsible"
    :class="classes"
    :style="style"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  toRefs,
  ref,
  watch,
  isVue2,
} from 'vue-demi';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';
import { addInstance, getInstancesByType } from '../../utils/config';

export default defineComponent({
  name: 'AxCollapsible',
  mixins: [vModelMixin],
  props: {
    isInSidenav: {
      //delete this & handle it with the Axel's parent detection method
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    autoClose: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()],
      vmodelEvent = getVModelEvent(),
      isActive = ref(false),
      isAnimated = ref(false),
      maxHeight = ref(null),
      display = ref(null),
      collapsible = ref(null),
      resizeRef = ref(null);

    const classes = computed(() => {
      return {
        active: props.isActive,
        'overflow-hidden': props.isAnimated,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
        maxHeight: maxHeight.value,
        display: display.value,
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      state ? openCollapsible() : closeCollapsible();
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    const init = () => {
      addInstance({ type: 'Collapsible', instance: getCurrentInstance() });
      // this.detectChild();
      setupListeners();

      if (vmodel.value) openCollapsible();

      ctx.emit('setup');
    };

    const setupListeners = () => {
      resizeRef.value = handleResize.bind(this);
      window.addEventListener('resize', resizeRef.value);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', resizeRef.value);
    };

    const handleResize = () => {
      if (isActive.value && !props.isInSidenav) style.value.maxHeight = collapsible.value.scrollHeight + 'px';
    };

    const openCollapsible = () => {
      if (isAnimated.value || isActive.value) return;

      getInstancesByType('Collapsible').map((ins) => {
        if (isVue2) {
          ins.proxy.closeCollapsible(collapsible.value);
        } else {
          ins.ctx.closeCollapsible(collapsible.value);
        }
      });

      ctx.emit('open');

      isActive.value = true;
      isAnimated.value = true;
      display.value = 'block';
      setTimeout(() => {
        maxHeight.value = collapsible.value.scrollHeight + 'px';
      }, 10);

      setTimeout(() => {
        isAnimated.value = false;
      }, props.animationDuration + 10);
    };

    const closeCollapsible = (closeInstance) => {
      if ((isAnimated.value && !closeInstance) || closeInstance === collapsible.value || !isActive.value)
        return;

      ctx.emit('close');

      setTimeout(() => {
        isAnimated.value = true;
        maxHeight.value = '0';
      }, 10);

      setTimeout(() => {
        display.value = '';
        isActive.value = false;
        isAnimated.value = false;
      }, props.animationDuration + 10);
    };

    onMounted(() => {
      init();
    });

    onBeforeUnmount(() => {
      removeListeners();
    });

    return {
      classes,
      style,
      collapsible,
      closeCollapsible,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
