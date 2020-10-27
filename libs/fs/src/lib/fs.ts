import {
  PathLike,
  access as originalAccess,
  appendFile as originalAppendFile,
  chmod as originalChmode,
  chown as originalChown,
  close as originalClose,
  copyFile as originalCopyFile,
  fchmod as originalFchmod,
  fchown as originalFchown,
  fdatasync as originalFdatasync,
  fstat as originalFstat,
  fsync as originalFsync,
  ftruncate as originalFtruncate,
  futimes as originalFutimes,
  lchmod as originalLchmod,
  lchown as originalLchown,
  link as originalLink,
  lstat as originalLstat,
  MakeDirectoryOptions,
  mkdir as originalMkdir,
  mkdtemp as originalMkdtemp,
  open as originalOpen,
  read as originalReed,
  readdir as originalReaddir,
  readFile as originalReadFile,
  readlink as originalReadLink,
  realpath as originalRealpath,
  rename as originalRename,
  rmdir as originalRmdir,
  Stats,
  stat as originalStat,
  symlink as originalSymlink,
  truncate as originalTruncate,
  unlink as originalUnlink,
  unwatchFile as originalUnwatchFile,
  utimes as originalUtimes,
  watch as originalWatch,
  watchFile as originalWatchFile,
  write as originalWrite,
  writeFile as originalWriteFile,
  WriteFileOptions,
} from 'fs';
import { observablify, watchify } from '@rxnode/core';
import { defer, Observable } from 'rxjs';

export const access = observablify<[path: PathLike, mode?: number | undefined]>(
  originalAccess
);

export const appendFile = observablify<
  [file: PathLike | number, data: any, options?: WriteFileOptions]
>(originalAppendFile);

export const chmode = observablify<[path: PathLike, mode: string | number]>(
  originalChmode
);

export const chown = observablify<[path: PathLike, uid: number, gid: number]>(
  originalChown
);

export const close = observablify<[fd: number]>(originalClose);

export const copyFile = observablify<
  [src: PathLike, dest: PathLike, flags?: number]
>(originalCopyFile);

export const fchmod = observablify<[fd: number, mode: string | number]>(
  originalFchmod
);

export const fchown = observablify<[fd: number, uid: number, gid: number]>(
  originalFchown
);

export const fdatasync = observablify<[fd: number]>(originalFdatasync);

export const fstat = observablify<[fd: number], [stats: Stats]>(originalFstat);

export const fsync = observablify<[fd: number]>(originalFsync);

export const ftruncate = observablify<
  [fd: number, len?: number | undefined | null]
>(originalFtruncate);

export const futimes = observablify<
  [fd: number, atime: string | number | Date, mtime: string | number | Date]
>(originalFutimes);

export const lchmod = observablify<[path: PathLike, mode: string | number]>(
  originalLchmod
);

export const lchown = observablify<[path: PathLike, uid: number, gid: number]>(
  originalLchown
);

export const link = observablify<[existingPath: PathLike, newPath: PathLike]>(
  originalLink
);

export const lstat = observablify<[path: PathLike], [Stats]>(originalLstat);

export const mkdir = observablify<
  [
    path: PathLike,
    options?: number | string | MakeDirectoryOptions | undefined | null
  ]
>(originalMkdir);

export const mkdtemp = observablify<
  [
    prefix: string,
    options?:
      | 'buffer'
      | { encoding?: 'buffer' }
      | { encoding?: BufferEncoding | null }
      | BufferEncoding
      | undefined
      | null
  ],
  [folder: string | Buffer]
>(originalMkdtemp);

export const open = observablify<
  [
    path: PathLike,
    flags: string | number,
    mode?: string | number | undefined | null
  ],
  [fd: number]
>(originalOpen);

export const read = observablify<
  [
    fd: number,
    buffer: Buffer | Uint8Array,
    offset: number,
    length: number,
    position: number | null
  ],
  [bytesRead: number, buffer: Buffer | Uint8Array]
>(originalReed);

export const readdir = observablify<
  [
    path: PathLike,
    options?: { encoding?: string | null } | string | undefined | null
  ],
  [string[]]
>(originalReaddir);

export const readFile = observablify<
  [
    path: PathLike | number,
    options?:
      | { encoding?: string | null; flag?: string }
      | string
      | undefined
      | null
  ],
  [string | Buffer]
>(originalReadFile);

export const readlink = observablify<
  [
    path: PathLike,
    options?: { encoding?: string | null } | string | undefined | null
  ],
  [string | Buffer]
>(originalReadLink);

//todo(fs): implement realpath.native
export const realpath = observablify<
  [
    path: PathLike,
    options?:
      | { encoding?: BufferEncoding | null }
      | BufferEncoding
      | undefined
      | null
      | { encoding?: 'buffer' }
      | 'buffer'
      | string
  ],
  [resolvedPath: Buffer | string]
>(originalRealpath);

export const rename = observablify<[oldPath: PathLike, newPath: PathLike]>(
  originalRename
);

export const rmdir = observablify<[path: PathLike]>(originalRmdir);

export const stat = observablify<[path: PathLike], [stats: Stats]>(
  originalStat
);

//todo(fs): implemet symlink.Type
export const symlink = observablify<
  [
    target: PathLike,
    path: PathLike,
    type?: originalSymlink.Type | undefined | null
  ]
>(originalSymlink);

export const truncate = observablify<
  [path: PathLike, len?: number | undefined | null]
>(originalTruncate);

export const unlink = observablify<[path: PathLike]>(originalUnlink);

export function unwatchFile(
  filename: PathLike,
  listener?: (curr: Stats, prev: Stats) => void
): Observable<void> {
  return defer(() => originalUnwatchFile(filename, listener));
}

export const utimes = observablify<
  [path: PathLike, atime: string | number | Date, mtime: string | number | Date]
>(originalUtimes);

export const watch = watchify<
  [
    filename: PathLike,
    options?:
      | {
          encoding?: BufferEncoding | string | 'buffer' | null;
          persistent?: boolean;
          recursive?: boolean;
        }
      | BufferEncoding
      | string
      | 'buffer'
      | undefined
      | null
  ],
  [event: string, filename: string]
>(originalWatch);

export const watchFile = watchify<
  [
    filename: PathLike,
    options?: { persistent?: boolean; interval?: number } | undefined
  ],
  [curr: Stats, prev: Stats]
>(originalWatchFile);

export const write = observablify<
  [
    fd: number,
    buffer: Buffer | Uint8Array | any,
    offset?: number | undefined | null,
    length?: number | undefined | null,
    position?: number | undefined | null
  ],
  [written: number, buffer: Buffer | Uint8Array]
>(originalWrite);

export const writeFile = observablify<
  [
    path: PathLike | number,
    data: any,
    options?:
      | { encoding?: string | null; mode?: number | string; flag?: string }
      | string
      | undefined
      | null
  ]
>(originalWriteFile);

export { PathLike, Stats, WriteFileOptions, MakeDirectoryOptions };
