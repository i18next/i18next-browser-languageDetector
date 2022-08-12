export default {
  name: 'subdomain',

  lookup(options) {
    // If the user wants a specific subdomain index within the domain
    // Otherwise the index 0 is set as given
    const lookupFromSubdomainIndex = typeof options.lookupFromSubdomainIndex === 'number' ? options.lookupFromSubdomainIndex : 0;
    // Try to reach the domain from the browser location object  -> property hostname
    // split the domain to an array on the dot separator
    const language = typeof window !== 'undefined' && window.location && window.location.hostname && window.location.hostname.split('.');
    // if there is no dot return undefined
    if (!language || language.length === 1) return undefined;
    // return the given index match
    return language[lookupFromSubdomainIndex];
  }
};
