import * as i18next from 'i18next';

interface DetectorOptions {
  /**
   * only detect languages that are in the whitelist
   * @default true
   */
  checkWhitelist?: boolean;

  /**
   * fallback to a similar whitelist language
   * Example 1: Browser language is 'es'
   * if 'es' is not found in whitelist, first fallback to any whitelist language that starts with 'es-', then fallback to fallbackLng ('es' -> 'es-*' -> fallbackLng)
   * Example 2: Browser language is 'es-MX'
   * if 'es-MX' is not found in whitelist, first fallback to 'es', then fallback to 'es-*', then fallback to fallbackLng ('es-MX' -> 'es' -> 'es-*' -> fallbackLng)
   * @default false
   */
  checkForSimilarInWhitelist?: boolean;

  /**
   * order and from where user language should be detected
   */
  order?: Array<
    'querystring' | 'cookie' | 'sessionStorage' | 'localStorage' | 'navigator' | 'htmlTag' | string
  >;

  /**
   * keys or params to lookup language from
   */
  lookupQuerystring?: string;
  lookupCookie?: string;
  lookupLocalStorage?: string;
  lookupFromPathIndex?: number;
  lookupFromSubdomainIndex?: number;

  /**
   * cache user language on
   */
  caches?: string[];

  /**
   * languages to not persist (cookie, localStorage)
   */
  excludeCacheFor?: string[];

  /**
   * optional expire and domain for set cookie
   * @default 10
   */
  cookieMinutes?: number;
  cookieDomain?: string;

  /**
   * optional htmlTag with lang attribute
   * @default document.documentElement
   */
  htmlTag?: HTMLElement | null;
}

interface CustomDetector {
  name: string;
  cacheUserLanguage?(lng: string, options: DetectorOptions): void;
  lookup(options: DetectorOptions): string | undefined;
}

export default class I18nextBrowserLanguageDetector implements i18next.LanguageDetectorModule {
  constructor(services?: any, options?: DetectorOptions);
  /**
   * Adds detector.
   */
  addDetector(detector: CustomDetector): I18nextBrowserLanguageDetector;

  /**
   * Initializes detector.
   */
  init(services?: any, options?: DetectorOptions): void;

  detect(detectionOrder?: DetectorOptions['order']): string | undefined;

  cacheUserLanguage(lng: string, caches?: string[]): void;

  type: 'languageDetector';
  detectors: { [key: string]: any };
  services: any;
  i18nOptions: any;
}
