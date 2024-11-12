import Conf from 'conf';
import inquirer from 'inquirer';
import chalk from 'chalk';

const config = new Conf({
  projectName: 'repo-manager',
  defaults: {
    githubToken: '',
    gitlabToken: '',
    bitbucketUsername: '',
    bitbucketPassword: ''
  }
});

export async function configureCommand() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Which provider would you like to configure?',
      choices: ['GitHub', 'GitLab', 'Bitbucket']
    },
    {
      type: 'input',
      name: 'githubToken',
      message: 'Enter your GitHub personal access token:',
      when: (answers) => answers.provider === 'GitHub' && !config.get('githubToken')
    },
    {
      type: 'input',
      name: 'gitlabToken',
      message: 'Enter your GitLab personal access token:',
      when: (answers) => answers.provider === 'GitLab' && !config.get('gitlabToken')
    },
    {
      type: 'input',
      name: 'bitbucketUsername',
      message: 'Enter your Bitbucket username:',
      when: (answers) => answers.provider === 'Bitbucket' && !config.get('bitbucketUsername')
    },
    {
      type: 'password',
      name: 'bitbucketPassword',
      message: 'Enter your Bitbucket app password:',
      when: (answers) => answers.provider === 'Bitbucket' && !config.get('bitbucketPassword')
    }
  ]);

  Object.entries(answers).forEach(([key, value]) => {
    if (value) {
      config.set(key, value);
    }
  });

  console.log(chalk.green('Configuration saved successfully!'));
  console.log(chalk.blue('\nExample commands:'));
  console.log(chalk.gray('  npm start clone --config repo-config.yml'));
  console.log(chalk.gray('  npm start clone --parallel 5 --min-stars 100'));
  console.log(chalk.gray('  npm start clone --topic javascript --updated-after 2023-01-01'));
}