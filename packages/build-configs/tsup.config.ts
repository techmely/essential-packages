import { defineConfig } from 'tsup';
import { getTsupOptions } from './src';

const options = getTsupOptions({}, {});

export default defineConfig(options);
