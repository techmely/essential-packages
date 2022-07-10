import path from 'path';
import { readFile, readFileSync } from './fs';

export async function findNearestFile<T>(
  fileName: string,
  directoryPath: string = path.resolve()
): Promise<{ path: string; data: T }> {
  try {
    const packageJsonPath = path.join(directoryPath, fileName);
    const packageJsonData = JSON.parse(await readFile(packageJsonPath));
    return {
      path: packageJsonPath,
      data: packageJsonData
    };
  } catch (error) {
    const parentDirectoryPath = path.dirname(directoryPath);
    if (parentDirectoryPath === directoryPath) {
      throw new Error(`No ${fileName} files found`);
    }
    return findNearestFile(parentDirectoryPath, fileName);
  }
}

export function findNearestFileSync<T>(
  fileName: string,
  directoryPath: string = path.resolve()
): { path: string; data: T } {
  try {
    const packageJsonPath = path.join(directoryPath, fileName);
    const packageJsonData = JSON.parse(readFileSync(packageJsonPath));
    return {
      path: packageJsonPath,
      data: packageJsonData
    };
  } catch (error) {
    const parentDirectoryPath = path.dirname(directoryPath);
    if (parentDirectoryPath === directoryPath) {
      throw new Error(`No ${fileName} files found`);
    }
    return findNearestFileSync(parentDirectoryPath, fileName);
  }
}
