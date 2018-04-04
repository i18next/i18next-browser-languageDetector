export default {
  name: 'url',

  lookup(options) {
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (typeof options.lookupFromUrlIndex === 'number') {
        found = language[options.lookupFromUrlIndex].replace('/', '');
      } else {
        found = language[0].replace('/', '');
      }
    }
    return found;
  }
};
