const glob = require('fast-glob');
const path = require('path');
const fse = require('fs-extra');

const ESM_EXTENSION = '.mjs';
const CM_EXTENSION = '.js';
const TYPE_EXTENSION = '.d.ts';

const root = process.cwd();
const srcPath = path.join(root, './src');
const pkgJsonPath = path.join(root, './package.json');

async function reallyCuteGenerate() {
  try {
    await generateExports();
    await generateTypesVersion();
    console.log(
      '\nSuccessfully generated exports and typesVersions in package.json'
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function generateExports() {
  const folders = await getModules();
  const modules = folders.map(folder => ({
    [`./${folder}`]: {
      import: compose(folder, ESM_EXTENSION),
      require: compose(folder, CM_EXTENSION)
    }
  }));
  modules.unshift({
    ['.']: {
      import: compose('index', ESM_EXTENSION),
      require: compose('index', CM_EXTENSION)
    }
  });
  await writeFileToPkgJson('exports', modules);
}

async function generateTypesVersion() {
  const folders = await getModules();
  const types = folders.map(folder => ({
    [folder]: [compose(folder, TYPE_EXTENSION, 'index', 'dist')]
  }));
  await writeFileToPkgJson('typesVersions', types, { '*': {} });
}

async function writeFileToPkgJson(key, modules, baseValue = {}) {
  let values = baseValue;
  const isNestedValues = Object.keys(baseValue).length > 0;
  const firstKey = Object.keys(values)[0];
  for (const module of modules) {
    const key = Object.keys(module)[0];
    if (isNestedValues) {
      values[firstKey][key] = module[key];
    } else {
      values[key] = module[key];
    }
  }
  let packageJson = await fse.readFile(pkgJsonPath);
  let parseJson = JSON.parse(packageJson);
  parseJson[key] = values;
  await fse.writeFile(pkgJsonPath, JSON.stringify(parseJson, null, 2), 'utf8');
}

async function getModules() {
  const paths = await glob(`${srcPath}/**/*`, { onlyDirectories: true });
  return paths.map(path => path.split('/').pop() || '');
}

function compose(
  folder,
  extension,
  fileName = 'index',
  buildFolder = './dist'
) {
  return `${buildFolder}${
    folder === 'index' ? '' : `/${folder}`
  }/${fileName}${extension}`;
}

reallyCuteGenerate();
