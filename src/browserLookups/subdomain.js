export default {
  name: 'subdomain',

  lookup({ lookupFromSubdomainIndex }) {
    const index = typeof lookupFromSubdomainIndex === 'number' ? lookupFromSubdomainIndex : 0;
    const hostname = typeof window !== 'undefined' && window.location?.hostname?.split('.').slice(index).join('.');
    // is the hostname no public domain get the or option of localhost
    // the language may carry script (Hans) and region (BR, 419) subtags, so labels like `staging` or
    // `myapp-git-branch-team` (preview deployments) are not taken for a language
    const language = hostname && hostname.match(/^(\w{2,5}(?:-(?:[a-z]{4}|[a-z]{2}|\d{3}))*)\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

    // if there is no match (null) return undefined
    if (!language) return undefined;
    return language[1];
  }
};
