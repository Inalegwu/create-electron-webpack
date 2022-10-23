#!/usr/bin/env node

import inquirer, {
  InputQuestionOptions,
  ListQuestionOptions,
  QuestionCollection,
} from 'inquirer';
import { init } from '../lib/init';

const projectInput: InputQuestionOptions = {
  type: 'input',
  name: 'project',
  message: 'Project name:',
  default() {
    return 'electron-project';
  },
};

const templateList: ListQuestionOptions = {
  type: 'list',
  name: 'template',
  message: 'Select a framework:',
  choices: ['vanilla', 'react', 'vue', 'svelte'],
};

const variantList: ListQuestionOptions = {
  type: 'list',
  name: 'variant',
  message: 'Select a variant:',
  choices: ['JavaScript', 'TypeScript'],
};

const cmdList: ListQuestionOptions = {
  type: 'list',
  name: 'yarn',
  message: 'Which package manager do you prefer?:',
  choices: ['npm', 'yarn'],
};

const questions: QuestionCollection = [
  projectInput,
  templateList,
  variantList,
  cmdList,
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

const parseArgs = async (rawArgs: string[]) => {
  const slicedArgs = rawArgs.slice(2);

  const argv = require('yargs')(slicedArgs)
    .usage(
      '\nUsage: electron-starter <project-name> --template <template> [--yarn]'
    )
    .option('template', {
      type: 'string',
      alias: 't',
      description:
        'vanilla, vanilla-ts, react, react-ts, vue, vue-ts, svelte, svelte-ts',
    })
    .option('yarn', {
      type: 'boolean',
      alias: 'y',
      description: 'Set this option if you prefer yarn',
    })
    .help()
    .locale('en').argv;

  if (!validateTemplateName(argv.template) || argv._.length === 0) {
    const result = await inquirer.prompt(questions);
    const yarn = result.yarn === 'yarn';
    const template =
      result.variant === 'JavaScript'
        ? `${result.template}`
        : `${result.template}-ts`;

    return [result.project, { template, yarn }];
  } else {
    return [argv._[0], { template: argv.template, yarn: argv.yarn }];
  }
};

(async () => {
  const args = await parseArgs(process.argv);
  await init(args[0], { template: args[1].template, yarn: args[1].yarn });
})();
