export default {
  name: 'querystring',

  // Deconstruct the options object and extract the lookupQuerystring property
  lookup({ lookupQuerystring }) {
    let found;

    if (typeof window !== 'undefined') {
      let { search } = window.location;
      if (!window.location.search && window.location.hash?.indexOf('?') > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf('?'));
      }
      const query = search.substring(1);
      const params = query.split('&');
      for (let i = 0; i < params.length; i++) {
        const pos = params[i].indexOf('=');
        if (pos > 0) {
          const key = params[i].substring(0, pos);
          if (key === lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }

    return found;
  }
};
