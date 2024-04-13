import { execCommand } from "./execCommand";

export async function getCurrentGitBranch() {
  return (
    (await execCommand("git", ["tag", "--points-at", "HEAD"])) ||
    (await execCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"]))
  );
}
