<template>
  <div class="tooltiper" ref="tooltiper" @mouseenter="show" @mouseleave="hide" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue-demi';
import { addComponent, removeComponent, generateUid } from '../../utils/global';

export default defineComponent({
  name: 'AxTooltip',
  props: {
    content: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: 'grey dark-4 light-shadow-2 p-2',
    },
    animationDuration: {
      type: Number,
      default: 200,
    },
    animationDelay: {
      type: Number,
      default: 0,
    },
    offset: {
      type: Number,
      default: 10,
    },
    position: {
      type: String,
      default: 'top',
      validator: (val) => ['top', 'right', 'bottom', 'left'].includes(val),
    },
  },
  setup(props, ctx) {
    const elRect = ref(null),
      isShown = ref(false),
      tooltip = ref(null),
      resizeRef = ref(null),
      timeoutRef = ref(null),
      tooltiper = ref(null),
      tooltipRect = ref(null);

    const uid = generateUid();

    watch(
      () => props.content,
      (state) => {
        if (!tooltip.value) return;
        tooltip.value.innerHTML = state;

        updatePosition();
      }
    );

    const init = () => {
      addComponent({ type: 'Tooltip', uid });

      setupListeners();

      tooltipRect.value = tooltiper.value.getBoundingClientRect();

      createTooltip();
      updatePosition();
      tooltip.value.style.display = 'none';

      ctx.emit('setup');
    };

    const setupListeners = () => {
      resizeRef.value = updatePosition.bind(this);
      window.addEventListener('resize', resizeRef.value);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', resizeRef.value);
      destroyTooltip();
    };

    const createTooltip = () => {
      tooltip.value = document.createElement('div');
      setProperties();
      document.body.appendChild(tooltip.value);
    };

    const destroyTooltip = () => {
      tooltip.value.remove();
    };

    const setProperties = () => {
      tooltip.value.style.transform = 'translate(0)';
      tooltip.value.style.opacity = 0;
      tooltip.value.className = 'tooltip ' + props.classes;
      tooltip.value.style.transitionDuration = props.animationDuration + 'ms';
      tooltip.value.innerHTML = props.content;
    };

    const updatePosition = () => {
      elRect.value = tooltiper.value.getBoundingClientRect();

      setBasicPosition();

      tooltipRect.value = tooltip.value.getBoundingClientRect();

      manualTransform();
    };

    const setBasicPosition = () => {
      if (props.position == 'top' || props.position == 'bottom') {
        props.position == 'top'
          ? (tooltip.value.style.top = elRect.value.top + 'px')
          : (tooltip.value.style.top = elRect.value.top + elRect.value.height + 'px');
      } else if (props.position == 'left' || props.position == 'right') {
        props.position == 'right'
          ? (tooltip.value.style.left = elRect.value.left + elRect.value.width + 'px')
          : '';
      }
    };

    const manualTransform = () => {
      if (props.position === 'top' || props.position === 'bottom') {
        tooltip.value.style.left =
          elRect.value.left + elRect.value.width / 2 - tooltipRect.value.width / 2 + 'px';
      } else if (props.position === 'left' || props.position === 'right') {
        tooltip.value.style.top =
          elRect.value.top + elRect.value.height / 2 - tooltipRect.value.height / 2 + 'px';
      }

      if (props.position === 'top') {
        tooltip.value.style.top =
          tooltipRect.value.top + (isShown.value ? props.offset : 0) - tooltipRect.value.height + 'px';
      } else if (props.position === 'left') {
        tooltip.value.style.left = elRect.value.left - tooltipRect.value.width + 'px';
      }

      const scrollY = window.scrollY;
      const tooltipTop = parseFloat(tooltip.value.style.top);

      props.position === 'top'
        ? (tooltip.value.style.top = scrollY * 2 + tooltipTop + 'px')
        : (tooltip.value.style.top = scrollY + tooltipTop + 'px');
    };

    const show = () => {
      tooltip.value.style.display = 'block';
      setProperties();
      updatePosition();
      isShown.value = true;

      ctx.emit('show');
      timeoutRef.value = setTimeout(() => {
        props.position == 'top'
          ? (tooltip.value.style.transform = `translateY(-${props.offset}px)`)
          : props.position == 'right'
          ? (tooltip.value.style.transform = `translateX(${props.offset}px)`)
          : props.position == 'bottom'
          ? (tooltip.value.style.transform = `translateY(${props.offset}px)`)
          : props.position == 'left'
          ? (tooltip.value.style.transform = `translateX(-${props.offset}px)`)
          : '';

        tooltip.value.style.opacity = 1;
      }, props.animationDelay);
    };

    const hide = () => {
      ctx.emit('hide');
      clearTimeout(timeoutRef.value);
      isShown.value = false;

      tooltip.value.style.transform = 'translate(0)';
      tooltip.value.style.opacity = 0;

      setTimeout(() => {
        tooltip.value.style.display = 'none';
      }, props.animationDuration);
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      removeListeners();
      removeComponent(uid);
    });

    return {
      show,
      hide,
      tooltiper,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>

<style scoped>
.tooltiper {
  width: fit-content;
  height: fit-content;
}
</style>
