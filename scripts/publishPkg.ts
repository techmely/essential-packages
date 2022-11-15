import { exec } from "child_process";
import fse from "fs-extra";
import path from "path";
import { promisify } from "util";

const root = process.cwd();
const buildPath = path.join(root, "./dist");

const execSync = promisify(exec);

async function publishPkgNah() {
	try {
		await cpBasePkgJson();
		await Promise.all(
			["./CHANGELOG.md", "../../LICENSE", "../../README.md"].map(cpBaseFiles),
		);
		await fse.writeFile(`${buildPath}/yarn.lock`, "");
		await execSync("yarn", { cwd: buildPath });
		await execSync("rm -rf .yarn && rm -rf node_modules", { cwd: buildPath });
		await execSync("yarn npm publish --tolerate-republish", { cwd: buildPath });
		// Need to remove after build to guarantee the unique package.json in each package
		await execSync("rm -rf package.json yarn.lock .yarn", { cwd: buildPath });
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

publishPkgNah();

async function cpBasePkgJson() {
	const basePkgData = await fse.readFile(
		path.resolve(root, "./package.json"),
		"utf8",
	);
	const { scripts, devDependencies, exports, ...rest } =
		JSON.parse(basePkgData);

	const newPkgData = {
		...rest,
		file: ["*"],
		sideEffects: false,
		types: "./index.d.ts",
		typings: "./index.d.ts",
		main: "./index.js",
		module: "./index.mjs",
	};

	const destination = path.resolve(buildPath, "./package.json");
	await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), "utf8");
	console.log(`Created package.json in ${destination}`);
}

async function cpBaseFiles(file: string) {
	const sourcePath = path.resolve(root, file);
	const targetPath = path.resolve(buildPath, path.basename(file));
	await fse.copy(sourcePath, targetPath);
	console.log(`Copied ${sourcePath} to ${targetPath}`);
}
