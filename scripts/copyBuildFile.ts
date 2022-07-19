import glob from 'fast-glob';
import path from 'path';
const fse = require('fs-extra');

async function createModulePkgs({ from, to }) {
  const dirPkgs = glob
    .sync('*/index.{ts,tsx}', { cwd: from })
    .map(path.dirname);
}

async function copyBuildFile() {
  try {
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

copyBuildFile();
