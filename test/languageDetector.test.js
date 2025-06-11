const expect = require('expect.js');
const i18next = require('i18next');
const LanguageDetector = require('../dist/cjs/i18nextBrowserLanguageDetector.js');

i18next.init();

describe('language detector', () => {
  const ld = new LanguageDetector(i18next.services, {
    order: [
      'subdomain',
      'querystring',
      'path',
      'cookie',
      'sessionStorage',
      'localStorage',
      'navigator',
      'htmlTag'
    ]
  });

  describe('cookie', () => {
    it('detect', () => {
      global.document = {
        cookie: 'i18next=de'
      };
      const lng = ld.detect();
      expect(lng).to.contain('de');
    });

    it('cacheUserLanguage', () => {
      global.document = {
        cookie: 'my=cookie'
      };
      ld.cacheUserLanguage('it', ['cookie']);
      expect(global.document.cookie).to.match(/i18next=it/);
      expect(global.document.cookie).to.match(/Path=\//);
      // expect(global.document.cookie).to.match(/my=cookie/)
    });
  });

  describe('path', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          search: ''
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('fr');
    });
  });

  describe('querystring', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          search: '?lng=de'
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('de');
    });
  });

  describe('querystring (fragment)', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          hash: '#/something?lng=de',
          search: ''
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('de');
    });
  });

  describe('hash', () => {
    const ldH = new LanguageDetector(i18next.services, {
      order: [
        'hash'
      ],
      lookupHash: 'lng',
      lookupFromHashIndex: 0
    });
    it('detect via lookupHash', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          hash: '#lng=pt'
        }
      };
      const lng = ldH.detect();
      expect(lng).to.contain('pt');
    });
    it('detect via lookupFromHashIndex', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          hash: '#/es'
        }
      };
      const lng = ldH.detect();
      expect(lng).to.contain('es');
    });
  });

  describe('subdomain', () => {
    it('detect', () => {
      global.window = {
        location: {
          hostname: 'es.foot-print-on-the-moon-1968.org',
          href: 'http://es.foot-print-on-the-moon-1968.org/fr/some/route',
          pathname: '/fr/some/route',
          hash: '#/something?lng=de',
          search: '?lng=de'
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('es');
    });
  });
});

describe('language detector (ISO 15897 locales)', () => {
  const ld = new LanguageDetector(i18next.services, {
    order: [
      'subdomain',
      'querystring',
      'path',
      'cookie',
      'sessionStorage',
      'localStorage',
      'navigator',
      'htmlTag'
    ],
    convertDetectedLanguage: 'Iso15897'
  });

  describe('cookie', () => {
    it('detect', () => {
      global.document = {
        cookie: 'i18next=de-CH'
      };
      const lng = ld.detect();
      expect(lng).to.contain('de_CH');
    });

    it('cacheUserLanguage', () => {
      global.document = {
        cookie: 'my=cookie'
      };
      ld.cacheUserLanguage('it_IT', ['cookie']);
      expect(global.document.cookie).to.match(/i18next=it_IT/);
      expect(global.document.cookie).to.match(/Path=\//);
      // expect(global.document.cookie).to.match(/my=cookie/)
    });
  });

  describe('path', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr-FR/some/route',
          search: ''
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('fr_FR');
    });
  });

  describe('querystring', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr-FR/some/route',
          search: '?lng=de-CH'
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('de_CH');
    });
  });

  describe('querystring (fragment)', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr-FR/some/route',
          hash: '#/something?lng=de-CH',
          search: ''
        }
      };
      const lng = ld.detect();
      expect(lng).to.contain('de_CH');
    });
  });
});

describe('language detector (with xss filter)', () => {
  const ld = new LanguageDetector(i18next.services, {
    order: [
      'cookie',
      'path'
    ]
  });

  it('detect', () => {
    global.document = {
      cookie: 'i18next=de-"><script>alert(\'xss\')</script>'
    };
    global.window = {
      location: {
        pathname: '/fr-CH/some/route',
        search: ''
      }
    };
    const lngs = ld.detect();
    expect(lngs).to.eql(['fr-CH']);
  });
});
