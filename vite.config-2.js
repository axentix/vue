import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import path from 'path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [createVuePlugin()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, 'src')}`,
    },
  },
  server: {
    open: '/dev/vue2/',
  },
  build: {
    outDir: 'dist/vue2/',
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
