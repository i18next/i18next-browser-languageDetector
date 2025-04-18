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

export function hasXSS(input) {
  if (typeof input !== 'string') return false;

  // Common XSS attack patterns
  const xssPatterns = [
    /<\s*script.*?>/i,
    /<\s*\/\s*script\s*>/i,
    /<\s*img.*?on\w+\s*=/i,
    /<\s*\w+\s*on\w+\s*=.*?>/i,
    /javascript\s*:/i,
    /vbscript\s*:/i,
    /expression\s*\(/i,
    /eval\s*\(/i,
    /alert\s*\(/i,
    /document\.cookie/i,
    /document\.write\s*\(/i,
    /window\.location/i,
    /innerHTML/i
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}
