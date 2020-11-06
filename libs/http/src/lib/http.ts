import { watchify } from '@rxnode/core';
import { get as originalGet, request as originalRequest, IncomingMessage, RequestOptions } from 'http';
import { take } from 'rxjs/operators';
import { URL } from 'url';

export function get(
  url: string | URL | RequestOptions,
  options?: RequestOptions
) {
  return watchify<
    [url: string | URL | RequestOptions, options?: RequestOptions],
    [IncomingMessage]
  >(originalGet)(url, options).pipe(take(1));
}

export function request(
  url: string | URL | RequestOptions,
  options?: RequestOptions
) {
  return watchify<
    [url: string | URL | RequestOptions, options?: RequestOptions],
    [IncomingMessage]
  >(originalRequest)(url, options).pipe(take(1));
}
