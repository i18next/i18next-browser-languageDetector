export default {
  name: 'querystring',

  lookup(options) {
    let found;

    if (typeof window !== 'undefined') {
      let search = window.location.search;
      if (!window.location.search && window.location.hash && window.location.hash.indexOf('?') > -1) {
        search = window.location.hash.substring(window.location.hash.indexOf('?'))
      }
      const query = search.substring(1);
      const params = query.split('&');
      for (let i=0; i<params.length; i++) {
        let pos = params[i].indexOf('=');
        if (pos > 0) {
          let key = params[i].substring(0,pos);
          if (key === options.lookupQuerystring) {
            found = params[i].substring(pos+1);
          }
        }
      }
    }

    return found;
  }
};
