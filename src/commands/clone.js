import { simpleGit } from 'simple-git';
import { mkdirSync } from 'fs';
import { join } from 'path';
import ora from 'ora';
import chalk from 'chalk';
import pLimit from 'p-limit';
import { loadConfig } from '../utils/config.js';
import { filterRepository, getTargetDirectory } from '../utils/filters.js';

export async function cloneCommand(options) {
  try {
    const config = loadConfig(options.config);
    const limit = pLimit(parseInt(options.parallel));
    const spinner = ora('Preparing to clone repositories').start();

    mkdirSync(options.output, { recursive: true });

    const tasks = config.repositories
      .filter(repo => filterRepository(repo, options))
      .map(repo => limit(async () => {
        const targetDir = getTargetDirectory(repo, options.output, config.organization);
        const fullPath = join(options.output, targetDir);
        mkdirSync(fullPath, { recursive: true });
        
        try {
          spinner.text = `Cloning ${repo.url}`;
          await simpleGit().clone(repo.url, fullPath);
          console.log(chalk.green(`✓ Cloned ${repo.url} to ${fullPath}`));
        } catch (error) {
          console.error(chalk.red(`✗ Failed to clone ${repo.url}: ${error.message}`));
        }
      }));

    await Promise.all(tasks);
    spinner.succeed('Finished cloning repositories');
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}