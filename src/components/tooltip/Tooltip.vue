<template>
  <div class="tooltiper" @mouseenter="show" @mouseleave="hide" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, ref, getCurrentInstance } from 'vue-demi';
import { addInstance, removeInstance } from '../../utils/config';

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
      type: String,
      default: '10px',
    },
    position: {
      type: String,
      default: 'top',
      validator: (val) => ['top', 'right', 'bottom', 'left'].includes(val),
    },
  },
  setup(props, ctx) {
    const instance = ref(null),
      elRect = ref(null),
      tooltip = ref(null),
      tooltipRect = ref(null);

    const init = () => {
      ctx.emit('init');

      instance.value = getCurrentInstance();
      addInstance({ type: 'Tooltip', instance: instance.value });

      tooltipRect.value = instance.value.proxy.$el.getBoundingClientRect();

      console.log(tooltipRect.value);

      createTooltip();
      updatePosition();
    };

    const createTooltip = () => {
      tooltip.value = document.createElement('div');
      setProperties();
      document.body.appendChild(tooltip.value);
    };

    const setProperties = () => {
      tooltip.value.style.transform = 'translate(0)';
      tooltip.value.style.opacity = 0;
      tooltip.value.className = 'tooltip ' + props.classes;
      tooltip.value.style.transitionDuration = props.animationDuration + 'ms';
      tooltip.value.innerHTML = props.content;
    };

    const updatePosition = () => {
      elRect.value = instance.value.proxy.$el.getBoundingClientRect();

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
        tooltip.value.style.top = tooltipRect.value.top - tooltipRect.value.height + 'px';
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
      updatePosition();

      ctx.emit('show');
      setTimeout(() => {
        props.position == 'top'
          ? (tooltip.value.style.transform = `translateY(-${props.offset})`)
          : props.position == 'right'
          ? (tooltip.value.style.transform = `translateX(${props.offset})`)
          : props.position == 'bottom'
          ? (tooltip.value.style.transform = `translateY(${props.offset})`)
          : props.position == 'left'
          ? (tooltip.value.style.transform = `translateX(-${props.offset})`)
          : '';

        tooltip.value.style.opacity = 1;
      }, props.animationDelay);
    };

    const hide = () => {
      ctx.emit('hide');

      tooltip.value.style.transform = 'translate(0)';
      tooltip.value.style.opacity = 0;
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      removeInstance(getCurrentInstance());
    });

    return {
      show,
      hide,
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