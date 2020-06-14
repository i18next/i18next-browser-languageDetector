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

    if (options.lookupsessionStorage && hasSessionStorageSupport) {
      const lng = window.sessionStorage.getItem(options.lookupsessionStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    if (options.lookupsessionStorage && hasSessionStorageSupport) {
      window.sessionStorage.setItem(options.lookupsessionStorage, lng);
    }
  }
};
