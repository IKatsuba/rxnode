export function isPromiseLike<T = any>(value: any): value is PromiseLike<T> {
  // eslint-disable-next-line no-prototype-builtins
  return value && typeof value.then === 'function';
}
