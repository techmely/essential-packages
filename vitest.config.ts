import { resolve } from 'path';
import type { AliasOptions } from 'vite';
import { defineConfig } from 'vite';

const r = (p: string) => resolve(__dirname, p);

export const alias: AliasOptions = {
  '@techmely/build-configs': r('./packages/build-configs/src/'),
  '@techmely/types': r('./packages/types/src/'),
  '@techmely/icons': r('./packages/icons/src/'),
  '@techmely/utils': r('./packages/utils/src/'),
  '@techmely/vite-plugin-runtime-env': r('./packages/vite-plugin/runtime-env/src/'),
};

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    global: true,
    environment: 'node',
  },
});
