import path from 'path';
import fs from 'fs';

export function writeFile(filename: string, content: string | Uint8Array): void {
  const dir = path.dirname(filename);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filename, content);
}

/**
 * @description Use instead of fs.existsSync(filename)
 * if we don't have read permission on a directory, existsSync() still
 * works and will result in massively slow subsequent checks (which are
 * unnecessary in the first place)
 * @param {string} filename
 * @returns {boolean}
 */
export function isFileReadable(filename: string): boolean {
  try {
    fs.accessSync(filename, fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Delete every file and subdirectory. **The given directory must exist.**
 * Pass an optional `skip` array to preserve files in the root directory.
 */
export function emptyDir(dir: string, skip?: string[]): void {
  for (const file of fs.readdirSync(dir)) {
    if (skip?.includes(file)) {
      continue;
    }
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

export function copyDir(srcDir: string, destDir: string): void {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    if (srcFile === destDir) {
      continue;
    }
    const destFile = path.resolve(destDir, file);
    const stat = fs.statSync(srcFile);
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  }
}
