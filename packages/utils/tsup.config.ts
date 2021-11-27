import config from '../../config/tsup.base';
import pkg from './package.json';

export default config(pkg, { tsupOptions: { minify: true } });
