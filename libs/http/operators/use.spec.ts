import { get, Server } from '@rxnode/http';
import { take } from 'rxjs/operators';
import { Messages, use, useExpressMiddleware } from './use';
import * as cookieParser from 'cookie-parser';
import { IncomingMessage } from 'http';

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
