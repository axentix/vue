<template>
  <div class="sidenav" ref="sidenav" :class="classes" :style="style" v-bind="$attrs" v-on="listeners">
    <div class="sidenav-header" v-if="!!$slots.header">
      <slot name="header"></slot>
    </div>

    <slot></slot>

    <div class="sidenav-footer" v-if="!!$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  isVue2,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue-demi';
import { addInstance, getInstancesByType, removeInstance } from '../../utils/config';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default defineComponent({
  name: 'AxSidenav',
  mixins: [vModelMixin],
  props: {
    overlay: {
      type: Boolean,
      default: true,
    },
    bodyScrolling: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    rightAligned: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const layoutEl = ref(null),
      isActive = ref(false),
      isAnimated = ref(false),
      overlayElement = ref(null),
      overlayActive = ref(false),
      resizeRef = ref(null),
      listenerRef = ref(null),
      vmodel = toRefs(props)[getVModelKey()],
      sidenav = ref(null);

    const vmodelEvent = getVModelEvent();

    const extraClasses = reactive([
      'sidenav-right',
      'sidenav-both',
      'sidenav-large',
      'sidenav-large-left',
      'sidenav-large-right',
    ]);

    const classes = computed(() => {
      return {
        active: isActive.value,
        fixed: props.fixed,
        'right-aligned': props.rightAligned,
        large: props.large,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      if (props.fixed && window.innerWidth >= 960) {
        ctx.emit(vmodelEvent, true);
        return;
      }

      isActive.value = state;
      state ? openSidenav() : closeSidenav();
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    watch(
      () => props.overlay,
      (state) => {
        updateOverlay(state);
      }
    );

    const init = () => {
      addInstance({ type: 'Sidenav', instance: getCurrentInstance() });
      layoutEl.value = sidenav.value.closest('.layout');

      if (props.overlay) createOverlay();

      setupListeners();

      detectMultipleSidenav();

      if (vmodel.value || (props.fixed && window.innerWidth >= 960)) openSidenav();

      ctx.emit('setup');
    };

    const setupListeners = () => {
      listenerRef.value = onClickTrigger.bind(this);
      resizeRef.value = handleResize.bind(this);
      window.addEventListener('resize', resizeRef.value);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', resizeRef.value);
      destroyOverlay();
    };

    const cleanLayout = () => {
      extraClasses.map((classes) => layoutEl.value.classList.remove(classes));
    };

    const handleResize = () => {
      if (props.fixed && window.innerWidth >= 960) isActive.value = true;
      else isActive.value = false;
    };

    const detectMultipleSidenav = () => {
      const sidenavFixed = getInstancesByType('Sidenav').find((ins) =>
        isVue2 ? ins.props.fixed : ins.ctx.fixed
      );
      const firstSidenavInit = sidenavFixed && sidenavFixed === getCurrentInstance();

      if (layoutEl.value && firstSidenavInit) cleanLayout();

      if (layoutEl.value && props.fixed && firstSidenavInit) handleMultipleSidenav();
    };

    const handleMultipleSidenav = () => {
      const sidenavs = Array.from(document.querySelectorAll('.sidenav')).filter((sidenav) =>
        sidenav.classList.contains('fixed')
      );

      const { sidenavsRight, sidenavsLeft } = sidenavs.reduce(
        (acc, sidenav) => {
          sidenav.classList.contains('right-aligned')
            ? acc.sidenavsRight.push(sidenav)
            : acc.sidenavsLeft.push(sidenav);
          return acc;
        },
        { sidenavsRight: [], sidenavsLeft: [] }
      );

      const isBoth = sidenavsLeft.length > 0 && sidenavsRight.length > 0;
      const sidenavRightLarge = sidenavsRight.some((sidenav) => sidenav.classList.contains('large'));
      const sidenavLeftLarge = sidenavsLeft.some((sidenav) => sidenav.classList.contains('large'));
      const isLarge = sidenavRightLarge || sidenavLeftLarge;

      isLarge ? layoutEl.value.classList.add('sidenav-large') : '';

      if (sidenavsRight.length > 0 && !isBoth) {
        layoutEl.value.classList.add('sidenav-right');
      } else if (isBoth) {
        layoutEl.value.classList.add('sidenav-both');
      }

      if (isLarge && isBoth) {
        if (sidenavRightLarge && !sidenavLeftLarge) {
          layoutEl.value.classList.add('sidenav-large-right');
        } else if (!sidenavRightLarge && sidenavLeftLarge) {
          layoutEl.value.classList.add('sidenav-large-left');
        }
      }
    };

    const createOverlay = () => {
      overlayElement.value = document.createElement('div');
      overlayElement.value.classList.add('sidenav-overlay');
    };

    const updateOverlay = (state) => {
      if (props.fixed) return;

      if (overlayElement.value) {
        if (!state) destroyOverlay();

        if (isActive.value && state && !overlayActive.value) setOverlay(true);
        return;
      }

      if (state) {
        createOverlay();

        if (isActive.value) setOverlay(true);
      }
    };

    const destroyOverlay = () => {
      if (props.overlay && overlayActive.value) {
        overlayElement.value.removeEventListener('click', listenerRef.value);
        overlayElement.value.remove();
        overlayElement.value = '';
        overlayActive.value = false;
      }
    };

    const toggleBodyScroll = (state) => {
      if (!props.bodyScrolling && window.innerWidth < 960) {
        state ? (document.body.style.overflow = '') : (document.body.style.overflow = 'hidden');
      }
    };

    const onClickTrigger = (e) => {
      e.preventDefault();
      if (props.fixed && window.innerWidth >= 960) return;

      isActive.value = !isActive;
    };

    const openSidenav = () => {
      if (isAnimated.value) return;

      isActive.value = true;
      ctx.emit('open');
      isAnimated.value = true;
      setOverlay(true);

      toggleBodyScroll(false);

      setTimeout(() => {
        isAnimated.value = false;
        ctx.emit('opened');
      }, props.animationDuration);
    };

    const closeSidenav = () => {
      if (isAnimated.value) return;

      isActive.value = false;
      isAnimated.value = true;
      ctx.emit('close');
      setOverlay(false);

      setTimeout(() => {
        toggleBodyScroll(true);

        isAnimated.value = false;
        ctx.emit('closed');
      }, props.animationDuration);
    };

    const setOverlay = (state) => {
      if (!props.overlay || window.innerWidth >= 960) return;

      overlayElement.value.style.transitionDuration = props.animationDuration + 'ms';

      if (state) {
        overlayActive.value = true;
        overlayElement.value.addEventListener('click', listenerRef.value);
        document.body.appendChild(overlayElement.value);

        setTimeout(() => {
          overlayElement.value.classList.add('active');
        }, 50);
      } else {
        overlayElement.value.classList.remove('active');

        setTimeout(() => {
          overlayElement.value.removeEventListener('click', listenerRef.value);
          overlayElement.value.remove();
          overlayActive.value = false;
        }, props.animationDuration);
      }
    };

    onMounted(() => {
      init();
    });

    onUpdated(() => {
      updateOverlay(props.overlay);
    });

    onUnmounted(() => {
      removeListeners();
      removeInstance(getCurrentInstance());
    });

    return {
      classes,
      style,
      sidenav,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
