const expect = require('expect.js')
const i18next = require('i18next')
const LanguageDetector = require('../dist/cjs/i18nextBrowserLanguageDetector.js')

i18next.init()

describe('language detector', () => {
  const ld = new LanguageDetector(i18next.services, { order: ['querystring', 'path', 'cookie', 'localStorage', 'navigator', 'htmlTag'] })

  describe('cookie', () => {
    it('detect', () => {
      global.document = {
        cookie: 'i18next=de'
      }
      const lng = ld.detect()
      expect(lng).to.eql('de')
    })

    it('cacheUserLanguage', () => {
      global.document = {
        cookie: 'my=cookie'
      }
      ld.cacheUserLanguage('it', ['cookie'])
      expect(global.document.cookie).to.match(/i18next=it/)
      expect(global.document.cookie).to.match(/path=\//)
      // expect(global.document.cookie).to.match(/my=cookie/)
    })
  })

  describe('path', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          search: ''
        }
      }
      const lng = ld.detect()
      expect(lng).to.eql('fr')
    })
  })

  describe('querystring', () => {
    it('detect', () => {
      global.window = {
        location: {
          pathname: '/fr/some/route',
          search: '?lng=de'
        }
      }
      const lng = ld.detect()
      expect(lng).to.eql('de')
    })
  })
})
