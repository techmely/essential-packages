/// <reference types="vitest" />

import { fileURLToPath } from 'url';
import path from 'path';
import type { AliasOptions } from 'vite';
import { defineConfig } from 'vite';

const r = (p: string) =>
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), p);

export const alias: AliasOptions = {
  '@techmely/build-configs': r('./packages/build-configs/src/'),
  '@techmely/types': r('./packages/types/src/'),
  '@techmely/icons': r('./packages/icons/src/'),
  '@techmely/utils': r('./packages/utils/src/'),
  '@techmely/vite-plugin-runtime-env': r(
    './packages/vite-plugin/runtime-env/src/'
  )
};

export default defineConfig({
  resolve: {
    alias
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['lcovonly']
    },
    include: ['packages/**/test/**/*.test.ts'],
    exclude: [
      'node_modules',
      'packages/**/node_modules',
      'packages/**/dist',
      'dist',
      '.idea',
      '.git',
      '.cache'
    ]
  }
});
