<template>
  <div ref="container">
    <img
      ref="lightbox"
      class="lightbox"
      @click="onClickTrigger"
      @keyup="closeLightbox"
      :class="classes"
      :style="style"
      alt="lightbox"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref, toRefs, watch } from 'vue-demi';
import { removeComponent, generateUid, addComponent } from '../../utils/global';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default defineComponent({
  name: 'AxLightbox',
  inheritAttrs: false,
  mixins: [vModelMixin],
  props: {
    responsive: {
      type: Boolean,
      default: false,
    },
    animationDuration: {
      type: Number,
      default: 400,
    },
    overlayClass: {
      type: String,
      default: 'grey dark-4',
    },
    offset: {
      type: Number,
      default: 150,
    },
    mobileOffset: {
      type: Number,
      default: 80,
    },
    caption: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const isActive = ref(false),
      vmodel = toRefs(props)[getVModelKey()],
      position = ref(''),
      lightbox = ref(null),
      container = ref(null),
      overlay = ref(null),
      caption = ref(null),
      baseRect = ref(null),
      newWidth = ref(0),
      newHeight = ref(0),
      resizeRef = ref(null),
      keyUpRef = ref(null),
      scrollRef = ref(null),
      overlayClickRef = ref(null),
      listenerRef = ref(null),
      transitionRef = ref(null),
      timeoutRef = ref(null),
      isClosing = ref(false),
      isOpening = ref(false),
      overflowParents = ref([]);

    const vmodelEvent = getVModelEvent();
    const uid = generateUid();

    const classes = computed(() => {
      return {
        'responsive-media': props.responsive,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
        position: position.value,
      };
    });

    watch(vmodel, (state) => {
      if (state === null) {
        if (isActive.value) openLightbox();
        else closeLightbox();

        return;
      }

      isActive.value = state;
      if (state && !isOpening.value) openLightbox();
      else if (!isClosing.value && (!isActive.value || isOpening.value)) closeLightbox();
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    const init = () => {
      addComponent({ type: 'Lightbox', uid });

      setupListeners();

      if (vmodel.value) openLightbox();

      ctx.emit('setup');
    };

    const setupListeners = () => {
      listenerRef.value = onClickTrigger.bind(this);
      keyUpRef.value = handleKeyUp.bind(this);
      scrollRef.value = handleScroll.bind(this);
      resizeRef.value = handleResize.bind(this);
      transitionRef.value = handleTransitionEnd.bind(this);

      window.addEventListener('resize', resizeRef.value);
      window.addEventListener('keyup', keyUpRef.value);
      window.addEventListener('scroll', scrollRef.value);
      lightbox.value.addEventListener('transitionend', transitionRef.value);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', resizeRef.value);
      unsetOverlay();
    };

    const onClickTrigger = (e) => {
      e.preventDefault();

      isActive.value = !isActive.value;
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Escape' && (isOpening.value || isActive.value)) isActive.value = false;
    };

    const handleScroll = () => {
      if (isActive.value || (!isClosing.value && isOpening.value)) isActive.value = false;
    };

    const handleResize = () => {
      if (isActive.value) isActive.value = false;
    };

    const setOverlayEvent = () => {
      overlayClickRef.value = handleOverlayClick.bind(this);
      overlay.value.addEventListener('click', overlayClickRef.value);
    };

    const handleOverlayClick = (e) => {
      e.preventDefault();
      overlay.value.removeEventListener('click', overlayClickRef.value);
      isActive.value = false;
    };

    const handleTransitionEnd = (e) => {
      if (e.propertyName !== 'width' && e.propertyName !== 'height') {
        return;
      }

      if (isClosing.value) {
        clearLightbox();
        isClosing.value = false;
        ctx.emit('closed');
      } else if (isOpening.value) {
        isOpening.value = false;
        isActive.value = true;
        ctx.emit('opened');
      }
    };

    const calculateRatio = () => {
      const offset = window.innerWidth >= 960 ? props.offset : props.mobileOffset;

      if (window.innerWidth / window.innerHeight >= baseRect.value['width'] / baseRect.value['height']) {
        newHeight.value = window.innerHeight - offset;
        newWidth.value = (newHeight.value * baseRect.value['width']) / baseRect.value['height'];
      } else {
        newWidth.value = window.innerWidth - offset;
        newHeight.value = (newWidth.value * baseRect.value['height']) / baseRect.value['width'];
      }
    };

    const openLightbox = () => {
      if (isOpening.value) return;

      clearTimeout(timeoutRef.value);
      isOpening.value = true;
      let rect, containerRect;

      if (isClosing.value) {
        rect = containerRect = container.value.getBoundingClientRect();
      } else {
        rect = containerRect = lightbox.value.getBoundingClientRect();
      }
      isClosing.value = false;

      setOverlay();
      showOverlay();

      const centerTop = window.innerHeight / 2;
      const centerLeft = window.innerWidth / 2;

      baseRect.value = rect;
      lightbox.value.style.width = baseRect.value['width'] + 'px';
      lightbox.value.style.height = baseRect.value['height'] + 'px';

      lightbox.value.style.top = '0';
      lightbox.value.style.left = '0';

      const newTop = centerTop + window.scrollY - (containerRect.top + window.scrollY);
      const newLeft = centerLeft + window.scrollX - (containerRect.left + window.scrollX);

      calculateRatio();

      container.value.style.position = 'relative';

      timeoutRef.value = setTimeout(() => {
        ctx.emit('open');

        if (props.responsive) lightbox.value.classList.remove('responsive-media');
        lightbox.value.classList.add('active');

        container.value.style.width = baseRect.value['width'] + 'px';
        container.value.style.height = baseRect.value['height'] + 'px';

        lightbox.value.style.width = newWidth.value + 'px';
        lightbox.value.style.height = newHeight.value + 'px';
        lightbox.value.style.top = newTop - newHeight.value / 2 + 'px';
        lightbox.value.style.left = newLeft - newWidth.value / 2 + 'px';
      }, 50);
    };

    const closeLightbox = () => {
      clearTimeout(timeoutRef.value);
      isClosing.value = true;
      isOpening.value = false;

      setTimeout(() => {
        hideOverlay();
      }, 50);

      ctx.emit('close');

      lightbox.value.style.position = 'absolute';
      lightbox.value.style.top = '0px';
      lightbox.value.style.left = '0px';

      lightbox.value.style.width = baseRect.value['width'] + 'px';
      lightbox.value.style.height = baseRect.value['height'] + 'px';
    };

    const clearLightbox = () => {
      lightbox.value.classList.remove('active');
      unsetOverlay();
      if (props.responsive) lightbox.value.classList.add('responsive-media');

      container.value.removeAttribute('style');
      lightbox.value.style.position = '';
      lightbox.value.style.left = '';
      lightbox.value.style.top = '';
      lightbox.value.style.width = '';
      lightbox.value.style.height = '';
      lightbox.value.style.transform = '';

      unsetOverflowParents();
    };

    const setOverflowParents = () => {
      overflowParents.value = [];
      // @ts-ignore
      for (let elem = lightbox.value; elem && elem !== document; elem = elem.parentNode) {
        const elementSyle = window.getComputedStyle(elem);
        if (
          elementSyle.overflow === 'hidden' ||
          elementSyle.overflowX === 'hidden' ||
          elementSyle.overflowY === 'hidden' ||
          elem === document.body
        ) {
          overflowParents.value.push(elem);
          elem.style.setProperty('overflow', 'visible', 'important');
        }
      }
    };

    const unsetOverflowParents = () => {
      overflowParents.value.forEach((parent) => (parent.style.overflow = ''));
      document.body.style.overflowX = '';
    };

    const setOverlay = () => {
      if (overlay.value) {
        setOverlayEvent();
        return;
      }

      setOverflowParents();

      overlay.value = document.createElement('div');

      overlay.value.style.transitionDuration = props.animationDuration + 'ms';
      overlay.value.className = `lightbox-overlay ${props.overlayClass}`;
      container.value.appendChild(overlay.value);

      if (props.caption) {
        caption.value = document.createElement('p');
        caption.value.className = 'lightbox-caption';
        caption.value.innerHTML = props.caption;
        overlay.value.appendChild(caption.value);
      }

      setOverlayEvent();
    };

    const unsetOverlay = () => {
      if (overlay.value) {
        if (props.caption) caption.value.remove();
        overlay.value.removeEventListener('click', overlayClickRef.value);
        overlay.value.remove();
        overlay.value = null;
      }
    };

    const showOverlay = () => {
      setTimeout(() => {
        if (overlay.value) overlay.value.style.opacity = 1;
      }, 50);
    };

    const hideOverlay = () => {
      if (overlay.value) overlay.value.style.opacity = 0;
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      removeListeners();
      removeComponent(uid);
    });

    return {
      classes,
      lightbox,
      container,
      closeLightbox,
      style,
      onClickTrigger,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
