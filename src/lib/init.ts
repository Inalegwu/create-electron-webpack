import fs from 'fs-extra';
import path from 'node:path';
import child_process from 'node:child_process';

type Options = {
  manager?: Manager | string;
  template: string;
};

export const init = async (projectName: string, options: Options) => {
  const { manager, template } = options;

  // commands
  const cmd = manager || 'npm';
  const deps = manager === 'yarn' ? 'add' : 'install';
  const devDeps = manager === 'yarn' ? 'add -D' : 'install -D';

  // dir paths
  const projectDir = path.join(process.cwd(), projectName);

  // check if project dir exists
  if (fs.existsSync(projectDir)) {
    console.error(
      `\n\x1b[31m"${path.basename(
        projectDir
      )}" directory already exits.\x1b[0m\n`
    );
    throw new Error(`already exists.`);
  }

  // template
  const templateDir = path.resolve(__dirname, `../../templates/${template}`);
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template "${template}" not found.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const templateJson = require(path.join(templateDir, 'template.json'));

  // init dir
  const initCmd = manager === 'pnpm' ? 'init' : 'init -y';
  fs.mkdirSync(projectDir);
  child_process.execSync(`${cmd} ${initCmd}`, {
    cwd: projectDir,
  });

  // copy files
  fs.copySync(path.join(templateDir, 'files'), projectDir);

  // rename `gitignore` to `.gitignore`.
  const gitignorePath = path.join(projectDir, 'gitignore');
  if (fs.existsSync(gitignorePath)) {
    try {
      fs.renameSync(gitignorePath, path.join(projectDir, '.gitignore'));
    } catch (e) {
      console.warn('Failed to rename gitignore.');
    }
  }

  // run `npm install`
  child_process.execSync(`${cmd} install`, {
    cwd: projectDir,
    stdio: 'inherit',
  });

  // merge package.json
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const packageJson = require(path.join(projectDir, 'package.json'));

  packageJson.main = templateJson.package.main;
  packageJson.scripts = {
    ...(packageJson.scripts || {}),
    ...(templateJson.package.scripts || {}),
  };
  fs.writeJSONSync(path.join(projectDir, 'package.json'), packageJson);

  // install dependencies
  const templateDeps = templateJson.package.dependencies || [];
  const templateDevDeps = templateJson.package.devDependencies || [];

  const combinedDependencies = [...templateDeps];
  const combinedDevDependencies = [...templateDevDeps];

  const dependencies = combinedDependencies.map(({ name }) => name);
  const devDependencies = combinedDevDependencies.map(({ name }) => name);

  if (!template.match(/^vanilla/)) {
    child_process.execSync(`${cmd} ${deps} ${dependencies.join(' ')}`, {
      cwd: projectDir,
      stdio: 'inherit',
    });
  }

  child_process.execSync(`${cmd} ${devDeps} ${devDependencies.join(' ')}`, {
    cwd: projectDir,
    stdio: 'inherit',
  });
};
