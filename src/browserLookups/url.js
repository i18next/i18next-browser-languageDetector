export default {
  name: 'url',

  lookup() {
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/);
      found = language[1];
    }
    return found;
  }
};
