import fs from "fs";
import path from "path";

export type FileExtension =
  | "gif"
  | "jpg"
  | "jpeg"
  | "jpe"
  | "png"
  | "qt"
  | "mov"
  | "mp4"
  | "mp4v"
  | "mpg4"
  | "m4v"
  | "avi"
  | "wmv"
  | "heic";

export enum MimeType {
  JPG = "image/jpeg",
  GIF = "image/gif",
  PNG = "image/png",
  MP4 = "video/mp4",
  QuickTime = "video/quicktime",
  AVI = "video/x-msvideo",
  WMV = "video/x-ms-wmv",
  HEIC = "image/heic",
}

export const mimeTable: {
  ext: FileExtension[];
  type: MimeType;
}[] = [
  { ext: ["gif"], type: MimeType.GIF },
  { ext: ["jpe", "jpeg", "jpg"], type: MimeType.JPG },
  { ext: ["png"], type: MimeType.PNG },
  { ext: ["qt", "mov"], type: MimeType.QuickTime },
  { ext: ["mp4", "mp4v", "mpg4", "m4v"], type: MimeType.MP4 },
  { ext: ["avi"], type: MimeType.AVI },
  { ext: ["wmv"], type: MimeType.WMV },
  { ext: ["heic"], type: MimeType.HEIC },
];

/**
 * This function returns a mime type based on the extension that you pass in, and returns 'unknown' if it doesn't recognize the extension type
 *
 * @example getMimeTypeFromExtension('gif') ===> 'image/gif'
 * @param extension The extension type you want the mime for
 * @returns Returns a mime type like 'image/gif'
 */
export const getMimeTypeFromExtension = (extension: FileExtension) => {
  const result = mimeTable.find(({ ext }) => ext.includes(extension));
  if (!result) {
    throw new Error(`'${extension}' is not a valid extension`);
  }

  return result.type;
};

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

export function readFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

export function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, "utf8");
}

async function getDataPath<T = any>(directoryPath: string, fileName: string) {
  const packageJsonPath = path.join(directoryPath, fileName);
  const pkg = await readFile(packageJsonPath);
  const packageJsonData = JSON.parse(pkg) as T;
  return {
    path: packageJsonPath,
    data: packageJsonData,
  };
}

export async function findNearestFile<T>(
  fileName: string,
  directoryPath: string = path.resolve(),
): Promise<{ path: string; data: T }> {
  try {
    const data = await getDataPath<T>(directoryPath, fileName);
    return data;
  } catch (error) {
    const parentDirectoryPath = path.dirname(directoryPath);
    if (parentDirectoryPath === directoryPath) {
      throw new Error(`No ${fileName} files found`);
    }
    return findNearestFile(parentDirectoryPath, fileName);
  }
}
