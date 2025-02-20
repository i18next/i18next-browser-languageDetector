let hasSessionStorageSupport = null;

const sessionStorageAvailable = () => {
  if (hasSessionStorageSupport !== null) return hasSessionStorageSupport;

  try {
    hasSessionStorageSupport = typeof window !== 'undefined' && window.sessionStorage !== null;
    if (!hasSessionStorageSupport) { return false; }
    const testKey = 'i18next.translate.boo';
    window.sessionStorage.setItem(testKey, 'foo');
    window.sessionStorage.removeItem(testKey);
  } catch (e) {
    hasSessionStorageSupport = false;
  }
  return hasSessionStorageSupport;
};

export default {
  name: 'sessionStorage',

  lookup({ lookupSessionStorage }) {
    if (lookupSessionStorage && sessionStorageAvailable()) {
      return window.sessionStorage.getItem(lookupSessionStorage) || undefined;
    }
    return undefined;
  },

  cacheUserLanguage(lng, { lookupSessionStorage }) {
    if (lookupSessionStorage && sessionStorageAvailable()) {
      window.sessionStorage.setItem(lookupSessionStorage, lng);
    }
  }
};
