<template>
  <form v-bind="$attrs" v-on="$listeners" :class="classes">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'AxForm',
  props: {
    material: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return {
        'form-material': this.material,
      };
    },
  },
};
</script>
