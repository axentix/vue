import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import autoprefixer from 'autoprefixer';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ skipDiagnostics: false, logDiagnostics: true }), vue()],
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
    open: '/',
  },
  build: {
    outDir: 'dist/vue3/',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'VueAxentix',
      formats: ['es', 'umd'],
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
