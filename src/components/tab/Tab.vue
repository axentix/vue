<template>
  <div class="tab" v-bind="$attrs" v-on="listeners" :style="style" :class="classes">
    <div class="tab-arrow" v-if="arrow" ref="arrowRef" :class="arrowClasses">
      <div class="tab-prev" @click="scrollLeft" :class="prevClasses">
        <slot name="left-arrow"> &lsaquo; </slot>
      </div>

      <ul class="tab-menu" :style="styleMenu" ref="menu">
        <slot name="menu"></slot>
      </ul>

      <div class="tab-next" @click="scrollRight" :class="nextClasses">
        <slot name="right-arrow"> &rsaquo; </slot>
      </div>
    </div>

    <ul class="tab-menu" :style="styleMenu" ref="menu" v-else>
      <slot name="menu"></slot>
    </ul>

    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, provide, ref, toRefs, watch } from 'vue-demi';
import vModelMixin, { getVModelKey, getVModelEvent } from '../../utils/v-model';

export default defineComponent({
  name: 'AxTab',
  mixins: [vModelMixin],
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'none',
      validator: (val) => ['none'].includes(val),
    },
    animationDuration: {
      type: Number,
      default: 300,
    },
    disableActiveBar: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    prevClasses: {
      type: String,
      default: '',
    },
    nextClasses: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const propsRef = toRefs(props),
      vmodel = propsRef[getVModelKey()],
      oldTab = ref({}),
      currentTab = ref({}),
      tabLinks = ref([]),
      tabItems = ref([]),
      tabBarLeftOffset = ref(0),
      tabBarRightOffset = ref(0),
      timer = ref(null),
      arrowRef = ref(null),
      isArrowShow = ref(false),
      menu = ref(null);

    const vmodelEvent = getVModelEvent();

    provide('ax-tab-links', tabLinks);
    provide('ax-tab-current', currentTab);
    provide('ax-tab-items', tabItems);

    const classes = computed(() => {
      return {
        'full-width': props.fullWidth,
      };
    });

    const arrowClasses = computed(() => {
      return {
        'tab-arrow-show': isArrowShow.value,
      };
    });

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
      };
    });

    const styleMenu = computed(() => {
      return {
        '--tab-bar-left-offset': tabBarLeftOffset.value,
        '--tab-bar-right-offset': tabBarRightOffset.value,
      };
    });

    watch(propsRef.fullWidth, () => {
      setTimeout(() => {
        updateActiveBar();
      }, 100);
    });

    watch(vmodel, (state) => {
      if (state === null) return;

      const index = tabLinks.value.findIndex((link) => link.itemId === state);
      if (index === -1) return;

      oldTab.value.selected = false;

      currentTab.value = tabLinks.value[index];
      currentTab.value.selected = true;
    });

    watch(currentTab, () => {
      oldTab.value.selected = false;

      select();

      oldTab.value = currentTab.value;

      ctx.emit(vmodelEvent, currentTab.value.itemId);
    });

    const setupListeners = () => {
      window.addEventListener('resize', handleResize);
    };

    const removeListeners = () => {
      window.removeEventListener('resize', handleResize);
    };

    const handleResize = () => {
      if (timer.value) clearTimeout(timer.value);
      timer.value = setTimeout(updateActiveBar, 100);

      if (props.arrow) toggleArrowMode();
    };

    const toggleArrowMode = () => {
      if (!props.arrow) return;

      const totalWidth = tabLinks.value.reduce((acc, link) => {
        acc += link.el.clientWidth;
        return acc;
      }, 0);
      const arrowWidth = arrowRef.value.clientWidth;

      isArrowShow.value = totalWidth > arrowWidth;
    };

    const scrollLeft = () => {
      if (!props.arrow) return;
      menu.value.scrollLeft -= 40;
    };

    const scrollRight = () => {
      if (!props.arrow) return;
      menu.value.scrollLeft += 40;
    };

    const select = () => {
      tabItems.value.map((item) => {
        if (item.id !== currentTab.value.itemId) item.hide = true;
      });

      const item = tabItems.value.find((item) => item.id === currentTab.value.itemId);
      item.hide = false;

      updateActiveBar();
    };

    const updateActiveBar = () => {
      if (props.disableActiveBar)
        return (tabBarLeftOffset.value = 'unset'), (tabBarRightOffset.value = 'unset');

      const elementRect = currentTab.value.el.getBoundingClientRect();

      const elementPosLeft = elementRect.left;
      const menuPosLeft = menu.value.getBoundingClientRect().left;
      const left = elementPosLeft - menuPosLeft + menu.value.scrollLeft;

      const elementWidth = elementRect.width;
      const right = menu.value.clientWidth - left - elementWidth;

      tabBarLeftOffset.value = Math.floor(left) + 'px';
      tabBarRightOffset.value = Math.ceil(right) + 'px';
    };

    const updateActiveElement = () => {
      let selectedLink = tabLinks.value.find((link) => link.selected);
      if (!selectedLink)
        selectedLink = vmodel.value
          ? tabLinks.value.find((link) => link.itemId === vmodel.value)
          : tabLinks.value[0];

      currentTab.value = selectedLink;
    };

    onMounted(() => {
      setupListeners();
      if (props.arrow) toggleArrowMode();
      updateActiveElement();
    });

    onUnmounted(() => {
      removeListeners();
    });

    return {
      classes,
      style,
      styleMenu,
      menu,
      arrowRef,
      arrowClasses,
      scrollLeft,
      scrollRight,
      updateActiveElement,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
