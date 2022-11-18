import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import child_process from 'node:child_process';

import chalk from 'chalk';
import pkg from 'fs-extra';
const { copySync } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const init = async (projectName, options) => {
  const { manager, template } = options;

  // commands
  const cmd = manager || 'npm';
  const depsCmd = manager === 'yarn' ? 'add' : 'install';
  const devDepsCmd = manager === 'yarn' ? 'add -D' : 'install -D';

  // create project dir
  const projectDir = path.join(process.cwd(), projectName);

  // check if project dir exists
  if (fs.existsSync(projectDir)) {
    console.error(
      `\n${chalk.red(
        `"${path.basename(projectDir)}" directory already exists.`
      )}`
    );
    throw new Error(`already exists.`);
  } else {
    fs.mkdirSync(projectDir);
  }

  // template
  const templateDir = path.resolve(__dirname, `../../templates/${template}`);
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template "${template}" not found.`);
  }
  const templateJson = JSON.parse(
    fs.readFileSync(path.join(templateDir, 'template.json'), 'utf8')
  );

  // copy files
  copySync(path.join(templateDir, 'files'), projectDir);

  // rename `gitignore` to `.gitignore`.
  const gitignorePath = path.join(projectDir, 'gitignore');
  if (fs.existsSync(gitignorePath)) {
    try {
      fs.renameSync(gitignorePath, path.join(projectDir, '.gitignore'));
    } catch (e) {
      console.warn('Failed to rename gitignore.');
    }
  }

  // create 'package.json' for the project
  const packageJson = {
    name: projectName,
    description: '',
    version: '1.0.0',
    author: '',
    license: 'MIT',
    main: templateJson.package.main,
    scripts: { ...templateJson.package.scripts },
    electronmon: templateJson.package.electronmon,
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, '\t')
  );

  // install dependencies
  const templateDeps = templateJson.package.dependencies || [];
  const templateDevDeps = templateJson.package.devDependencies || [];

  const dependencies = [...templateDeps].map(({ name }) => name);
  const devDependencies = [...templateDevDeps].map(({ name }) => name);

  if (!template.match(/^vanilla/)) {
    child_process.execSync(`${cmd} ${depsCmd} ${dependencies.join(' ')}`, {
      cwd: projectDir,
      stdio: 'inherit',
    });
  }

  child_process.execSync(`${cmd} ${devDepsCmd} ${devDependencies.join(' ')}`, {
    cwd: projectDir,
    stdio: 'inherit',
  });
};
