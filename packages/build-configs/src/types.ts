export interface Dependencies {
  [name: string]: string;
}

export interface Funding {
  type: string;
  url: string;
}

export type PackageBin = string | { [commandName: string]: string };

export interface PeerDependenciesMeta {
  [dependencyName: string]: {
    optional?: boolean;
  };
}

export interface DependenciesMeta {
  [dependencyName: string]: {
    injected?: boolean;
    node?: string;
  };
}

export interface PublishConfig extends Record<string, unknown> {
  directory?: string;
  executableFiles?: string[];
}

export type PackageScripts = {
  [name: string]: string;
} & {
  prepublish?: string;
  prepare?: string;
  prepublishOnly?: string;
  prepack?: string;
  postpack?: string;
  publish?: string;
  postpublish?: string;
  preinstall?: string;
  install?: string;
  postinstall?: string;
  preuninstall?: string;
  uninstall?: string;
  postuninstall?: string;
  preversion?: string;
  version?: string;
  postversion?: string;
  pretest?: string;
  test?: string;
  posttest?: string;
  prestop?: string;
  stop?: string;
  poststop?: string;
  prestart?: string;
  start?: string;
  poststart?: string;
  prerestart?: string;
  restart?: string;
  postrestart?: string;
  preshrinkwrap?: string;
  shrinkwrap?: string;
  postshrinkwrap?: string;
};

/**
 * A “person” is an object with a “name” field and optionally “url” and “email”. Or you can shorten that all into a single string, and npm will parse it for you.
 */
export type PackageJsonPerson =
  | string
  | {
      name: string;
      email?: string;
      url?: string;
    };

export interface BasePackageJson {
  name?: string;
  version?: string;
  bin?: PackageBin;
  /**
   * “contributors” is an array of people.
   */
  contributors?: PackageJsonPerson[];
  description?: string;
  directories?: {
    bin?: string;
  };
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  optionalDependencies?: Dependencies;
  peerDependencies?: Dependencies;
  peerDependenciesMeta?: PeerDependenciesMeta;
  dependenciesMeta?: DependenciesMeta;
  bundleDependencies?: string[];
  bundledDependencies?: string[];
  /**
   * If your module is meant to be used client-side the browser field should be used instead of the main field. This is helpful to hint users that it might rely on primitives that aren’t available in Node.js modules. (e.g. window)
   */
  browser?: string;
  homepage?: string;
  /**
   * Specify the place where your code lives. This is helpful for people who want to contribute. If the git repo is on GitHub, then the `npm docs` command will be able to find you.
   * For GitHub, GitHub gist, Bitbucket, or GitLab repositories you can use the same shortcut syntax you use for npm install:
   */
  repository?:
    | string
    | {
        type: string;
        url: string;
        /**
         * If the `package.json` for your package is not in the root directory (for example if it is part of a monorepo), you can specify the directory in which it lives:
         */
        directory?: string;
      };
  scripts?: PackageScripts;
  config?: object;
  engines?: {
    node?: string;
    npm?: string;
    pnpm?: string;
  };
  cpu?: string[];
  os?: string[];
  main?: string;
  /**
   * Specify either a single file or an array of filenames to put in place for the `man` program to find.
   */
  man?: string | string[];
  module?: string;
  typings?: string;
  types?: string;
  publishConfig?: PublishConfig;
  funding?: Funding[];
  keyword?: string[];
  /**
   * The url to your project’s issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package.
   */
  bugs?:
    | string
    | {
        url?: string;
        email?: string;
      };
  /**
   * Alternate and extensible alternative to "main" entry point.
   *
   * When using `{type: "module"}`, any ESM module file MUST end with `.mjs` extension.
   *
   * Docs:
   * - https://nodejs.org/docs/latest-v14.x/api/esm.html#esm_exports_sugar
   *
   * @default 'commonjs'
   * @since Node.js v14
   */
  exports?:
    | string
    | Record<
        'import' | 'require' | '.' | 'node' | 'browser' | string,
        string | Record<'import' | 'require' | string, string>
      >;
}

export type DependencyManifest = BasePackageJson &
  Required<Pick<BasePackageJson, 'name' | 'version'>>;

export type PackageExtension = Pick<
  BasePackageJson,
  | 'dependencies'
  | 'optionalDependencies'
  | 'peerDependencies'
  | 'peerDependenciesMeta'
>;
