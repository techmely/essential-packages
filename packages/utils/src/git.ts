import { findLastIndex } from "./array";

export async function getCurrentGitBranch() {
  return (
    (await execCommand("git", ["tag", "--points-at", "HEAD"])) ||
    (await execCommand("git", ["rev-parse", "--abbrev-ref", "HEAD"]))
  );
}

export async function getTags() {
  const tags = await execCommand("git", ["--no-pager", "tag", "-l", "--sort=creatordate"]).then(
    (r) => r.split("\n"),
  );

  return tags;
}

export async function getLastGitTag(delta = 0) {
  const tags = await getTags();
  return tags[tags.length + delta - 1];
}

export async function getAppVersion(pkgName: string) {
  const tags = await getTags();
  const tag = findLastIndex(tags, (tag) => tag.startsWith(pkgName));
  if (tag === -1) {
    throw new Error("Your app(s) doesnt have any tag");
  }
  const version = tags[tag].split("@")[1];

  return version;
}

export async function getLastGitCommitHash() {
  const commitHash = await execCommand("git", ["rev-parse", "--short", "HEAD"]);
  return commitHash;
}

async function execCommand(cmd: string, args: string[]) {
  const { execa } = await import("execa");
  const res = await execa(cmd, args);
  return res.stdout.trim();
}
