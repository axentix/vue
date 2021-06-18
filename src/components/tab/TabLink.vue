<template>
  <li class="tab-link" ref="el" v-on="listeners" @click="linkSelected" :class="classes">
    <a v-bind="$attrs" :href="href">
      <slot></slot>
    </a>
  </li>
</template>

<script>
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue-demi';
import { generateUid } from '../../utils/global';

export default defineComponent({
  name: 'AxTabLink',
  inheritAttrs: false,
  props: {
    href: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const isRegistered = ref(false),
      el = ref(null),
      data = reactive({
        uid: generateUid(),
        selected: props.active,
        el,
        itemId: props.href.split('#')[1],
      }),
      tabLinks = inject('ax-tab-links'),
      currentTab = inject('ax-tab-current');

    watch(tabLinks, () => {
      registerTabLink();
    });

    const classes = computed(() => {
      return {
        active: data.selected,
      };
    });

    const registerTabLink = () => {
      if (!tabLinks.value || isRegistered.value) return;

      tabLinks.value.push(data);

      isRegistered.value = true;
    };

    const removeTabLink = () => {
      if (!tabLinks.value || !isRegistered.value) return;

      const index = tabLinks.value.findIndex((link) => link.uid === data.uid);
      tabLinks.value.splice(index, 1);
    };

    const linkSelected = () => {
      if (data.selected) return;
      data.selected = true;

      currentTab.value = data;
    };

    onMounted(() => {
      registerTabLink();
    });

    onBeforeUnmount(() => {
      removeTabLink();
    });

    return {
      linkSelected,
      classes,
      el,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
