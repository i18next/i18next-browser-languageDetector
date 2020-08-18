let hasLocalStorageSupport = null;

const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;

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

export default {
  name: 'localStorage',

  lookup(options) {
    let found;

    if (options.lookupLocalStorage && localStorageAvailable()) {
      const lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};
