let storage = {
  setItem: function(key, value) {
    if (window.localStorage) {
      try {
        window.localStorage.setItem(key, value);
      } catch (e) {
        //f.log('failed to set value for key '' + key + '' to localStorage.');
      }
    }
  },
  getItem: function(key, value) {
    if (window.localStorage) {
      try {
        return window.localStorage.getItem(key, value);
      } catch (e) {
        //f.log('failed to get value for key '' + key + '' from localStorage.');
        return undefined;
      }
    }
  }
};

export default {
  name: 'localStorage',

  lookup(options) {
    let found;

    if (options.lookupLocalStorage && typeof window !== 'undefined' && window.localStorage) {
      var lng = storage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }

    return found;
  },

  cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && typeof window !== 'undefined' && window.localStorage) {
      storage.setItem(options.lookupLocalStorage, lng);
    }
  }
};
