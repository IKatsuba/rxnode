import {
  IncomingMessage,
  Server as OriginalServer,
  ServerOptions,
  ServerResponse,
} from 'http';
import { AddressInfo, ListenOptions, Socket } from 'net';
import { fromEvent, Observable, Subject } from 'rxjs';
import { observablify, watchify } from '@rxnode/core';
import { take, takeUntil } from 'rxjs/operators';

export class Server extends Observable<
  [req: IncomingMessage, res: ServerResponse]
> {
  public readonly _server: OriginalServer;
  private readonly destroy$: Subject<void>;

  constructor(options?: ServerOptions) {
    let server: OriginalServer;
    const destroy$ = new Subject<void>();
    const messages = new Subject<[req: IncomingMessage, res: ServerResponse]>();

    try {
      server = new OriginalServer(
        options,
        (req: IncomingMessage, res: ServerResponse) => {
          messages.next([req, res]);
        }
      );
    } catch (e) {
      messages.error(e);
    }

    fromEvent(server, 'close')
      .pipe(take(1))
      .subscribe(() => {
        this.destroy$.next();
        this.destroy$.complete();

        messages.complete();
      });

    super((subscriber) => {
      return messages.pipe(takeUntil(destroy$)).subscribe(subscriber);
    });

    this.destroy$ = destroy$;
    this._server = server;
  }

  get closed(): Observable<void> {
    return this.destroy$.asObservable();
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
    return fromEvent(this._server, event).pipe(takeUntil(this.destroy$));
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
    event: string | 'close' | 'connection' | 'error' | 'listening',
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
    >(this._server.listen.bind(this._server));

    return listen(port, hostname, backlog).pipe(takeUntil(this.destroy$));
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
    return this.addListener(event);
  }

  prependOnceListener(event: string): Observable<any>;
  prependOnceListener(event: 'close'): Observable<void>;
  prependOnceListener(event: 'connection'): Observable<Socket>;
  prependOnceListener(event: 'error'): Observable<Error>;
  prependOnceListener(event: 'listening'): Observable<void>;
  prependOnceListener(
    event: string | 'close' | 'connection' | 'error' | 'listening'
  ): Observable<void | Error | Socket | any> {
    return this.once(event);
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
