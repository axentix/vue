<template>
  <div class="sidenav-footer" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxSidenavFooter',
  setup(_, ctx) {
    return {
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
