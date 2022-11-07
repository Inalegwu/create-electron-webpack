import path from 'path';
import yargs from 'yargs';
import inquirer, { QuestionCollection } from 'inquirer';

import { init } from './lib/init';

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

  return templates.includes(template) ? true : false;
};

const print = (dir: string, manager?: Manager) => {
  const cmd = manager || 'npm';

  console.log(
    `\nScaffolding project in \x1b[36m${path.resolve(
      process.cwd(),
      dir
    )}\x1b[0m...`
  );
  console.log('\nDone. Now run:');
  console.log(`\n  cd ${dir}`);
  console.log(`  ${cmd === 'yarn' ? 'yarn' : `${cmd} run`} dev\n`);
};

export const cli = async (rawArgs: string[]) => {
  const slicedArgs = rawArgs.slice(2);

  const argv = yargs(slicedArgs)
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
    .help()
    .locale('en')
    .parseSync();

  if (
    !argv.template ||
    !validateTemplateName(argv.template) ||
    argv._.length === 0
  ) {
    const result = await inquirer.prompt(questions);
    const manager = result.manager || 'npm';
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
      manager: argv.manager || 'npm',
    }).then(() => print(argv._[0].toString(), argv.manager));
  }
};
