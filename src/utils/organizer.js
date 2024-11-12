export function organizeRepo(repo, rules) {
  const rule = rules.find(r => evaluatePattern(r.pattern, repo)) || rules[0];
  
  return formatPath(rule.path, repo);
}

function evaluatePattern(pattern, repo) {
  // Simple pattern evaluation - could be enhanced with actual expression parsing
  const context = {
    language: repo.language?.toLowerCase(),
    stars: repo.stargazers_count,
    topics: repo.topics || []
  };
  
  try {
    return Function(...Object.keys(context), `return ${pattern}`)(...Object.values(context));
  } catch {
    return false;
  }
}

function formatPath(template, repo) {
  return template
    .replace('{owner}', repo.owner?.login || repo.namespace?.path || 'unknown')
    .replace('{name}', repo.name)
    .replace('{language}', repo.language?.toLowerCase() || 'other');
}