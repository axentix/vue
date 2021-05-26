<template>
  <div class="form-group" v-bind="$attrs" v-on="listeners">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue-demi';

export default defineComponent({
  name: 'AxFormGroup',
  setup(_, ctx) {
    return {
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
