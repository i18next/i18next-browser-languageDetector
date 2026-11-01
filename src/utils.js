const { slice, forEach } = [];

export function defaults(obj) {
  forEach.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

export function extend(obj) {
  forEach.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

// The shape of a language code that i18next accepts from outside since 26.7 (the rule of its exported
// isSafeLanguageCode): letters, digits, `-`, `_`, `@` and `.` (no `..`), at most 128 characters, not a
// prototype key. It is not a BCP 47 check, so `en_US` and `sr@latin` pass. Markup, quotes, spaces,
// slashes and `=` do not, so a detected language cannot break out of `<html lang="...">`; the XSS
// patterns this replaces missed values like `<b>x</b>` or `" onmouseover="x()`.
export function isSafeLanguageCode(code) {
  return (
    typeof code === 'string'
    && /^[A-Za-z0-9_@.-]{1,128}$/.test(code)
    && code.indexOf('..') < 0
    && ['__proto__', 'constructor', 'prototype'].indexOf(code) < 0
  );
}
