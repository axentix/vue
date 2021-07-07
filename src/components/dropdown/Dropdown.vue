<template>
  <div :style="style" class="dropdown" v-bind="$attrs" v-on="listeners">
    <slot name="trigger"></slot>

    <div
      :style="contentStyle"
      :class="[{ 'constrain-width': isConstrainWidth }, contentClass]"
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

export default defineComponent({
  name: 'AxDropdown',
  mixins: [vModelMixin],
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
      default: true,
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
      documentClickRef = ref(null),
      contentMaxHeight = ref(0),
      contentDisplay = ref(''),
      content = ref(null),
      uid = generateUid();

    const classes = computed(() => {
      const anim = 'anim-' + props.animationType;
      return {
        anim: props.animationType !== 'none' ? '' : anim,
        active: isActive.value,
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
      isActive.value = state;
      console.log('vmodel', state, isActive.value);
      ctx.emit(vmodelEvent, state);
    });

    watch(isActive, (state) => {
      ctx.emit(vmodelEvent, state);
    });

    const init = () => {
      addComponent({ type: 'Dropdown', uid, data: { closeDropdown } });

      setupListeners();

      if (vmodel.value) {
        openDropdown();
        isActive.value = true;
      }

      ctx.emit('setup');
    };

    const setupListeners = () => {
      documentClickRef.value = onDocumentClick.bind(this);
      document.addEventListener('click', documentClickRef, true);
    };

    const removeListeners = () => {
      document.removeEventListener('click', documentClickRef, true);
      documentClickRef.value = undefined;
    };

    const onDocumentClick = (e) => {
      if (e.target.matches('.dropdown-trigger') || isAnimated.value || !isActive.value) {
        return;
      }

      console.log('clicked on document');

      closeDropdown();
    };

    const onClickTrigger = (e) => {
      e.preventDefault();
      if (isAnimated.value) {
        return;
      }

      isActive.value ? closeDropdown() : openDropdown();
    };

    const setContentHeight = () => {
      const elRect = content.value.getBoundingClientRect();

      const bottom =
        elRect.height - (elRect.bottom - (window.innerHeight || document.documentElement.clientHeight)) - 10;
      console.log(elRect);
      contentMaxHeight.value = bottom + 'px';
    };

    const openDropdown = () => {
      if (isActive.value || isAnimated.value) {
        return;
      }

      getComponentsByType('Dropdown').map((c) => {
        c.data.closeDropdown(uid);
      });

      console.log('open');
      ctx.emit('open');

      contentDisplay.value = 'flex';

      props.preventViewport ? setContentHeight() : '';

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

    const closeDropdown = (id) => {
      if (!isActive.value || (props.autoClose && id !== uid.value)) {
        return;
      }
      console.log('close');

      ctx.emit('close');

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
      removeListeners();
      removeComponent(uid);
    });

    return {
      classes,
      style,
      onClickTrigger,
      content,
      contentStyle,
      isConstrainWidth: props.constrainWidth,
      contentClass: props.contentClasses,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
