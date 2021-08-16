<template>
  <div
    :style="style"
    :class="[classes, animation]"
    class="dropdown"
    v-ax-click-outside="() => onDocumentClick()"
    v-bind="$attrs"
    v-on="listeners"
  >
    <slot name="trigger"></slot>

    <div
      :style="contentStyle"
      :class="[{ 'constrain-width': constrainWidth }, contentClasses]"
      class="dropdown-content"
      ref="content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, toRefs, ref, watch } from 'vue-demi';
import { addComponent, removeComponent, generateUid, getComponentsByType } from '../../utils/global';
import vModelMixin, { getVModelEvent, getVModelKey } from '../../utils/v-model';
import AxClickOutside from '../../directives/click-outside';

export default defineComponent({
  name: 'AxDropdown',
  mixins: [vModelMixin],
  directives: {
    axClickOutside: AxClickOutside,
  },
  props: {
    animationDuration: {
      type: Number,
      default: 300,
    },
    animationType: {
      type: String,
      default: 'none',
      validator: (val) => ['none', 'fade'].includes(val),
    },
    constrainWidth: {
      type: Boolean,
      default: false,
    },
    contentClasses: {
      type: String,
      default: '',
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    preventViewport: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()],
      vmodelEvent = getVModelEvent(),
      isActive = ref(false),
      isAnimated = ref(false),
      contentMaxHeight = ref(0),
      contentDisplay = ref(''),
      content = ref(null),
      uid = generateUid();

    const classes = computed(() => {
      return {
        active: isActive.value,
        'dropdown-vp': props.preventViewport,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationType !== 'none' ? props.animationDuration + 'ms' : '',
      };
    });

    const contentStyle = computed(() => {
      return {
        display: contentDisplay.value,
        maxHeight: contentMaxHeight.value ? contentMaxHeight.value : 'auto',
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      state ? openDropdown() : closeDropdown();
      ctx.emit(vmodelEvent, state);
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    const init = () => {
      addComponent({ type: 'Dropdown', uid, data: { closeDropdown } });

      if (vmodel.value) {
        openDropdown();
        isActive.value = true;
      }

      ctx.emit('setup');
    };

    const onDocumentClick = () => {
      if (isAnimated.value || !isActive.value) {
        return;
      }

      closeDropdown();
    };

    const setContentHeight = () => {
      const elRect = content.value.getBoundingClientRect();

      const bottom =
        elRect.height - (elRect.bottom - (window.innerHeight || document.documentElement.clientHeight)) - 10;

      contentMaxHeight.value = bottom + 'px';
    };

    const openDropdown = () => {
      if (isActive.value || isAnimated.value) return;

      if (props.autoClose) {
        getComponentsByType('Dropdown').map((c) => {
          c.data.closeDropdown();
        });
      }

      ctx.emit('open');

      contentDisplay.value = 'flex';
      setTimeout(() => {
        isActive.value = true;
        props.preventViewport ? setContentHeight() : '';
      }, 10);

      if (props.animationType !== 'none') {
        isAnimated.value = true;
        setTimeout(() => {
          isAnimated.value = false;
          ctx.emit('opened');
        }, props.animationDuration);
      } else {
        ctx.emit('opened');
      }
    };

    const closeDropdown = () => {
      if (!isActive.value) return;

      ctx.emit('close');
      isActive.value = false;
      if (props.animationType !== 'none') {
        isAnimated.value = true;
        setTimeout(() => {
          contentDisplay.value = '';
          isAnimated.value = false;
          ctx.emit('closed');
        }, props.animationDuration);
      } else {
        contentDisplay.value = '';
        isAnimated.value = false;
        ctx.emit('closed');
      }
    };

    onMounted(() => {
      init();
    });

    onUnmounted(() => {
      removeComponent(uid);
    });

    return {
      classes,
      style,
      content,
      contentStyle,
      onDocumentClick,
      animation: 'anim-' + props.animationType,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
