import boxen from 'boxen';
import chalk from 'chalk';
import semver from 'semver';
import pkgJson from 'package-json';

import { name, version } from '../../package.json';

export const checkUpdate = async () => {
  const { version: latestVersion } = await pkgJson(name);

  const updateAvailable = semver.lt(version, latestVersion as string);

  if (updateAvailable) {
    const msg = {
      updateAvailable: `update available ${chalk.dim(version)} → ${chalk.green(
        latestVersion
      )}`,
      runUpdate: `Run ${chalk.cyan(`npm i -g ${name}`)} to update`,
    };

    console.log(
      boxen(`${msg.updateAvailable}\n${msg.runUpdate}`, {
        margin: 1,
        padding: 1,
        align: 'center',
      })
    );
  }
};
