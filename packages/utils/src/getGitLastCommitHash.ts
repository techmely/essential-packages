import { execCommand } from "./execCommand";

export async function getLastGitCommitHash() {
  const commitHash = await execCommand("git", ["rev-parse", "--short", "HEAD"]);
  return commitHash;
}
