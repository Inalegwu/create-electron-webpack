import boxen from "boxen";
import chalk from "chalk";
import semver from "semver";
import pkgJson from "package-json";

import { loadJSON } from "./loadJSON.mjs";

const { name, version } = loadJSON("../../package.json");

export const checkUpdate = async () => {
  const { version: latestVersion } = await pkgJson(name);

  const updateAvailable = semver.lt(version, latestVersion as string);

  if (updateAvailable) {
    const msg = {
      updateAvailable: `Update available! ${chalk.dim(version)} → ${chalk.green(
        latestVersion
      )}`,
      runUpdate: `Run ${chalk.cyan("npx clear-npx-cache")} to update.`,
    };

    console.log(
      boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: "center",
      })
    );
  }
};
