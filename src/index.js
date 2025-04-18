import * as utils from './utils.js';
import cookie from './browserLookups/cookie.js';
import querystring from './browserLookups/querystring.js';
import localStorage from './browserLookups/localStorage.js';
import sessionStorage from './browserLookups/sessionStorage.js';
import navigator from './browserLookups/navigator.js';
import htmlTag from './browserLookups/htmlTag.js';
import path from './browserLookups/path.js';
import subdomain from './browserLookups/subdomain.js';

// some environments, throws when accessing document.cookie
let canCookies = false;
try {
  // eslint-disable-next-line no-unused-expressions
  document.cookie;
  canCookies = true;
// eslint-disable-next-line no-empty
} catch (e) {}
const order = ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'];
if (!canCookies) order.splice(1, 1);
const getDefaults = () => ({
  order,
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',

  // cache user language
  caches: ['localStorage'],
  excludeCacheFor: ['cimode'],
  // cookieMinutes: 10,
  // cookieDomain: 'myDomain'

  convertDetectedLanguage: (l) => l
});

class Browser {
  constructor(services, options = {}) {
    this.type = 'languageDetector';
    this.detectors = {};

    this.init(services, options);
  }

  init(services = { languageUtils: {} }, options = {}, i18nOptions = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
    if (typeof this.options.convertDetectedLanguage === 'string' && this.options.convertDetectedLanguage.indexOf('15897') > -1) {
      this.options.convertDetectedLanguage = (l) => l.replace('-', '_');
    }

    // backwards compatibility
    if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;

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
    return this;
  }

  detect(detectionOrder = this.options.order) {
    let detected = [];
    detectionOrder.forEach((detectorName) => {
      if (this.detectors[detectorName]) {
        let lookup = this.detectors[detectorName].lookup(this.options);
        if (lookup && typeof lookup === 'string') lookup = [lookup];
        if (lookup) detected = detected.concat(lookup);
      }
    });

    detected = detected
      .filter((d) => d !== undefined && d !== null && !utils.hasXSS(d))
      .map((d) => this.options.convertDetectedLanguage(d));

    if (this.services && this.services.languageUtils && this.services.languageUtils.getBestMatchFromCodes) return detected; // new i18next v19.5.0
    return detected.length > 0 ? detected[0] : null; // a little backward compatibility
  }

  cacheUserLanguage(lng, caches = this.options.caches) {
    if (!caches) return;
    if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
    caches.forEach((cacheName) => {
      if (this.detectors[cacheName]) this.detectors[cacheName].cacheUserLanguage(lng, this.options);
    });
  }
}

Browser.type = 'languageDetector';

export default Browser;
