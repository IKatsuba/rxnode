import { Server } from './server';
import { ServerOptions } from 'http';

export function createServer(options?: ServerOptions): Server {
  return new Server(options);
}
