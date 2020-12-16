import { concatMap, map } from 'rxjs/operators';
import { IncomingMessage, ServerResponse } from 'http';
import { defer, isObservable, Observable, of, OperatorFunction } from 'rxjs';
import { isPromiseLike } from '@rxnode/core';

export type Messages<
  Req extends IncomingMessage = IncomingMessage,
  Res extends ServerResponse = ServerResponse
> = [Req, Res];

export type Middleware<T extends Messages, R extends Messages> = (
  req: T[0],
  res: T[1]
) => Observable<R | void> | PromiseLike<R | void> | R | void;

export type ExpressMiddleware<
  I extends IncomingMessage,
  S extends ServerResponse
> = (req: I, res: S, next: (err?: any | 'route') => void) => void;

export function use<T extends Messages = Messages, R extends Messages = T>(
  middleware: Middleware<T, R>
): OperatorFunction<T, R> {
  return concatMap<T, Observable<R>>(([req, res]) => {
    const result = middleware(req, res);

    let result$: Observable<R | void>;
    if (isObservable(result)) {
      result$ = result;
    } else if (isPromiseLike(result)) {
      result$ = defer(() => result);
    } else {
      result$ = of(result);
    }

    return result$.pipe(
      map<R | void, R>((value) => (value ?? [req, res]) as R)
    );
  });
}

export function useExpressMiddleware<
  T extends Messages = Messages,
  R extends Messages = T
>(middleware: ExpressMiddleware<T[0], T[1]>): OperatorFunction<T, R> {
  return concatMap<T, Observable<R>>(([req, res]) => {
    return new Observable<R>((subscriber) => {
      try {
        middleware(req, res, (err?: any | 'route') => {
          if (err && err !== 'route') {
            subscriber.error(err);
          } else {
            subscriber.next([req, res] as R);
            subscriber.complete();
          }
        });
      } catch (e) {
        subscriber.error(e);
      }
    });
  });
}
