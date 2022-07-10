import {
  findNearestFile,
  getAppVersion,
  getCurrentGitBranch,
  getLastGitCommitHash
} from '@techmely/utils';
import { config as dotenvConfig, DotenvParseOutput } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Plugin } from 'vite';

interface Options {
  mountPoint: string;
  extraConfigMountPoint: string;
  configName: string;
  defaultMode: string;
  extraConfig?: DotenvParseOutput | Promise<DotenvParseOutput>;
}

function RuntimeEnv(args: Partial<Options> = {}): Plugin {
  const options: Options = {
    mountPoint: '_env_',
    extraConfigMountPoint: 'extra_env_',
    configName: 'env/conf',
    defaultMode: 'uat',
    ...args
  };

  let configStringJs: string;
  let configStringEnv = '';
  let extraConfigString: string;

  let isDev: boolean;
  return {
    name: 'vite-plugin-runtime-env',
    async configResolved({ mode: _mode, command }) {
      const mode = _mode === 'development' ? options.defaultMode : _mode;
      const envWithMode = fs
        .readFileSync(`.env.${mode}`, { encoding: 'utf-8' })
        .toString();

      const extraConfigJs = await getDefaultExtraConfig();

      let extraConfig: DotenvParseOutput = {};

      if (options?.extraConfig !== undefined) {
        extraConfig = (await options.extraConfig) as DotenvParseOutput;
      }

      isDev = command === 'serve';

      configStringJs = generateConfigString(mode, options.mountPoint, isDev);
      configStringEnv += envWithMode;
      extraConfigString = generateExtraConfigString(
        options.extraConfigMountPoint,
        {
          ...extraConfig,
          ...extraConfigJs
        }
      );
    },
    transformIndexHtml() {
      return isDev
        ? [
            { tag: 'script', children: configStringJs, injectTo: 'head' },
            { tag: 'script', children: extraConfigString, injectTo: 'head' }
          ]
        : [
            { tag: 'script', children: extraConfigString, injectTo: 'head' },
            {
              tag: 'script',
              // Need to slash / for absolute file path => localhost/env/config
              // Avoid web load wrong path like: localhost/website/env/config
              attrs: { src: `/${options.configName}.js`, id: 'app-config' },
              injectTo: 'head'
            }
          ];
    },
    generateBundle() {
      // Emit this js file to make working in dev mode
      this.emitFile({
        type: 'asset',
        fileName: `${options.configName}.js`,
        source: configStringJs
      });
      // This env file serve for in CI/CD mode --> Generate a .env file to Docker container use
      this.emitFile({
        type: 'asset',
        fileName: '.env',
        source: configStringEnv
      });
    }
  };
}

/**
 * Generate env config and mount that in window object
 * @param mode
 * @param mountPoint
 * @param isDev
 * @param additionalConfig
 */
function generateConfigString(mode: string, mountPoint: string, isDev = false) {
  /*
   * @link https://vitejs.dev/guide/env-and-mode.html#env-files
   * Do not modify 4 line of getting the envs! It's standard of Vite ENV
   */
  const allModEnv = dotenvConfig().parsed || {};
  const localEnv = getEnvWithPath('.env.local');
  const remoteModEnv = getEnvWithPath(`.env.${mode}`);
  const localModEnv = getEnvWithPath(`.env.${mode}.local`);

  const envObj = isDev
    ? { ...allModEnv, ...remoteModEnv, ...localEnv, ...localModEnv }
    : { ...allModEnv, ...remoteModEnv };

  return `window.${mountPoint} = ${JSON.stringify(envObj)}`;
}

function generateExtraConfigString(
  mountPoint: string,
  configs: DotenvParseOutput
) {
  return `window.${mountPoint} = ${JSON.stringify(configs)}`;
}

function getEnvWithPath(file: string) {
  return dotenvConfig({ path: path.resolve(process.cwd(), file) }).parsed || {};
}

async function getDefaultExtraConfig() {
  const lastCommitHash = await getLastGitCommitHash();
  const currentBranch = await getCurrentGitBranch();
  const { data } = await findNearestFile<{ name: string }>('package.json');
  const appVersion = await getAppVersion(data.name);

  return {
    APP_VERSION: appVersion,
    GIT_BRANCH_NAME: currentBranch,
    GIT_COMMIT_HASH: lastCommitHash
  } as DotenvParseOutput;
}

export default RuntimeEnv;
export type { DotenvParseOutput };
