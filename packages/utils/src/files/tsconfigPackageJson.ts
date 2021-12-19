import type { CompilerOptions, TypeAcquisition } from 'typescript';

export type StripEnums<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends boolean
    ? T[K]
    : T[K] extends string
    ? T[K]
    : T[K] extends object
    ? T[K]
    : T[K] extends Array<any>
    ? T[K]
    : T[K] extends undefined
    ? undefined
    : any;
};

export interface TSConfig {
  compilerOptions?: StripEnums<CompilerOptions>;
  exclude?: string[];
  compileOnSave?: boolean;
  extends?: string;
  files?: string[];
  include?: string[];
  typeAcquisition?: TypeAcquisition;
}

import { statSync } from 'fs';
import { join, resolve } from 'path';

export interface FindNearestFileOptions {
  /**
   * The starting directory for the search.
   * @default . (same as `process.cwd()`)
   */
  startingFrom?: string;
  /**
   * A pattern to match a path segment above which you don't want to ascend
   * @default /^node_modules$/
   */
  rootPattern?: RegExp;
  /**
   * A matcher that can evaluate whether the given path is a valid file (for example,
   * by testing whether the file path exists.
   *
   * @default fs.statSync(path).isFile()
   */
  test?: (filePath: string) => boolean | null | Promise<boolean | null>;
}

const defaultFindOptions: Required<FindNearestFileOptions> = {
  startingFrom: '.',
  rootPattern: /^node_modules$/,
  test: (filePath: string) => {
    try {
      if (statSync(filePath).isFile()) {
        return true;
      }
    } catch {}
    return null;
  },
};

export async function findNearestFile(
  filename: string,
  _options: FindNearestFileOptions = {},
): Promise<string> {
  const options = { ...defaultFindOptions, ..._options };
  const basePath = resolve(options.startingFrom);
  const leadingSlash = basePath[0] === '/';
  const segments = basePath.split('/').filter(Boolean);

  // Restore leading slash
  if (leadingSlash) {
    segments[0] = '/' + segments[0];
  }

  // Limit to node_modules scope if it exists
  let root = segments.findIndex(r => r.match(options.rootPattern));
  if (root === -1) root = 0;

  for (let i = segments.length; i > root; i--) {
    const filePath = join(...segments.slice(0, i), filename);
    if (await options.test(filePath)) {
      return filePath;
    }
  }

  throw new Error(
    `Cannot find matching ${filename} in ${options.startingFrom} or parent directories`,
  );
}

import * as jsonc from 'jsonc-parser';
import { promises as fsp } from 'fs';
import { ResolveOptions as _ResolveOptions, resolvePath } from 'mlly';
import { isAbsolute } from 'path';

export type ResolveOptions = _ResolveOptions & FindNearestFileOptions;

export function definePackageJSON(pkg: PackageJson): PackageJson {
  return pkg;
}

export function defineTSConfig(tsconfig: TSConfig): TSConfig {
  return tsconfig;
}

export async function readPackageJSON(id: string, opts: ResolveOptions = {}): Promise<PackageJson> {
  const resolvedPath = await resolvePackageJSON(id, opts);
  const blob = await fsp.readFile(resolvedPath, 'utf-8');
  return JSON.parse(blob) as PackageJson;
}

export async function writePackageJSON(path: string, pkg: PackageJson): Promise<void> {
  await fsp.writeFile(path, JSON.stringify(pkg, null, 2));
}

export async function readTSConfig(id: string, opts: ResolveOptions = {}): Promise<TSConfig> {
  const resolvedPath = await resolveTSConfig(id, opts);
  const blob = await fsp.readFile(resolvedPath, 'utf-8');
  return jsonc.parse(blob) as TSConfig;
}

export async function writeTSConfig(path: string, tsconfig: TSConfig): Promise<void> {
  await fsp.writeFile(path, JSON.stringify(tsconfig, null, 2));
}

export async function resolvePackageJSON(
  id: string = process.cwd(),
  opts: ResolveOptions = {},
): Promise<string> {
  const resolvedPath = isAbsolute(id) ? id : await resolvePath(id, opts);
  return findNearestFile('package.json', { startingFrom: resolvedPath, ...opts });
}

export async function resolveTSConfig(
  id: string = process.cwd(),
  opts: ResolveOptions = {},
): Promise<string> {
  const resolvedPath = isAbsolute(id) ? id : await resolvePath(id, opts);
  return findNearestFile('tsconfig.json', { startingFrom: resolvedPath, ...opts });
}
