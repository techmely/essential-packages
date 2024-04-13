import { execa } from "execa";

export async function execCommand(cmd: string, args: string[]) {
  const res = await execa(cmd, args);
  return res.stdout.trim();
}
