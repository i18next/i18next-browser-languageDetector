let hasLocalStorageSupport = null;

const localStorageAvailable = () => {
  if (hasLocalStorageSupport !== null) return hasLocalStorageSupport;

  try {
    hasLocalStorageSupport = typeof window !== 'undefined' && window.localStorage !== null;
    if (!hasLocalStorageSupport) { return false; }
    const testKey = 'i18next.translate.boo';
    window.localStorage.setItem(testKey, 'foo');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    hasLocalStorageSupport = false;
  }
  return hasLocalStorageSupport;
};

export default {
  name: 'localStorage',

  // Deconstruct the options object and extract the lookupLocalStorage property
  lookup({ lookupLocalStorage }) {
    if (lookupLocalStorage && localStorageAvailable()) {
      return window.localStorage.getItem(lookupLocalStorage) || undefined; // Undefined ensures type consistency with the previous version of this function
    }
    return undefined;
  },

  // Deconstruct the options object and extract the lookupLocalStorage property
  cacheUserLanguage(lng, { lookupLocalStorage }) {
    if (lookupLocalStorage && localStorageAvailable()) {
      window.localStorage.setItem(lookupLocalStorage, lng);
    }
  }
};
