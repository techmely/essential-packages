import path from 'path';
import { defineConfig } from 'vite';
import * as url from 'url';
import ViteDts from 'vite-plugin-dts';

import packages from './package.json';

const isDev = process.env.ENV === 'development';

export default defineConfig({
  plugins: [ViteDts()],

  build: {
    sourcemap: true,
    terserOptions: {
      compress: !isDev
        ? {
            drop_debugger: true,
            drop_console: true,
            unused: true,
          }
        : undefined,
    },
    rollupOptions: {
      external: [
        ...Object.keys(packages.devDependencies),
        ...Object.keys(packages.peerDependencies),
      ],
    },
    lib: {
      entry: path.resolve(path.dirname(url.fileURLToPath(import.meta.url))),
      formats: ['es', 'cjs'],
    },
  },
});
