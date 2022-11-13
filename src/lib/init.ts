import fs from 'node:fs';
import path from 'node:path';
import child_process from 'node:child_process';

import { copySync } from 'fs-extra';

type Options = {
  manager?: Manager | string;
  template: string;
};

export const init = async (projectName: string, options: Options) => {
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
      `\n\x1b[31m"${path.basename(
        projectDir
      )}" directory already exists.\x1b[0m\n`
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
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, '\t')
  );

  // install dependencies
  const templateDeps = templateJson.package.dependencies || [];
  const templateDevDeps = templateJson.package.devDependencies || [];

  const combinedDependencies = [...templateDeps];
  const combinedDevDependencies = [...templateDevDeps];

  const dependencies = combinedDependencies.map(({ name }) => name);
  const devDependencies = combinedDevDependencies.map(({ name }) => name);

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
