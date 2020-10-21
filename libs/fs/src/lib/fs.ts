import {
  PathLike,
  read as originalReed,
  readdir as originalReaddir,
  readFile as originalReadFile,
  readlink as originalReadLink,
  Stats,
  unlink as originalUnlink,
  watch as originalWatch,
  watchFile as originalWatchFile,
  write as originalWrite,
  writeFile as originalWriteFile
} from 'fs';
import { observablify, watchify } from '@rxnode/core';

export const read = observablify<[fd: number, buffer: Buffer | Uint8Array, offset: number, length: number, position: number | null], [bytesRead: number, buffer: Buffer | Uint8Array]>(originalReed);
export const readdir = observablify<[path: PathLike, options?: { encoding?: string | null } | string | undefined | null], [string[]]>(originalReaddir);
export const readFile = observablify<[path: PathLike | number, options?: { encoding?: string | null; flag?: string; } | string | undefined | null], [string | Buffer]>(originalReadFile);
export const readlink = observablify<[path: PathLike, options?: { encoding?: string | null } | string | undefined | null], [string | Buffer]>(originalReadLink);

export const unlink = observablify<[path: PathLike]>(originalUnlink);

export const watch = watchify<[filename: PathLike, options?: { encoding?: BufferEncoding | string | 'buffer' | null, persistent?: boolean, recursive?: boolean } | BufferEncoding | string | 'buffer' | undefined | null], [event: string, filename: string]>(originalWatch);
export const watchFile = watchify<[filename: PathLike, options?: { persistent?: boolean; interval?: number; } | undefined], [curr: Stats, prev: Stats]>(originalWatchFile);

export const write = observablify<[fd: number, buffer: Buffer | Uint8Array | any, offset?: number | undefined | null, length?: number | undefined | null, position?: number | undefined | null], [written: number, buffer: Buffer | Uint8Array]>(originalWrite);
export const writeFile = observablify<[path: PathLike | number, data: any, options?: { encoding?: string | null; mode?: number | string; flag?: string; } | string | undefined | null], []>(originalWriteFile);


export { PathLike, Stats };
