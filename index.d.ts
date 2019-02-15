declare namespace i18nextBrowserLanguageDetector {
  interface DetectorOptions {
    /**
     * order and from where user language should be detected
     */
    order?: Array<"querystring" | "cookie" | "localStorage" | "navigator" | "htmlTag" | string>;

    /**
     * keys or params to lookup language from
     */
    lookupQuerystring?: string;
    lookupCookie?: string;
    lookupLocalStorage?: string;

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
}

export default class i18nextBrowserLanguageDetector {
  constructor(services?: any, options?: i18nextBrowserLanguageDetector.DetectorOptions);
  /**
   * Adds detector.
   */
  addDetector(detector: i18nextBrowserLanguageDetector.CustomDetector): i18nextBrowserLanguageDetector;

  /**
   * Initializes detector.
   */
  init(services?: any, options?: i18nextBrowserLanguageDetector.DetectorOptions): void;

  detect(detectionOrder?: i18nextBrowserLanguageDetector.DetectorOptions): string | undefined;

  cacheUserLanguage(lng: string, caches?: string[]): void;

  type: "languageDetector";
  detectors: { [key: string]: any };
  services: any;
  i18nOptions: any;
}
