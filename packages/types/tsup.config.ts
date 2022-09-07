import { getTsupOptions } from '../utils/src/build-config';
import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig(getTsupOptions(pkg));
