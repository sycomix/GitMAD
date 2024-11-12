import { readFileSync } from 'fs';
import { parse } from 'yaml';
import chalk from 'chalk';

export function loadConfig(configPath) {
  try {
    const fileContents = readFileSync(configPath, 'utf8');
    const config = parse(fileContents);
    
    validateConfig(config);
    return config;
  } catch (error) {
    throw new Error(`Failed to load config: ${error.message}`);
  }
}

function validateConfig(config) {
  if (!config.repositories || !Array.isArray(config.repositories)) {
    throw new Error('Config must contain a repositories array');
  }

  config.repositories.forEach((repo, index) => {
    if (!repo.url) {
      throw new Error(`Repository at index ${index} must have a url`);
    }
  });
}