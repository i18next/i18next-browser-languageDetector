let hasLocalStorageSupport = null;

const localStorageAvailable = () => {
  try {
    hasLocalStorageSupport = window !== 'undefined' && window.localStorage !== null;
    const testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
}

const checkLocalStorage = () => {
  if (hasLocalStorageSupport === null) hasLocalStorageSupport = localStorageAvailable();
}

export default {
  name: 'localStorage',

  lookup(options) {
    let found;
    checkLocalStorage();

    if (options.lookupLocalStorage && hasLocalStorageSupport) {
      const lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    checkLocalStorage();

    if (options.lookupLocalStorage && hasLocalStorageSupport) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};
