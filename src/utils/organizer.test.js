import { test } from 'node:test';
import assert from 'node:assert';
import { organizeRepo } from './organizer.js';

test('organizeRepo organizes JavaScript repositories correctly', async (t) => {
  const repo = {
    name: 'test-repo',
    owner: { login: 'test-owner' },
    language: 'JavaScript'
  };
  
  const rules = [{
    pattern: 'language === "javascript"',
    path: 'javascript/{owner}/{name}'
  }];
  
  const result = organizeRepo(repo, rules);
  assert.equal(result, 'javascript/test-owner/test-repo');
});