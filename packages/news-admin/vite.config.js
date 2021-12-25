import ViteVue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [ViteVue()],
  resolve: {
    alias: [
      {
        find: '@', // @/xxx => src/xxx
        replacement: '/src',
      },
    ],
  },
});
