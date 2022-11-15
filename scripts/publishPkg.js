const path = require("path");
const { promisify } = require("util");
const fse = require("fs-extra");
const { exec } = require("child_process");

const execSync = promisify(exec);

const root = process.cwd();
const buildPath = path.join(root, "./dist");

publishPkg();

async function publishPkg() {
	try {
		await cpBasePkgJson();
		await fse.writeFile(`${buildPath}/yarn.lock`, "");
		await execSync("yarn", { cwd: buildPath });
		await execSync("rm -rf .yarn && rm -rf node_modules", { cwd: buildPath });
		await execSync("yarn npm publish --tolerate-republish", { cwd: buildPath });
		// Need to remove after build to guarantee the unique package.json in each package
		await execSync("rm -rf package.json", { cwd: buildPath });
		console.log("Published successfully!");
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
}

async function cpBasePkgJson() {
	const basePkgData = await fse.readFile(path.resolve(root, "./package.json"), "utf8");
	const { scripts, devDependencies, exports, ...rest } = JSON.parse(basePkgData);

	const newPkgData = {
		...rest,
		files: ["*"],
		types: "index.d.ts",
		main: "index.js",
		module: "index.mjs",
	};

	const destination = path.resolve(buildPath, "./package.json");
	await fse.writeFile(destination, JSON.stringify(newPkgData, null, 2), "utf8");
	console.log(`Generated package.json in ${destination}`);
}
