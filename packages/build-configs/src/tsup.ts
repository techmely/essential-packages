import { type Options } from 'tsup';
import { type BasePackageJson } from './types';

const now = new Date();

const techmelyBanner = (packageName: string) => `
/*!
 * ${packageName}
 * Copyright(c) 2021-${now.getFullYear()} Techmely <techmely.creation@gmail.com>
 * MIT Licensed
 */
`;

type BuildOptions = {
  externalDeps?: string[];
  tsupOptions?: Partial<Options>;
  packageName?: string;
};

export function getTsupOptions(pkg: BasePackageJson, buildOptions?: BuildOptions): Options {
  let external = [
    ...new Set(Object.keys(pkg.peerDependencies ?? {})),
    ...new Set(Object.keys(pkg.devDependencies ?? {})),
  ];
  if (buildOptions?.externalDeps) {
    external = [...external, ...buildOptions.externalDeps];
  }

  const isProd = process.env.NODE_ENV === 'production';

  const options: Options = {
    entryPoints: ['src/index.ts'],
    format: ['cjs', 'esm'],
    pure: isProd ? ['console.log', 'console.warn', 'debugger'] : undefined,
    sourcemap: !isProd,
    splitting: false,
    external,
    ignoreWatch: ['**/{node_modules}/**', 'dist', 'src/**/*.test.ts'],
    banner: {
      js: techmelyBanner(buildOptions?.packageName || pkg.name || 'open-sources'),
    },
    ...buildOptions?.tsupOptions,
  };
  return options;
}
