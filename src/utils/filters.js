export function filterRepository(repo, options) {
  if (options.minStars && repo.stars < parseInt(options.minStars)) {
    return false;
  }
  
  if (options.updatedAfter && new Date(repo.lastUpdated) < new Date(options.updatedAfter)) {
    return false;
  }
  
  if (options.topic && !repo.topics?.includes(options.topic)) {
    return false;
  }
  
  return true;
}

export function getTargetDirectory(repo, baseDir, orgRules) {
  const parts = [];
  
  if (orgRules?.groupBy === 'source' && repo.source) {
    parts.push(repo.source);
  } else if (orgRules?.groupBy === 'owner' && repo.owner) {
    parts.push(repo.owner);
  } else if (orgRules?.customRules) {
    const rule = orgRules.customRules.find(r => 
      new RegExp(r.pattern).test(repo.name)
    );
    if (rule) {
      parts.push(rule.directory);
    }
  }
  
  parts.push(repo.name);
  
  return parts.join('/');
}