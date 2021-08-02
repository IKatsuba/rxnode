import { get, Server } from '../src/index';
import { catchError, take } from 'rxjs/operators';
import { Messages, use, useExpressMiddleware } from './use';
import * as cookieParser from 'cookie-parser';
import { IncomingMessage } from 'http';
import { EMPTY } from 'rxjs';

describe('Middlewares', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();

    server.listen(4200, 'localhost').subscribe();

    server.subscribe(([, res]) => {
      res.writeHead(200);
      res.end();
    });
  });

  describe('useExpressMiddleware', () => {
    it('should parse cookies', async () => {
      expect.assertions(1);

      const messages = server
        .pipe(
          take(1),
          useExpressMiddleware<
            Messages,
            Messages<IncomingMessage & { cookies: Record<string, string> }>
          >(cookieParser())
        )
        .toPromise();

      await get('http://localhost:4200', {
        headers: {
          Cookie: 'x-is-rxnode=yes',
        },
      }).toPromise();

      const [req] = await messages;

      expect(req.cookies).toEqual({ 'x-is-rxnode': 'yes' });
    });

    it('should reject with error', async () => {
      expect.assertions(1);

      server
        .pipe(
          take(1),
          useExpressMiddleware<
            Messages,
            Messages<IncomingMessage & { cookies: Record<string, string> }>
          >((req, res, next) => {
            next(new Error('Manual error'));
          }),
          catchError((err) => {
            expect(err).toEqual(new Error('Manual error'));

            return EMPTY;
          })
        )
        .subscribe();

      await get('http://localhost:4200', {
        headers: {
          Cookie: 'x-is-rxnode=yes',
        },
      }).toPromise();
    });
  });

  describe('use', () => {
    it('should parse cookies (sync)', async () => {
      const messages = server
        .pipe(
          take(1),
          use<Messages<IncomingMessage & { cookies: string[] }>>((req) => {
            req.cookies = req.headers.cookie.split('=');
          })
        )
        .toPromise();

      await get('http://localhost:4200', {
        headers: {
          Cookie: 'x-is-rxnode=yes',
        },
      }).toPromise();

      const [req] = await messages;

      expect(req.cookies).toEqual(['x-is-rxnode', 'yes']);
    });
  });

  afterAll(async () => {
    await server.close().toPromise();
  });
});
