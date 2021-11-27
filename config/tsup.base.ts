import { Options } from 'tsup';

type BuildOptions = {
  externalDeps?: string[];
  tsupOptions?: Partial<Options>;
};

export default function getTsupOptions(pkg: any, buildOptions?: BuildOptions) {
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
    ignoreWatch: ['**/{.git,node_modules}/**', 'dist', 'src/**/*.spec.ts'],
    ...buildOptions?.tsupOptions,
  };
  return options;
}
