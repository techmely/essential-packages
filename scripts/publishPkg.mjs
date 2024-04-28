#!/usr/bin/env zx

import path from "node:path";
import { fileURLToPath } from "node:url";
import glob from "fast-glob";
import fse from "fs-extra";
import { $, cd, echo } from "zx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();
const buildPath = path.join(root, "./dist");

const argv = process.argv;
const isOnlyEsm = argv[2] === "--only-esm";

async function publishPkgNah() {
  try {
    await cpBasePkgJson();
    await Promise.all(["./CHANGELOG.md", "../../LICENSE", "../../README.md"].map(cpBaseFiles));
    // cd(buildPath);
    // echo("Publishing...");
    // await $`npm publish`;
    // echo("Published!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

publishPkgNah();

async function cpBasePkgJson() {
  const basePkgData = await fse.readFile(path.resolve(root, "./package.json"), "utf8");
  const {
    scripts,
    devDependencies,
    files,
    exports,
    dependencies = {},
    peerDependencies = {},
    ...rest
  } = JSON.parse(basePkgData);
  console.log("cpBasePkgJson  👻  exports:", exports);

  mapDepsExactVersion(dependencies);
  mapDepsExactVersion(peerDependencies);

  const newPkgData = {
    ...rest,
    types: "./index.d.ts",
    typings: "./index.d.ts",
    main: "./index.js",
    dependencies,
    peerDependencies,
    ...(!isOnlyEsm && { module: "./index.mjs" }),
  };

  const destination = path.resolve(buildPath, "./package.json");
  await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), "utf8");
  echo(`Created package.json in ${destination}`);
}

async function cpBaseFiles(file) {
  const sourcePath = path.resolve(root, file);
  const targetPath = path.resolve(buildPath, path.basename(file));
  const sourceFile = await fse.readFile(sourcePath, "utf8");
  // Currently, bun not support copy file --> use writeFile instead
  await fse.writeFile(targetPath, sourceFile, "utf8");
  echo(`Copied ${humanizePathname(sourcePath)} to ${humanizePathname(targetPath)}`);
}

function humanizePathname(_path) {
  const projectDir = __dirname.replace(/\/scripts$/, "");
  return _path.replace(projectDir, "");
}

function getDepsMapVersion() {
  const result = {};
  const pkgJsonFiles = glob.globSync("../../ts-packages/**/package.json", {
    ignore: ["**/node_modules", "**/playground", "dist"],
  });

  for (const file of pkgJsonFiles) {
    console.log("getDepsMapVersion  👻  file:", file);
    const data = fse.readFileSync(file, "utf8");
    const json = JSON.parse(data);
    result[json.name] = json.version;
  }

  return result;
}

function mapDepsExactVersion(dependencies) {
  const mapVersions = getDepsMapVersion();
  for (const depName of Object.keys(dependencies)) {
    if (depName.startsWith("@techmely")) dependencies[depName] = mapVersions[depName];
  }
}
