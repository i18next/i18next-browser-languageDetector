let hasSessionStorageSupport = null;

const sessionStorageAvailable = () => {
  try {
    hasSessionStorageSupport = window !== 'undefined' && window.sessionStorage !== null;
    const testKey = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
}

const checkSessionStorage = () => {
  if (hasSessionStorageSupport === null) hasSessionStorageSupport = sessionStorageAvailable();
}

export default {
  name: 'sessionStorage',

  lookup(options) {
    let found;
    checkSessionStorage();

    if (options.lookupSessionStorage && hasSessionStorageSupport) {
      const lng = window.sessionStorage.getItem(options.lookupSessionStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    checkSessionStorage();
    
    if (options.lookupSessionStorage && hasSessionStorageSupport) {
      window.sessionStorage.setItem(options.lookupSessionStorage, lng);
    }
  }
};
