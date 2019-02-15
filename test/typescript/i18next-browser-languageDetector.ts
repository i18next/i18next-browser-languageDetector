import LngDetector, { I18nextBrowserLanguageDetector } from "i18next-browser-languagedetector";

const options: I18nextBrowserLanguageDetector.DetectorOptions = {
  // order and from where user language should be detected
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "myDomain",

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement
};

const customDetector: I18nextBrowserLanguageDetector.CustomDetector = {
  name: "myDetectorsName",

  lookup(options: I18nextBrowserLanguageDetector.DetectorOptions) {
    // options -> are passed in options
    return "en";
  },

  cacheUserLanguage(lng: string, options: I18nextBrowserLanguageDetector.DetectorOptions) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};

const customDetector2: I18nextBrowserLanguageDetector.CustomDetector = {
  name: "myDetectorsName",
  lookup(options: I18nextBrowserLanguageDetector.DetectorOptions) {
    return undefined;
  }
};

const lngDetector = new LngDetector(null, options);

lngDetector.init(options);
lngDetector.addDetector(customDetector);
