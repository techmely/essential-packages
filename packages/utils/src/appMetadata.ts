import { exec } from 'child_process';
import { readFileSync } from 'fs';
import { promisify } from 'util';

import { invariant } from './logger';

const execCmd = promisify(exec);

export const gitLastCommitHash = async () => {
  const gitCommand = 'git rev-parse --short HEAD';
  const { stderr: lastCommitHashErr, stdout: lastCommitHash } = await execCmd(gitCommand);
  invariant(
    lastCommitHashErr,
    `The environment doesn't have GIT, died!\n Error: ${lastCommitHashErr.toString()}`,
  );
  return lastCommitHash.trimEnd();
};

export const gitCurrentBranch = async () => {
  const gitCommand = 'git rev-parse --abbrev-ref HEAD';
  const { stderr: branchNameErr, stdout: gitBranchName } = await execCmd(gitCommand);
  if (branchNameErr) {
    throw new Error(`The environment doesn't have GIT, died!\n Error: ${branchNameErr.toString()}`);
  }
  return gitBranchName.trimEnd();
};

/**
 *
 * @param {string} path default is package.json
 * @param {string} appVersionCI case your team use ENV in CI
 * @returns {string} app version
 */
export const getAppVersion = (path = 'package.json', appVersionCI = process.env.APP_VERSION) => {
  const pkgJson = JSON.parse(readFileSync(path, 'utf8'));
  const { version } = pkgJson;

  return appVersionCI || version;
};
