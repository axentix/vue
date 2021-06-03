<template>
  <div class="collapsible" ref="collapsible" :class="classes" :style="style" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onUnmounted,
  toRefs,
  ref,
  watch,
  isVue2,
} from 'vue-demi';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';
import { addInstance, getInstancesByType, removeInstance } from '../../utils/config';
import { getParentByName } from '../../utils/utils';

export default defineComponent({
  name: 'AxCollapsible',
  mixins: [vModelMixin],
  props: {
    animationDuration: {
      type: Number,
      default: 300,
    },
    autoClose: {
      type: Boolean,
      default: true,
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
      resizeRef = ref(null),
      isInSidenav = ref(false),
      sidenav = ref(null);

    const classes = computed(() => {
      return {
        active: isActive.value,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
        maxHeight: maxHeight.value,
        display: display.value,
        overflow: isAnimated.value ? 'hidden' : 'visible',
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      state ? openCollapsible() : closeCollapsible();

      ctx.emit(vmodelEvent, isActive.value);
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    const init = () => {
      addInstance({ type: 'Collapsible', instance: getCurrentInstance() });

      setupListeners();

      isInSidenav.value = detectSidenav();
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

    const detectSidenav = () => {
      const parent = getCurrentInstance().parent;
      sidenav.value = getParentByName(parent, 'AxSidenav');
      if (!sidenav) {
        return false;
      }
      return true;
    };

    const handleResize = () => {
      if (isActive.value && !isInSidenav.value) style.value.maxHeight = collapsible.value.scrollHeight + 'px';
    };

    const openCollapsible = () => {
      if (isAnimated.value || isActive.value) return;

      getInstancesByType('Collapsible').map((ins) => {
        if (isVue2) {
          ins.proxy.closeCollapsible(collapsible.value, sidenav.value);
        } else {
          ins.ctx.closeCollapsible(collapsible.value, sidenav.value);
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

    const closeCollapsible = (closeInstance, sidenavInstance) => {
      // if we are not autoclosing the collapsible, don't close it if it's animated.
      // if the instance calling the close function is the same as the one receiving, don't close it.
      // don't close if this is already closed (not active)
      // and if we are really trying to close this instance with "autoclose" option:
      // only close it if the prop autoclose has been set to true, if it is placed in a sidenav,
      // and if the parent sidenav of the collapsible calling this is the same as this instance
      if (
        (isAnimated.value && !closeInstance) ||
        closeInstance === collapsible.value ||
        !isActive.value ||
        (closeInstance &&
          (!props.autoClose || !isInSidenav.value || (sidenav && sidenav.value !== sidenavInstance)))
      )
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

    onUnmounted(() => {
      removeListeners();
      removeInstance(getCurrentInstance());
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
