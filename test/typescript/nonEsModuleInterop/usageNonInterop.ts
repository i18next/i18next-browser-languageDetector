import LngDetector, { CustomDetector, DetectorOptions } from 'i18next-browser-languagedetector';
import * as i18next from 'i18next';

/**
 * NOTE: only the imports should differ in these `usage*.ts` files
 */

const options: DetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
};

const customDetector: CustomDetector = {
  name: 'myDetectorsName',

  lookup(options: DetectorOptions) {
    // options -> are passed in options
    return 'en';
  },

  cacheUserLanguage(lng: string, options: DetectorOptions) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage
    // store it
  },
};

const customDetector2: CustomDetector = {
  name: 'myDetectorsName',
  lookup(options: DetectorOptions) {
    return undefined;
  },
};

const lngDetector = new LngDetector(null, options);

lngDetector.init(options);
lngDetector.addDetector(customDetector);

// instance based
i18next.use(lngDetector).init({});

// class based
i18next.use(LngDetector).init({});
