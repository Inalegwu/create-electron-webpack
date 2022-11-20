import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import chalk from 'chalk';
import inquirer, { QuestionCollection } from 'inquirer';

import { init } from './lib/init.mjs';
import { checkUpdate } from './lib/checkUpdate.mjs';

const loadJSON = (path: string) => {
  return JSON.parse(fs.readFileSync(new URL(path, import.meta.url)).toString());
};
const pkgJson = loadJSON('../package.json');

const questions: QuestionCollection = [
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    default() {
      return 'electron-project';
    },
  },
  {
    type: 'list',
    name: 'template',
    message: 'Select a framework:',
    choices: ['vanilla', 'react', 'vue', 'svelte'],
  },
  {
    type: 'list',
    name: 'variant',
    message: 'Select a variant:',
    choices: ['JavaScript', 'TypeScript'],
  },
  {
    type: 'list',
    name: 'manager',
    message: 'Which package manager do you prefer?:',
    choices: ['npm', 'pnpm', 'yarn'],
  },
];

const validateTemplateName = (template: string) => {
  const templates = [
    'vanilla',
    'vanilla-ts',
    'react',
    'react-ts',
    'vue',
    'vue-ts',
    'svelte',
    'svelte-ts',
  ];

  return templates.includes(template);
};

const validateManager = (pkg?: string) => {
  const pkgManager = ['npm', 'pnpm', 'yarn'];
  return pkg ? pkgManager.includes(pkg) : true;
};

const print = (dir: string, manager?: string) => {
  const cmd = manager || 'npm';

  console.log(
    `\nScaffolding project in ${chalk.cyan(
      `${path.resolve(process.cwd(), dir)}`
    )}`
  );
  console.log('\nDone. Now run:');
  console.log(`\n  cd ${dir}`);
  console.log(`  ${cmd === 'npm' ? 'npm run' : cmd} dev\n`);
};

export const cli = async (rawArgs: string[]) => {
  await checkUpdate();

  const slicedArgs = rawArgs.slice(2);
  const argv = yargs(slicedArgs)
    .version(false)
    .usage(
      '\nUsage: electron-starter <project-name> --template <template> [--manager <package manager>]'
    )
    .option('template', {
      type: 'string',
      alias: 't',
      description:
        'vanilla, vanilla-ts, react, react-ts, vue, vue-ts, svelte, svelte-ts',
    })
    .option('manager', {
      type: 'string',
      alias: 'm',
      description: 'npm, pnpm, yarn',
    })
    .option('version', {
      type: 'boolean',
      alias: 'v',
    })
    .help()
    .locale('en')
    .parseSync();

  if (argv.version) {
    console.log(pkgJson.version);
    process.exit(0);
  }

  if (
    !argv.template ||
    !validateTemplateName(argv.template) ||
    !validateManager(argv.manager) ||
    argv._.length === 0
  ) {
    const result = await inquirer.prompt(questions);
    const manager = result.manager;
    const template =
      result.variant === 'JavaScript'
        ? `${result.template}`
        : `${result.template}-ts`;

    init(result.project, { template, manager }).then(() =>
      print(result.project, manager)
    );
  } else {
    init(argv._[0].toString(), {
      template: argv.template,
      manager: argv.manager,
    }).then(() => {
      print(argv._[0].toString(), argv.manager);
    });
  }
};
