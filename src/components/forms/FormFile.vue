<template>
  <div class="form-file">
    <label for="input" :class="labelClasses" ref="label">{{ label }}</label>

    <input type="file" ref="input" id="input" v-bind="$attrs" v-on="$listeners" @change="handleFileInput" />

    <div class="form-file-path" ref="path"></div>
  </div>
</template>

<script>
export default {
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
  methods: {
    handleFileInput() {
      const files = this.$refs.input.files;
      if (files.length > 1) {
        this.$refs.path.innerHTML = Array.from(files)
          .reduce((acc, file) => {
            acc.push(file.name);
            return acc;
          }, [])
          .join(', ');
      } else if (files[0]) {
        this.$refs.path.innerHTML = files[0].name;
      }
    },
  },
};
</script>
