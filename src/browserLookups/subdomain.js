export default {
  name: 'subdomain',

  lookup({ lookupFromSubdomainIndex }) {
    // If given get the subdomain index else 1
    const internalLookupFromSubdomainIndex = typeof lookupFromSubdomainIndex === 'number' ? lookupFromSubdomainIndex + 1 : 1;
    // get all matches if window.location. is existing
    // first item of match is the match itself and the second is the first group match which should be the first subdomain match
    // is the hostname no public domain get the or option of localhost
    const language = typeof window !== 'undefined' && window.location?.hostname?.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);

    // if there is no match (null) return undefined
    if (!language) return undefined;
    // return the given group match
    return language[internalLookupFromSubdomainIndex];
  }
};
