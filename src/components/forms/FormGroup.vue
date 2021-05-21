<template>
  <div class="form-group" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AxFormGroup',
};
</script>
