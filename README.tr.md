# Giriş

[![npm version](https://img.shields.io/npm/v/i18next-browser-languagedetector.svg?style=flat-square)](https://www.npmjs.com/package/i18next-browser-languagedetector)

Bu, tarayıcıda kullanıcı dilini algılamak için kullanılan bir i18next dil algılama eklentisidir ve aşağıdakileri destekler:

- çerez (i18next=LANGUAGE çerezini ayarlar)
- sessionStorage (i18nextLng=LANGUAGE anahtarını ayarlar)
- localStorage (i18nextLng=LANGUAGE anahtarını ayarlar)
- navigator (tarayıcı dilini ayarlar)
- querystring (URL'ye `?lng=LANGUAGE` ekler)
- htmlTag (html dil etiketini ekler <html lang="LANGUAGE" ...)
- yol (http://my.site.com/LANGUAGE/...)
- alt alan adı (http://LANGUAGE.site.com/...)
- hash (URL'ye `#lng=LANGUAGE` veya `#/LANGUAGE` ekler)

## Öneri:

Çeviri dosyalarınızı manuel olarak yönetmeyi sevmiyorsanız veya sadece daha iyi bir yönetim çözümü arıyorsanız, (https://www.locize.com?utm_source=i18next_browser_languagedetector_readme&utm_medium=github&utm_campaign=readme), [i18next-locize-backend](https://github.com/locize/i18next-locize-backend) paketine bir göz atın, uçtan uca bir i18next kurulumu için bu dil algılayıcıyı Locize arka ucuyla (backend) eşleştirin. 🌐 [Locize](https://www.locize.com?utm_source=i18next_browser_languagedetector_readme&utm_medium=github&utm_campaign=readme) ☁️ için i18next [arka uç eklentisi](https://www.i18next.com/overview/plugins-and-utils#backends).

Uygulamanıza sabit kodlanmış dizelerle mi başlıyorsunuz? `npx i18next-cli localize` komutunu çalıştırın, bu tek komut; dizeleri `t()` fonksiyonu ile sarmalar, anahtarları ayıklar, [Locize]’a (https://www.locize.com?from=i18next-browser-languagedetector_readme__localize) bağlanır ve uygulamanızı yapay zeka ile çevirir. Tanıtım yazısına [launch post](https://www.locize.com/blog/i18next-cli-localize?from=i18next-browser-languagedetector_readme__localize) göz atın.

Başlarken

Kaynak kodları [npm](https://www.npmjs.com/package/i18next-browser-languagedetector), bower aracılığıyla yüklenebilir veya bu repodan indirilebilir (https://github.com/i18next/i18next-browser-languagedetector/blob/master/i18nextBrowserLanguageDetector.min.js).

```
# npm paketi
$ npm install i18next-browser-languagedetector

# bower
$ bower install i18next-browser-languagedetector
```

- Bir modül yükleyici kullanmıyorsanız, `window.i18nextBrowserLanguageDetector`nesnesine eklenecektir.

Bağlantının yapılması:

```js
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).init({
  supportedLngs: ['de', 'en', 'fr'],
  ...i18nextOptions
});
```

Tüm modüllerde olduğu gibi, `i18next.use` metoduna kurucu fonksiyonu (class) veya somut bir örneği aktarabilirsiniz.

[`supportedLngs`](https://www.i18next.com/overview/configuration-options#languages-namespaces-resources) isteğe bağlıdır, ancak i18next'in algılanan diller listesinden en iyi eşleşmeyi seçmesine olanak tanır. Ayarlanmazsa, uygulamanızın o dil için çevirileri olup olmadığına bakılmaksızın [`language`](https://www.i18next.com/overview/api#language) değeri algılanan ilk dile ayarlanacaktır.   

## Algılayıcı Seçenekleri
*Varsayılan seçenekler [burada](https://github.com/i18next/i18next-browser-languageDetector/blob/9efebe6ca0271c3797bc09b84babf1ba2d9b4dbb/src/index.js#L11) bulunabilir.*

```js
{
  // kullanıcı dilinin algılanacağı yerler ve sırası
  order: ['querystring', 'hash', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // dilin aranacağı anahtarlar veya parametreler
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  lookupHash: 'lng', // #lng=pt veya #something&lng=en
  lookupFromHashIndex: 0, // #/de

  // kullanıcı dilini şurada önbelleğe al:
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // kalıcı yapılmayacak diller (çerez, localStorage)

  // ayarlanacak çerez için isteğe bağlı son kullanma tarihi ve alan adı
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // lang özniteliğine sahip isteğe bağlı htmlTag, varsayılan değer:
  htmlTag: document.documentElement,

  // isteğe bağlı çerez ayarlama seçenekleri, referans:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' },

  // algılanan dil kodunu değiştirmek için kullanılan isteğe bağlı dönüştürme fonksiyonu
  convertDetectedLanguage: 'Iso15897',
  convertDetectedLanguage: (lng) => lng.replace('-', '_')
}
```

Seçenekler şu şekillerde aktarılabilir:

**tercih edilen** - i18next.init içinde options.detection ayarlanarak:

```js
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next.use(LanguageDetector).init({
  detection: options,
});
```

Kurucu aşamasında:

```js
import LanguageDetector from 'i18next-browser-languagedetector';
const languageDetector = new LanguageDetector(null, options);
```

init fonksiyonu çağrılarak:

```js
import LanguageDetector from 'i18next-browser-languagedetector';
const languageDetector = new LanguageDetector();
languageDetector.init(options);
```

## Kendi algılama işlevselliğinizi ekleme

### arayüz

```js
export default {
  name: 'myDetectorsName',

  lookup(options) {
    // options -> seçeneklerde aktarılır
    return 'en';
  },

  cacheUserLanguage(lng, options) {
    // options -> seçeneklerde aktarılır
    // lng -> mevcut dil, init sonrasında ve changeLanguage tetiklendiğinde çağrılır
    // onu kaydet
  },
};
```

### ekleme

```js
import LanguageDetector from 'i18next-browser-languagedetector';
const languageDetector = new LanguageDetector();
languageDetector.addDetector(myDetector);

i18next.use(languageDetector).init({
  detection: options,
});
```

Unutmayın: Algılayıcınızın adını (bu durumda `myDetectorsName`) `options` nesnenizdeki `order` dizisine eklemeniz gerekir. Bunu yapmazsanız, algılayıcınız kullanılmayacaktır. Daha fazlası için bkz. [Algılayıcı Seçenekleri bölümü](#detector-options).

---

<h3 align="center">Altın Sponsorlar</h3>

<p align="center">
  <a href="https://www.locize.com/?utm_source=i18next_browser_languagedetector_readme&utm_medium=github&utm_campaign=readme" target="_blank">
    <img src="https://raw.githubusercontent.com/i18next/i18next/master/assets/locize_sponsor_240.gif" width="240px">
  </a>
</p>

---

**servis olarak yerelleştirme - locize.com**

Bir çeviri yönetimine mi ihtiyacınız var? Çevirilerinizi bir Bağlam İçi Editör ile mi düzenlemek istiyorsunuz? i18next'in bakımını üstlenenler tarafından size sunulan orijinal hizmeti kullanın!

![locize](https://www.locize.com/img/ads/github_locize.png)

[locize](https://www.locize.com/?utm_source=i18next_browser_languagedetector_readme&utm_medium=github&utm_campaign=readme) kullanarak i18next ve react-i18next’in geleceğini doğrudan desteklemiş olursunuz.

---
