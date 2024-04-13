import { execCommand } from "./execCommand";

export async function getGitTags() {
  const tags = await execCommand("git", ["--no-pager", "tag", "-l", "--sort=creatordate"]).then(
    (r) => r.split("\n"),
  );

  return tags;
}
