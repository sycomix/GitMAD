#!/usr/bin/env node
import { program } from 'commander';
import { cloneCommand } from './commands/clone.js';
import { configureCommand } from './commands/configure.js';

program
  .name('repo-manager')
  .description('Bulk repository management tool')
  .version('1.0.0');

program
  .command('clone')
  .description('Clone repositories based on configuration')
  .option('-c, --config <path>', 'path to config file', 'repo-config.yml')
  .option('-p, --parallel <number>', 'number of parallel clones', '3')
  .option('-o, --output <dir>', 'output directory', 'repositories')
  .option('--min-stars <number>', 'minimum stars filter')
  .option('--updated-after <date>', 'filter repos updated after date (YYYY-MM-DD)')
  .option('--topic <topic>', 'filter repos by topic')
  .action(cloneCommand);

program
  .command('configure')
  .description('Configure repository sources and organization rules')
  .action(configureCommand);

program.parse();