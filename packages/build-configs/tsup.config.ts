import { defineConfig } from 'tsup';
import { getTsupOptions } from './src';
import pkg from './package.json';

const options = getTsupOptions(pkg, {
  tsupOptions: {
    outDir: 'dist'
  }
});

export default defineConfig(options);
