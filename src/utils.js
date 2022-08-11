const arr = [];
const each = arr.forEach;
const { slice } = arr;

export function defaults(obj) {
  each.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

export function extend(obj) {
  each.call(slice.call(arguments, 1), (source) => {
    if (source) {
      for (const prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
