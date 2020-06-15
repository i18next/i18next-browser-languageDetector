import * as utils from './utils.js';
import cookie from './browserLookups/cookie.js';
import querystring from './browserLookups/querystring.js';
import localStorage from './browserLookups/localStorage.js';
import sessionStorage from './browserLookups/sessionStorage.js';
import navigator from './browserLookups/navigator.js';
import htmlTag from './browserLookups/htmlTag.js';
import path from './browserLookups/path.js';
import subdomain from './browserLookups/subdomain.js';

function getDefaults() {
  return {
    order: ['querystring', 'cookie', 'sessionStorage','localStorage', 'navigator', 'htmlTag'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',

    // cache user language
    caches: ['localStorage'],
    excludeCacheFor: ['cimode'],
    //cookieMinutes: 10,
    //cookieDomain: 'myDomain'
    checkWhitelist: true,
    checkForSimilarInWhitelist: false,
  };
}

class Browser {
  constructor(services, options = {}) {
    this.type = 'languageDetector';
    this.detectors = {};

    this.init(services, options);
  }

  init(services, options = {}, i18nOptions = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());

    // if checking for similar, user needs to check whitelist
    if (this.options.checkForSimilarInWhitelist) this.options.checkWhitelist = true;

    // backwards compatibility
    if (this.options.lookupFromUrlIndex)
      this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;

    this.i18nOptions = i18nOptions;

    this.addDetector(cookie);
    this.addDetector(querystring);
    this.addDetector(localStorage);
    this.addDetector(sessionStorage);
    this.addDetector(navigator);
    this.addDetector(htmlTag);
    this.addDetector(path);
    this.addDetector(subdomain);
  }

  addDetector(detector) {
    this.detectors[detector.name] = detector;
  }

  detect(detectionOrder) {
    if (!detectionOrder) detectionOrder = this.options.order;

    let detected = [];
    detectionOrder.forEach(detectorName => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === 'string') lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });

    let found;
    detected.forEach(lng => {
      if (found) return;
      let cleanedLng = this.services.languageUtils.formatLanguageCode(lng);
      if (!this.options.checkWhitelist || this.services.languageUtils.isWhitelisted(cleanedLng))
        found = cleanedLng;

      if (!found && this.options.checkForSimilarInWhitelist) {
        found = this.getSimilarInWhitelist(cleanedLng);
      }
    });

    if (!found) {
      let fallbacks = this.i18nOptions.fallbackLng;
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (!fallbacks) fallbacks = [];

      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') {
        found = fallbacks[0];
      } else {
        found = fallbacks[0] || (fallbacks.default && fallbacks.default[0]);
      }
    }

    return found;
  }

  cacheUserLanguage(lng, caches) {
    if (!caches) caches = this.options.caches;
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach(cacheName => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }

  getSimilarInWhitelist(cleanedLng) {
    if (!this.i18nOptions.whitelist) return;

    if (cleanedLng.includes('-')) {
      // i.e. es-MX should check if es is in whitelist
      const prefix = cleanedLng.split('-')[0];

      const cleanedPrefix = this.services.languageUtils.formatLanguageCode(prefix);

      if (this.services.languageUtils.isWhitelisted(cleanedPrefix)) return cleanedPrefix;

      // if reached here, nothing found. continue to search for similar using only prefix
      cleanedLng = cleanedPrefix;
    }

    // i.e. 'pt' should return 'pt-BR'. If multiple in whitelist with 'pt-', then use first one in whitelist
    const similar = this.i18nOptions.whitelist.find(whitelistLng => {
      const cleanedWhitelistLng = this.services.languageUtils.formatLanguageCode(whitelistLng);
      if (cleanedWhitelistLng.startsWith(cleanedLng)) return cleanedWhitelistLng;
    });

    if (similar) return similar;
  }
}

Browser.type = 'languageDetector';

export default Browser;
