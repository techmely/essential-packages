import glob from 'fast-glob';
import path from 'path';
import fse from 'fs-extra';

const root = process.cwd();
const buildPath = path.join(root, './build');
const srcPath = path.join(root, './src');

async function reallyCuteCopyFn() {
  try {
    await cpBasePkgJson();
    await Promise.all(
      ['./CHANGELOG.md', '../../LICENSE', '../../README.md'].map(cpBaseFiles)
    );
    await genPkgJsonToModules({ from: srcPath, to: buildPath });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

reallyCuteCopyFn();

async function genPkgJsonToModules({ from, to }) {
  const dirPkgs = glob
    .sync('*/index.{ts,tsx}', { cwd: from })
    .map(path.dirname);

  await Promise.all([
    dirPkgs.map(async dir => {
      const pkgJsonPath = path.join(to, dir, 'package.json');
      const newPkgData = {
        sideEffects: false,
        typings: './index.d.ts',
        types: './index.d.ts',
        main: './index.js',
        module: './index.mjs'
      };
      await fse.writeFile(
        pkgJsonPath,
        JSON.stringify(newPkgData, null, 2),
        'utf8'
      );

      return pkgJsonPath;
    })
  ]);
}

async function cpBasePkgJson() {
  const basePkgData = await fse.readFile(
    path.resolve(root, './package.json'),
    'utf8'
  );
  const { scripts, devDependencies, publishConfig, ...rest } =
    JSON.parse(basePkgData);

  const newPkgData = {
    ...rest,
    private: false,
    sideEffects: false,
    types: './index.d.ts',
    typings: './index.d.ts',
    main: './index.js',
    module: './index.mjs'
  };

  const destination = path.resolve(buildPath, './package.json');
  await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), 'utf8');
  console.log(`Created package.json in ${destination}`);
}

async function cpBaseFiles(file: string) {
  const sourcePath = path.resolve(root, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  await fse.copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}
