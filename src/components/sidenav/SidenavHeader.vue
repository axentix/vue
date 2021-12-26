<template>
  <div class="sidenav-header" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxSidenavHeader',
  setup(_, ctx) {
    return {
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
