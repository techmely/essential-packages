import { type Options } from 'tsup';
import pkg from './package.json';

import { getTsupOptions } from '@techmely/build-configs';

export default getTsupOptions(pkg);
