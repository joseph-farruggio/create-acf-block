import Conf from "conf";
const config = new Conf();
import readlineSync from "readline-sync";
import chalk from "chalk";
import path from "path";

const args = process.argv.slice(2);
const resetPreferences = args.indexOf("--preferences") === -1 ? false : true;

export default () => {
	/**
	 *  Preferences
	 *  Create block assets?
	 *    -- yes
	 *    Group block assets with render template?
	 *      -- no
	 *      cssPath
	 *      jsPath
	 */
	if (config.get("preferencesSet") != true || resetPreferences === true) {
		// Preferences not yet set or flag is present
		config.clear();

		console.log(chalk.bold.bgGreen.white(` Preferences: \n`));

		config.set(
			"registerationFilePath",
			path.relative(
				"./",
				readlineSync.questionPath(`${chalk.bold("Relative block registration file path:")}\n` + `${chalk.dim('Example: inc/acf-blocks.php"')}\n`, {
					isDirectory: false,
					exists: true,
				})
			)
		);

		config.set(
			"renderTemplateFolderPath",
			path.relative(
				"./",
				readlineSync.questionPath(
					`${chalk.bold("\nRelative block render template folder path: \n")}` +
						`${chalk.dim("This is where your block render templates will be created.\n")}` +
						`${chalk.dim('Example: template-parts/blocks"')}\n`,
					{
						isDirectory: true,
						exists: true,
					}
				)
			)
		);

		// Create block assets?
		if (readlineSync.keyInYN(`${chalk.bold("\nCreate block specific CSS and JS files?")}`)) {
			config.set("createAssets", true);

			// Group block assets with render template?
			if (readlineSync.keyInYN(`${chalk.bold("Group block CSS and JS files with the render template?")}`)) {
				config.set("groupAssets", true);
			} else {
				config.set("groupAssets", false);
				// Set asset paths
				console.log("\n");
				console.log(chalk.bold.bgGreen.white(` Block asset paths:`));
				console.log(chalk.dim(`If the given directory doesn't exist, it will be created.\n`));

				config.set(
					"cssPath",
					readlineSync.questionPath(`${chalk.bold("Block CSS path: ")}`, {
						isDirectory: true,
						exists: null,
						create: true,
					})
				);
				config.set(
					"jsPath",
					readlineSync.questionPath(`${chalk.bold("Block JS path: ")}`, {
						isDirectory: true,
						exists: null,
						create: true,
					})
				);
			}
		}

		config.set("preferencesSet", true);
	}
};
