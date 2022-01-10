import { getTsupOptions } from '@techmely/build-configs';
import pkg from './package.json';

const options = getTsupOptions(pkg, { tsupOptions: { minify: true, target: 'node14' } });

export default options;
