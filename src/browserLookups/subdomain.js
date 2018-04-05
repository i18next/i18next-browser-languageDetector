export default {
  name: 'subdomain',

  lookup() {
    let found;
    if (typeof window !== 'undefined') {
      const language = window.location.pathname.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);
      if (language instanceof Array) {
        if (typeof options.lookupFromUrlIndex === 'number') {
          found = language[options.lookupFromUrlIndex].replace('http://', '').replace('https://', '').replace('.', '');
        } else {
          found = language[0].replace('http://', '').replace('https://', '').replace('.', '');
        }
      }
    }
    return found;
  }
};
