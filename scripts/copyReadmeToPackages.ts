import glob from 'fast-glob';
import { copyFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

(async () => {
  const packages = await glob(['packages/*'], {
    onlyDirectories: true,
    absolute: true,
  });

  // eslint-disable-next-line no-restricted-syntax
  for (const packageDir of packages) {
    const source = path.join(path.dirname(fileURLToPath(import.meta.url)), '../README.md');
    const target = path.join(packageDir, 'README.md');
    // eslint-disable-next-line no-await-in-loop
    await copyFile(source, target);
  }
})();
