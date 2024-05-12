export default {
  name: 'navigator',

  lookup(options) {
    const found = [];

    if (typeof navigator !== 'undefined') {
      const { languages, userLanguage, language } = navigator;
      if (languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i = 0; i < languages.length; i++) {
          found.push(languages[i]);
        }
      }
      if (userLanguage) {
        found.push(userLanguage);
      }
      if (language) {
        found.push(language);
      }
    }

    return found.length > 0 ? found : undefined;
  }
};
