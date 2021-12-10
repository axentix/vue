<template>
  <div class="modal" ref="modal" :class="classes" :style="style" v-bind="$attrs" v-on="listeners">
    <div class="modal-header" v-if="!!$slots.header">
      <slot name="header"></slot>
    </div>

    <div class="modal-content">
      <slot></slot>
    </div>

    <div class="modal-footer" v-if="!!$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  onUpdated,
  reactive,
  ref,
  toRefs,
  watch,
} from 'vue-demi';
import { addComponent, removeComponent, getComponentsByType, generateUid } from '../../utils/global';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default defineComponent({
  name: 'AxModal',
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
      default: 400,
    },
    mode: {
      type: String,
      default: '',
      validator: (val) => ['', 'falling', 'bouncing'].includes(val),
    },
  },
  setup(props, ctx) {
    const isActive = ref(false),
      isAnimated = ref(false),
      overlayElement = ref(null),
      overlayActive = ref(false),
      listenerRef = ref(null),
      vmodel = toRefs(props)[getVModelKey()],
      display = ref(''),
      zIndex = ref(810),
      activeClass = ref(false),
      modal = ref(null);

    const vmodelEvent = getVModelEvent();
    const uid = generateUid();

    const classes = computed(() => {
      return {
        active: activeClass.value,
        'modal-falling': props.mode === 'falling',
        'modal-bouncing': props.mode === 'bouncing',
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
        animationDuration: props.animationDuration + 'ms',
        display: display.value,
        zIndex: zIndex.value,
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      isActive.value = state;
      state ? openModal() : closeModal();
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
      addComponent({ type: 'Modal', uid, data: reactive({ activeClass }) });

      setupListeners();

      if (props.overlay) createOverlay();
      if (vmodel.value) openModal();

      ctx.emit('setup');
    };

    const setupListeners = () => {
      listenerRef.value = onClickTrigger.bind(this);
    };

    const removeListeners = () => {
      destroyOverlay();
      listenerRef.value = null;
    };

    const createOverlay = () => {
      overlayElement.value = document.createElement('div');
      overlayElement.value.classList.add('ax-overlay');
    };

    const updateOverlay = (state) => {
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

    const onClickTrigger = (e) => {
      e.preventDefault();
      if (isAnimated.value) return;

      isActive.value = !isActive;
    };

    const toggleBodyScroll = (state) => {
      if (!props.bodyScrolling) {
        state ? (document.body.style.overflow = '') : (document.body.style.overflow = 'hidden');
      }
    };

    const setZIndex = () => {
      if (!isActive.value) return;
      const totalModals = getComponentsByType('Modal').filter((modal) => modal.data.activeClass).length + 1;

      if (props.overlay) overlayElement.value.style.zIndex = 800 + totalModals * 10 - 2;
      zIndex.value = 800 + totalModals * 10;
    };

    const openModal = () => {
      if (isAnimated.value) return;

      ctx.emit('open');
      isActive.value = true;
      isAnimated.value = true;

      setZIndex();

      display.value = 'block';

      setOverlay(true);

      toggleBodyScroll(false);

      setTimeout(() => {
        activeClass.value = true;
      }, 50);

      setTimeout(() => {
        isAnimated.value = false;

        ctx.emit('opened');
      }, props.animationDuration);
    };

    const closeModal = () => {
      if (isAnimated.value) return;

      ctx.emit('close');

      isAnimated.value = true;
      isActive.value = false;

      setOverlay(false);

      activeClass.value = false;

      setTimeout(() => {
        display.value = '';
        isAnimated.value = false;

        toggleBodyScroll(true);

        ctx.emit('closed');
      }, props.animationDuration);
    };

    const setOverlay = (state) => {
      if (!props.overlay) return;

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
      setZIndex();
    });

    onUnmounted(() => {
      removeListeners();
      toggleBodyScroll(true);
      removeComponent(uid);
    });

    return {
      classes,
      style,
      modal,
      activeClass,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
