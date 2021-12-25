import { getTsupOptions } from '@techmely/build-configs';
import pkg from './package.json';

const options = getTsupOptions(pkg, { tsupOptions: { minify: true } });

export default options;
