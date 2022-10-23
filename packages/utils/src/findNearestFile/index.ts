import path from "path";
import { readFile } from "../fs";

async function getDataPath(directoryPath: string, fileName: string) {
	const packageJsonPath = path.join(directoryPath, fileName);
	const pkg = await readFile(packageJsonPath);
	const packageJsonData = JSON.parse(pkg);
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
		const data = await getDataPath(directoryPath, fileName);
		return data;
	} catch (error) {
		const parentDirectoryPath = path.dirname(directoryPath);
		if (parentDirectoryPath === directoryPath) {
			throw new Error(`No ${fileName} files found`);
		}
		return findNearestFile(parentDirectoryPath, fileName);
	}
}
