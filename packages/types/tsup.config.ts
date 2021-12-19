import { getTsupOptions } from '@techmely/build-configs';
import pkg from './package.json';

export default getTsupOptions(pkg, { tsupOptions: { minify: true } });
