const fs = require('fs-extra');

const path = require('node:path');
const child_process = require('node:child_process');

const init = async (projectName, template) => {
  // dir paths
  const projectDir = path.join(process.cwd(), projectName);
  const projectAssetsDir = path.join(projectDir, 'assets');

  // check if project dir exists
  if (fs.existsSync(projectName)) {
    throw new Error(`"${projectName}" directory already exists.`);
  }

  // assets
  const assetsDir = path.join(__dirname, '..', 'assets');

  // template
  const templateDir = path.join(__dirname, '..', 'templates', `${template}`);
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template "${template}" not found.`);
  }

  const templateJson = require(path.join(templateDir, 'template.json'));

  // init dir
  fs.mkdirSync(projectDir);
  child_process.execSync(`npm init -y`, {
    cwd: projectDir,
  });

  // copy files
  fs.copySync(path.join(templateDir, 'files'), projectDir);
  fs.copySync(assetsDir, projectAssetsDir);

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
  child_process.execSync(`npm install`, {
    cwd: projectDir,
    stdio: 'inherit',
  });

  // merge package.json
  const packageJson = require(path.join(projectDir, 'package.json'));

  packageJson.main = templateJson.package.main;
  packageJson.scripts = {
    ...(packageJson.scripts || {}),
    ...(templateJson.package?.scripts || {}),
  };
  fs.writeJSONSync(path.join(projectDir, 'package.json'), packageJson);

  // install dependencies
  const templateDeps = templateJson.package?.dependencies || [];
  const templateDevDeps = templateJson.package?.devDependencies || [];

  const combinedDependencies = [...templateDeps];
  const combinedDevDependencies = [...templateDevDeps];

  const dependencies = combinedDependencies.map(({ name }) => name);
  const devDependencies = combinedDevDependencies.map(({ name }) => name);

  child_process.execSync(`npm install ${dependencies.join(' ')}`, {
    cwd: projectDir,
    stdio: 'inherit',
  });

  child_process.execSync(`npm install -D ${devDependencies.join(' ')}`, {
    cwd: projectDir,
    stdio: 'inherit',
  });
};

exports.init = init;
