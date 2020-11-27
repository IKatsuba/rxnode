import {
  IncomingMessage,
  Server as OriginalServer,
  ServerOptions,
  ServerResponse,
} from 'http';
import { AddressInfo, ListenOptions, Socket } from 'net';
import { fromEvent, Observable, Observer } from 'rxjs';
import { observablify, watchify } from '@rxnode/core';
import { take } from 'rxjs/operators';

export class Server extends Observable<
  [req: IncomingMessage, res: ServerResponse]
> {
  public readonly _server: OriginalServer;
  private readonly observers: Observer<
    [req: IncomingMessage, res: ServerResponse]
  >[];

  constructor(options?: ServerOptions) {
    let server: OriginalServer;
    let error: Error;

    try {
      server = new OriginalServer(
        options,
        (req: IncomingMessage, res: ServerResponse) => {
          this.observers.forEach((observer) => {
            observer.next([req, res]);
          });
        }
      );
    } catch (e) {
      error = e;
    }

    fromEvent(server, 'close')
      .pipe(take(1))
      .subscribe(() => {
        this._closed = true;

        this.observers.forEach((observer) => {
          observer.complete();
        });
      });

    super((subscriber) => {
      if (this.closed) {
        subscriber.complete();
      } else if (error) {
        subscriber.error(error);
      } else {
        this.observers.push(subscriber);
      }

      return () => {
        this.observers.splice(this.observers.indexOf(subscriber), 1);

        subscriber.unsubscribe();
      };
    });

    this._closed = false;
    this.observers = [];
    this._server = server;
  }

  private _closed;

  get closed(): boolean {
    return this._closed;
  }

  get maxConnections(): number {
    return this._server.maxConnections;
  }

  set maxConnections(value: number) {
    this._server.maxConnections = value;
  }

  get listening(): boolean {
    return this._server.listening;
  }

  set listening(value: boolean) {
    this._server.listening = value;
  }

  get connections(): number {
    return this._server.connections;
  }

  set connections(value: number) {
    this._server.connections = value;
  }

  get timeout(): number {
    return this._server.timeout;
  }

  set timeout(value: number) {
    this._server.timeout = value;
  }

  get maxHeadersCount(): number | null {
    return this._server.maxHeadersCount;
  }

  set maxHeadersCount(value: number | null) {
    this._server.maxHeadersCount = value;
  }

  get keepAliveTimeout(): number {
    return this._server.keepAliveTimeout;
  }

  set keepAliveTimeout(value: number) {
    this._server.keepAliveTimeout = value;
  }

  get headersTimeout(): number {
    return this._server.headersTimeout;
  }

  set headersTimeout(value: number) {
    this._server.headersTimeout = value;
  }

  setTimeout(msecs?: number): Observable<void> {
    const setTimeout = watchify<[msecs?: number], []>(
      this._server.setTimeout.bind(this._server)
    );

    return setTimeout(msecs).pipe(take(1));
  }

  addListener(event: string): Observable<any>;
  addListener(event: 'close'): Observable<void>;
  addListener(event: 'connection'): Observable<Socket>;
  addListener(event: 'error'): Observable<Error>;
  addListener(event: 'listening'): Observable<void>;
  addListener(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<any | void | Socket | Error> {
    return fromEvent(this._server, event);
  }

  address(): AddressInfo | string {
    return this._server.address();
  }

  close(): Observable<void> {
    const close = observablify<[], []>(this._server.close.bind(this._server));

    return close();
  }

  emit(event: string | symbol, ...args: any[]): boolean;
  emit(event: 'close'): boolean;
  emit(event: 'connection', socket: Socket): boolean;
  emit(event: 'error', err: Error): boolean;
  emit(event: 'listening'): boolean;
  emit(
    event: string | symbol | 'close' | 'connection' | 'error' | 'listening',
    ...args: any[]
  ): boolean {
    return this._server.emit(event, ...args);
  }

  getConnections(): Observable<number> {
    const getConnections = observablify<[], [number]>(
      this._server.getConnections.bind(this._server)
    );

    return getConnections();
  }

  listen(port?: number, hostname?: string, backlog?: number): Observable<void>;
  listen(port?: number, hostname?: string): Observable<void>;
  listen(port?: number, backlog?: number): Observable<void>;
  listen(port?: number): Observable<void>;
  listen(path: string, backlog?: number): Observable<void>;
  listen(path: string): Observable<void>;
  listen(options: ListenOptions): Observable<void>;
  listen(handle: any, backlog?: number): Observable<void>;
  listen(handle: any): Observable<void>;
  listen(
    port?: any,
    hostname?: string | number,
    backlog?: number
  ): Observable<void> {
    const listen = watchify<
      [port?: any, hostname?: string | number, backlog?: number],
      []
    >(this._server.listen.bind(this._server), { closeOnUnsubscribe: false });

    return listen(port, hostname, backlog).pipe(take(1));
  }

  on(event: string): Observable<any>;
  on(event: 'close'): Observable<void>;
  on(event: 'connection'): Observable<Socket>;
  on(event: 'error'): Observable<Error>;
  on(event: 'listening'): Observable<void>;
  on(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<void | Error | Socket | any> {
    return this.addListener(event);
  }

  once(event: string): Observable<any>;
  once(event: 'close'): Observable<void>;
  once(event: 'connection'): Observable<Socket>;
  once(event: 'error'): Observable<Error>;
  once(event: 'listening'): Observable<void>;
  once(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<void | Error | Socket | any> {
    return this.addListener(event).pipe(take(1));
  }

  prependListener(event: string): Observable<any>;
  prependListener(event: 'close'): Observable<void>;
  prependListener(event: 'connection'): Observable<Socket>;
  prependListener(event: 'error'): Observable<Error>;
  prependListener(event: 'listening'): Observable<void>;
  prependListener(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<void | Error | Socket | any> {
    return this.addListener(event).pipe(take(1));
  }

  prependOnceListener(event: string): Observable<any>;
  prependOnceListener(event: 'close'): Observable<void>;
  prependOnceListener(event: 'connection'): Observable<Socket>;
  prependOnceListener(event: 'error'): Observable<Error>;
  prependOnceListener(event: 'listening'): Observable<void>;
  prependOnceListener(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<void | Error | Socket | any> {
    return this.once(event).pipe(take(1));
  }

  ref(): this {
    this._server.ref();

    return this;
  }

  unref(): this {
    this._server.unref();

    return this;
  }
}
