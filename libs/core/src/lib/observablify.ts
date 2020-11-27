import { Observable } from 'rxjs';

export type Arguments = any[];
export type Results = any[];
export type Callback<T extends Results> = (...results: T) => any;
export type ErrorCallback<T extends Results = []> = Callback<[any, ...T]>;
export type VoidOrItemOrItems<T extends Results> = T extends []
  ? void
  : T extends [result?: infer R]
  ? R
  : T;

function isEmptyArray(value: any): value is [] {
  return Array.isArray(value) && value.length === 0;
}

function isOneItemArray<R = any>(value: any): value is [R] {
  return Array.isArray(value) && value.length === 1;
}

function getVoidOrItemOrItems<R extends Results>(
  value: R
): VoidOrItemOrItems<R> {
  if (isEmptyArray(value)) {
    return;
  }

  if (isOneItemArray(value)) {
    return value[0];
  }

  return value as Exclude<VoidOrItemOrItems<R>, [] | [any]>;
}

export function observablify<A extends Arguments, R extends Results = []>(
  fn: (...args: [...A, ErrorCallback<R>]) => any
): (...args: A) => Observable<VoidOrItemOrItems<R>> {
  return (...args: A) => {
    return new Observable<VoidOrItemOrItems<R>>((subscriber) => {
      try {
        fn(...args, (error: any, ...results: R) => {
          if (error) {
            subscriber.error(error);
          } else {
            subscriber.next(getVoidOrItemOrItems(results));

            subscriber.complete();
          }
        });
      } catch (e) {
        subscriber.error(e);
      }
    });
  };
}

export function watchify<A extends Arguments, R extends Results>(
  fn: (...args: [...A, Callback<R>]) => any,
  { closeOnUnsubscribe: closeOnUnsubscribe = true } = {}
): (...args: A) => Observable<VoidOrItemOrItems<R>> {
  return (...args: A) => {
    return new Observable<VoidOrItemOrItems<R>>((subscriber) => {
      let watcher: any;

      try {
        watcher = fn(...args, (...result: R) => {
          subscriber.next(getVoidOrItemOrItems(result));
        });
      } catch (e) {
        subscriber.error(e);
      }

      return () => {
        subscriber.unsubscribe();
        closeOnUnsubscribe && watcher && watcher.close && watcher.close();
      };
    });
  };
}
