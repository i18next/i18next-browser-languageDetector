export default {
  name: 'hash',

  // Deconstruct the options object and extract the lookupHash property and the lookupFromHashIndex property
  lookup({ lookupHash, lookupFromHashIndex }) {
    let found;

    if (typeof window !== 'undefined') {
      const { hash } = window.location;
      if (hash && hash.length > 2) {
        const query = hash.substring(1);
        if (lookupHash) {
          const params = query.split('&');
          for (let i = 0; i < params.length; i++) {
            const pos = params[i].indexOf('=');
            if (pos > 0) {
              const key = params[i].substring(0, pos);
              if (key === lookupHash) {
                found = params[i].substring(pos + 1);
              }
            }
          }
        }

        if (found) return found;

        if (!found && lookupFromHashIndex > -1) {
          const language = hash.match(/\/([a-zA-Z-]*)/g);
          if (!Array.isArray(language)) return undefined;
          const index = typeof lookupFromHashIndex === 'number' ? lookupFromHashIndex : 0;
          return language[index]?.replace('/', '');
        }
      }
    }

    return found;
  }
};
