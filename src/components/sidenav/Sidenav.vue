<template>
  <div class="sidenav" ref="sidenav" :class="classes" :style="style" v-bind="$attrs" v-on="$listeners">
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
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from 'vue-demi';
import { addInstance, getInstancesByType } from '../../utils/config';

export default defineComponent({
  name: 'AxSidenav',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
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
      value = ref(props.value),
      sidenav = ref(null);

    const extraClasses = reactive([
      'sidenav-right',
      'sidenav-both',
      'sidenav-large',
      'sidenav-large-left',
      'sidenav-large-right',
    ]);

    const classes = computed(() => {
      return {
        active: props.isActive,
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

    watch(value, (state) => {
      console.log('hey', state);
      if (state === null) return;

      if (props.fixed && window.innerWidth >= 960) {
        ctx.emit('input', true);
        return;
      }

      isActive.value = state;
      state ? openSidenav() : closeSidenav();
    });

    watch(isActive, (state) => {
      ctx.emit('input', state);
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

      if (props.value || (props.fixed && window.innerWidth >= 960)) isActive.value = true;

      ctx.emit('setup');
    };

    const setupListeners = () => {
      listenerRef.value = onClickTrigger.bind(this);
      resizeRef.value = handleResize.bind(this);
      window.addEventListener('resize', resizeRef);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', resizeRef);
      destroyOverlay();
    };

    const cleanLayout = () => {
      extraClasses.map((classes) => layoutEl.classList.remove(classes));
    };

    const handleResize = () => {
      if (props.fixed && window.innerWidth >= 960) isActive.value = true;
      else isActive.value = false;
    };

    const detectMultipleSidenav = () => {
      const sidenavFixed = getInstancesByType('Sidenav').find((ins) => ins.fixed);
      const firstSidenavInit = sidenavFixed && sidenavFixed === this;

      if (layoutEl && firstSidenavInit) cleanLayout();

      if (layoutEl && props.fixed && firstSidenavInit) handleMultipleSidenav();
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

      isLarge ? layoutEl.classList.add('sidenav-large') : '';

      if (sidenavsRight.length > 0 && !isBoth) {
        layoutEl.classList.add('sidenav-right');
      } else if (isBoth) {
        layoutEl.classList.add('sidenav-both');
      }

      if (isLarge && isBoth) {
        if (sidenavRightLarge && !sidenavLeftLarge) {
          layoutEl.classList.add('sidenav-large-right');
        } else if (!sidenavRightLarge && sidenavLeftLarge) {
          layoutEl.classList.add('sidenav-large-left');
        }
      }
    };

    const createOverlay = () => {
      overlayElement.value = document.createElement('div');
      overlayElement.value.classList.add('sidenav-overlay');
    };

    const updateOverlay = (state) => {
      if (props.fixed) return;

      if (overlayElement) {
        if (!state) destroyOverlay();

        if (isActive && state && !overlayActive) setOverlay(true);
        return;
      }

      if (state) {
        createOverlay();

        if (isActive) setOverlay(true);
      }
    };

    const destroyOverlay = () => {
      if (props.overlay && overlayActive) {
        overlayElement.value.removeEventListener('click', listenerRef);
        overlayElement.value.remove();
        overlayElement.value = '';
        overlayActive.value = false;
      }
    };

    const toggleBodyScroll = (state) => {
      if (!props.bodyScrolling) {
        state ? (document.body.style.overflow = '') : (document.body.style.overflow = 'hidden');
      }
    };

    const onClickTrigger = (e) => {
      e.preventDefault();
      if (props.fixed && window.innerWidth >= 960) return;

      isActive.value = !isActive;
    };

    const openSidenav = () => {
      if (isAnimated) return;

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
      if (isAnimated) return;

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
      if (!props.overlay) return;

      overlayElement.value.style.transitionDuration = props.animationDuration + 'ms';

      if (state) {
        overlayActive.value = true;
        overlayElement.value.addEventListener('click', listenerRef);
        document.body.appendChild(overlayElement);

        setTimeout(() => {
          overlayElement.value.classList.add('active');
        }, 50);
      } else {
        overlayElement.value.classList.remove('active');

        setTimeout(() => {
          overlayElement.value.removeEventListener('click', listenerRef);
          overlayElement.value.remove();
          overlayActive.value = false;
        }, props.animationDuration);
      }
    };

    onMounted(() => {
      init();
    });

    onBeforeUpdate(() => {
      updateOverlay(props.overlay);
    });

    onUnmounted(() => {
      removeListeners();
    });

    return {
      classes,
      style,
      sidenav,
    };
  },
});
</script>
