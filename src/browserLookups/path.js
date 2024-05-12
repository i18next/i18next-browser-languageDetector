export default {
  name: 'path',

  // Deconstruct the options object and extract the lookupFromPathIndex property
  lookup({ lookupFromPathIndex }) {

    if (typeof window === 'undefined') return undefined;

    const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
    if (!Array.isArray(language)) return undefined;

    const index = typeof lookupFromPathIndex === 'number' ? lookupFromPathIndex : 0;
    return language[index]?.replace('/', '');
  }
};
