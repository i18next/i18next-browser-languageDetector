let hasSessionStorageSupport;
try {
  hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
  const testKey = 'i18next.translate.boo';
  window.sessionStorage.setItem(testKey, 'foo');
  window.sessionStorage.removeItem(testKey);
} catch (e) {
  hasSessionStorageSupport = false;
}

export default {
  name: 'sessionStorage',

  lookup(options) {
    let found;

    if (options.lookupSessionStorage && hasSessionStorageSupport) {
      const lng = window.sessionStorage.getItem(options.lookupSessionStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    if (options.lookupSessionStorage && hasSessionStorageSupport) {
      window.sessionStorage.setItem(options.lookupSessionStorage, lng);
    }
  }
};
