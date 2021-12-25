import { resolve } from 'path';
import type { AliasOptions } from 'vite';
import { defineConfig } from 'vite';

const r = (p: string) => resolve(__dirname, p);

export const alias: AliasOptions = {
  '@techmely/news': r('./packages/news/'),
  '@techmely/news-admin': r('./packages/news-admin/src/'),
  '@techmely/core': r('./packages/core/src/'),
};

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    global: true,
    environment: 'jsdom',
  },
});
