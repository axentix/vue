import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { isVue3 } from 'vue-demi';

const plugins = [];
let outDir = 'dist/';

if (isVue3) {
  plugins.push(vue());
  outDir += 'vue3/';
} else {
  plugins.push(createVuePlugin());
  outDir += 'vue2/';
}

export default defineConfig({
  plugins,
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
