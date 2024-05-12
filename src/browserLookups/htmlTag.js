export default {
  name: 'htmlTag',

  // Deconstruct the options object and extract the htmlTag property
  lookup({ htmlTag }) {
    let found;
    const internalHtmlTag = htmlTag || (typeof document !== 'undefined' ? document.documentElement : null);

    if (internalHtmlTag && typeof internalHtmlTag.getAttribute === 'function') {
      found = internalHtmlTag.getAttribute('lang');
    }

    return found;
  }
};
