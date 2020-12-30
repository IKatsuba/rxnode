import { watchify } from '@rxnode/core';
import {
  get as originalGet,
  IncomingMessage,
  request as originalRequest,
  RequestOptions,
} from 'http';
import { take } from 'rxjs/operators';
import { URL } from 'url';
import { Observable } from 'rxjs';

export function get(
  options: RequestOptions | string | URL
): Observable<IncomingMessage>;
export function get(
  url: string | URL,
  options: RequestOptions
): Observable<IncomingMessage>;
export function get(
  url: string | URL | RequestOptions,
  options?: RequestOptions
): Observable<IncomingMessage> {
  return watchify<
    [url: string | URL | RequestOptions, options?: RequestOptions],
    [IncomingMessage]
  >(originalGet)(url, options).pipe(take(1));
}

export function request(
  options: RequestOptions | string | URL
): Observable<IncomingMessage>;
export function request(
  url: string | URL,
  options: RequestOptions
): Observable<IncomingMessage>;
export function request(
  url: string | URL | RequestOptions,
  options?: RequestOptions
) {
  return watchify<
    [url: string | URL | RequestOptions, options?: RequestOptions],
    [IncomingMessage]
  >(originalRequest)(url, options).pipe(take(1));
}
