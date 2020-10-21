import { Observable } from 'rxjs';

export type Arguments = unknown[];
export type Results = unknown[];
export type Callback<T extends Results> = (...results: T) => unknown;
export type ErrorCallback<T extends Results = []> = Callback<[unknown, ...T]>;

export function observablify<A extends Arguments, R extends Results = []>(
  fn: (...args: [...A, ErrorCallback<R>]) => unknown,
  { once = true }: { once?: boolean } = {}
): (...args: A) => Observable<R> {
  return (...args: A) => {
    return new Observable<R>((subscriber) => {
      try {
        fn(...args, (error: unknown, ...results: R) => {
          if (error) {
            subscriber.error(error);
          } else {
            subscriber.next(results);
            once && subscriber.complete();
          }
        });
      } catch (e) {
        subscriber.error(e);
      }
    });
  };
}

export function watchify<A extends Arguments, R extends Results>(
  fn: (...args: [...A, Callback<R>]) => unknown
): (...args: A) => Observable<R> {
  return (...args: A) => {
    return new Observable<R>((subscriber) => {
      let watcher: any;

      try {
        watcher = fn(...args, (...result: R) => {
          subscriber.next(result);
        });
      } catch (e) {
        subscriber.error(e);
      }

      return () => {
        subscriber.unsubscribe();
        watcher && watcher.close && watcher.close();
      };
    });
  };
}
