<template>
  <div class="tab" v-bind="$attrs" v-on="listeners" :style="style">
    <ul class="tab-menu" :style="styleMenu" ref="menu">
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
  },
  setup(props, ctx) {
    const vmodel = toRefs(props)[getVModelKey()],
      oldTab = ref({}),
      currentTab = ref({}),
      tabLinks = ref([]),
      tabItems = ref([]),
      tabBarLeftOffset = ref(0),
      tabBarRightOffset = ref(0),
      timer = ref(null),
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

    const style = computed(() => {
      return {
        transitionDuration: props.animationDuration + 'ms',
      };
    });

    const styleMenu = computed(() => {
      return {
        '--tab-bar-left-offset': tabBarLeftOffset.value + 'px',
        '--tab-bar-right-offset': tabBarRightOffset.value + 'px',
      };
    });

    watch(vmodel, (state) => {
      if (state === null) return;
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
      if (props.disableActiveBar) return;

      const elementRect = currentTab.value.el.getBoundingClientRect();

      const elementPosLeft = elementRect.left;
      const menuPosLeft = menu.value.getBoundingClientRect().left;
      const left = elementPosLeft - menuPosLeft + menu.value.scrollLeft;

      const elementWidth = elementRect.width;
      const right = menu.value.clientWidth - left - elementWidth;

      tabBarLeftOffset.value = Math.floor(left);
      tabBarRightOffset.value = Math.ceil(right);
    };

    const updateActiveElement = () => {
      const selectedLink = tabLinks.value.find((link) => link.selected);
      if (!selectedLink) return (currentTab.value = tabLinks.value[0]);
      currentTab.value = selectedLink;
    };

    onMounted(() => {
      setupListeners();
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
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
