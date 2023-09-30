import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import child_process from "node:child_process";

import { username } from "username";
import chalk from "chalk";
import pkg from "fs-extra";
const { copySync } = pkg;

type Options = {
  manager?: string;
  template: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const init = async (projectName: string, options: Options) => {
  const { manager, template } = options;

  // commands
  const cmd = manager || "npm";

  // create project dir
  const projectDir = path.join(process.cwd(), projectName);

  // check if project dir exists
  if (fs.existsSync(projectDir)) {
    console.error(
      `\n${chalk.red(
        `"${path.basename(projectDir)}" directory already exists.`,
      )}`,
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
    fs.readFileSync(path.join(templateDir, "template.json"), "utf8"),
  );

  // copy files
  copySync(path.join(templateDir, "files"), projectDir);

  // copy `yarnrc.yml` to `${projectDir}/.yarnrc.yml`
  if (manager === "yarn") {
    copySync(
      path.join(templateDir, "yarnrc.yml"),
      path.join(projectDir, ".yarnrc.yml"),
    );
  }

  // rename `gitignore` to `.gitignore`.
  const gitignorePath = path.join(projectDir, "gitignore");
  if (fs.existsSync(gitignorePath)) {
    try {
      fs.renameSync(gitignorePath, path.join(projectDir, ".gitignore"));
    } catch (e) {
      console.warn("Failed to rename gitignore.");
    }
  }

  // create 'package.json' for the project
  const packageJson = {
    name: projectName,
    description: projectName,
    version: "0.1.0",
    license: "MIT",
    author: {
      name: await username(),
    },
    repository: {
      url: `https://github.com/${await username()}/${projectName}.git`,
    },
    main: templateJson.package.main,
    scripts: { ...templateJson.package.scripts },
    electronmon: templateJson.package.electronmon,
  };

  fs.writeFileSync(
    path.join(projectDir, "package.json"),
    JSON.stringify(packageJson, null, "\t"),
  );

  // install dependencies
  const templateDeps = templateJson.package.dependencies || [];
  const templateDevDeps = templateJson.package.devDependencies || [];

  const dependencies = [...templateDeps].map(({ name }) => name);
  const devDependencies = [...templateDevDeps].map(({ name }) => name);

  if (!template.includes("vanilla")) {
    child_process.execSync(`${cmd} add ${dependencies.join(" ")}`, {
      cwd: projectDir,
      stdio: "inherit",
    });
  }

  child_process.execSync(`${cmd} add -D ${devDependencies.join(" ")}`, {
    cwd: projectDir,
    stdio: "inherit",
  });
};
