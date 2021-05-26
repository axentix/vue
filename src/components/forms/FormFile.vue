<template>
  <div class="form-file">
    <label for="input" :class="labelClasses">{{ label }}</label>

    <input type="file" ref="input" id="input" v-bind="$attrs" v-on="listeners" @change="handleFileInput" />

    <div class="form-file-path" ref="path"></div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue-demi';

export default defineComponent({
  name: 'AxFormFile',
  inheritAttrs: false,
  props: {
    labelClasses: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
  setup(_, ctx) {
    const input = ref(null),
      path = ref(null);

    const handleFileInput = () => {
      const files = input.value.files;
      if (files.length > 1) {
        path.value.innerHTML = Array.from(files)
          .reduce((acc, file) => {
            acc.push(file.name);
            return acc;
          }, [])
          .join(', ');
      } else if (files[0]) {
        path.value.innerHTML = files[0].name;
      }
    };

    return {
      handleFileInput,
      input,
      path,
      listeners: ctx.listeners ? ctx.listeners : {},
    };
  },
});
</script>
