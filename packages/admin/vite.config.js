import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
// import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: '@', // @/xxx => src/xxx
        replacement: '/src',
      },
    ],
  },
  optimizeDeps: {
    // include: ['schart.js'],
  },
  // base: './'
});
