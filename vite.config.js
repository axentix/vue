import { defineConfig } from 'vite';
// import { createVuePlugin } from 'vite-plugin-vue2';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { isVue2 } from 'vue-demi';
import autoprefixer from 'autoprefixer';

const plugins = [];
let outDir = 'dist/';

// if (isVue2) {
//   plugins.push(createVuePlugin());
//   outDir += 'vue2/';
// } else {
plugins.push(vue());
outDir += 'vue3/';
// }

export default defineConfig({
  plugins,
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  build: {
    outDir,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'VueAxentix',
      formats: ['cjs', 'es', 'iife'],
      fileName: 'vue-axentix',
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        assetFileNames: `vue-axentix.[ext]`,
        globals: {
          vue: 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
  },
});
