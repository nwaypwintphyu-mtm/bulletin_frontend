import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    transform: {
      '\\.css$': 'vitest-mock-css', // Mock CSS files
    },
  },
});
