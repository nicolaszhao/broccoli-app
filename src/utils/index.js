/* eslint-disable import/prefer-default-export */
export function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}
