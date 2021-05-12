<template>
  <component :is="tag" class="sidenav-link" :class="classes" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'AxSidenavLink',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'a',
      validator: (val) => ['a', 'router-link'].includes(val),
    },
  },
  computed: {
    classes() {
      return {
        active: this.active,
      };
    },
  },
};
</script>
