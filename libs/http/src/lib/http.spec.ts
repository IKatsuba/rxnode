import { Server } from './server/server';
import { get } from './http';
import { IncomingMessage } from 'http';

describe('http', () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();

    await server.listen(4200, 'localhost').toPromise();

    server.subscribe(([, res]) => {
      res.writeHead(200);
      res.end();
    });
  });

  describe('get', () => {
    it('should ping', async () => {
      expect(await get('http://localhost:4200').toPromise()).toBeInstanceOf(
        IncomingMessage
      );
    });
  });

  afterAll(async () => {
    await server.close().toPromise();
  });
});
