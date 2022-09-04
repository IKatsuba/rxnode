import {
  access as originalAccess,
  appendFile as originalAppendFile,
  BigIntStats,
  chmod as originalChmode,
  chown as originalChown,
  close as originalClose,
  copyFile as originalCopyFile,
  Dirent,
  fchmod as originalFchmod,
  fchown as originalFchown,
  fdatasync as originalFdatasync,
  fstatSync as originalFstat,
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
  PathLike,
  read as originalReed,
  readdir as originalReaddir,
  readFile as originalReadFile,
  readlink as originalReadLink,
  realpath as originalRealpath,
  rename as originalRename,
  rmdir as originalRmdir,
  stat as originalStat,
  StatOptions,
  Stats,
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

export function access(
  path: PathLike,
  mode: number | undefined
): Observable<void>;
export function access(path: PathLike): Observable<void>;
export function access(
  path: PathLike,
  mode?: number | undefined
): Observable<void> {
  return observablify<[path: PathLike, mode?: number | undefined]>(
    originalAccess
  )(path, mode);
}

export function appendFile(
  file: PathLike | number,
  data: any,
  options: WriteFileOptions
): Observable<void>;
export function appendFile(
  file: PathLike | number,
  data: any
): Observable<void>;
export function appendFile(
  file: PathLike | number,
  data: any,
  options?: WriteFileOptions
): Observable<void> {
  return observablify<
    [file: PathLike | number, data: any, options?: WriteFileOptions]
  >(originalAppendFile)(file, data, options);
}

export function chmode(
  path: PathLike,
  mode: string | number
): Observable<void> {
  return observablify<[path: PathLike, mode: string | number]>(originalChmode)(
    path,
    mode
  );
}

export function chown(
  path: PathLike,
  uid: number,
  gid: number
): Observable<void> {
  return observablify<[path: PathLike, uid: number, gid: number]>(
    originalChown
  )(path, uid, gid);
}

export function close(fd: number): Observable<void> {
  return observablify<[fd: number]>(originalClose)(fd);
}

export function copyFile(src: PathLike, dest: PathLike): Observable<void>;
export function copyFile(
  src: PathLike,
  dest: PathLike,
  flags: number
): Observable<void>;
export function copyFile(
  src: PathLike,
  dest: PathLike,
  flags?: number
): Observable<void> {
  return observablify<[src: PathLike, dest: PathLike, flags?: number]>(
    originalCopyFile
  )(src, dest, flags);
}

export function fchmod(fd: number, mode: string | number): Observable<void> {
  return observablify<[fd: number, mode: string | number]>(originalFchmod)(
    fd,
    mode
  );
}

export function fchown(fd: number, uid: number, gid: number): Observable<void> {
  return observablify<[fd: number, uid: number, gid: number]>(originalFchown)(
    fd,
    uid,
    gid
  );
}

export function fdatasync(fd: number): Observable<void> {
  return observablify<[fd: number]>(originalFdatasync)(fd);
}

export function fstat(
  fd: number,
  options?: StatOptions & { bigint?: false | undefined }
): Observable<Stats>;
export function fstat(
  fd: number,
  options: StatOptions & { bigint: true }
): Observable<BigIntStats>;
export function fstat(
  fd: number,
  options?: StatOptions
): Observable<Stats | BigIntStats> {
  return defer(() => Promise.resolve(originalFstat(fd, options)));
}

export function fsync(fd: number): Observable<void> {
  return observablify<[fd: number]>(originalFsync)(fd);
}

export function ftruncate(
  fd: number,
  len: number | undefined | null
): Observable<void>;
export function ftruncate(fd: number): Observable<void>;
export function ftruncate(
  fd: number,
  len?: number | undefined | null
): Observable<void> {
  return observablify<[fd: number, len?: number | undefined | null]>(
    originalFtruncate
  )(fd, len);
}

export function futimes(
  fd: number,
  atime: string | number | Date,
  mtime: string | number | Date
): Observable<void> {
  return observablify<
    [fd: number, atime: string | number | Date, mtime: string | number | Date]
  >(originalFutimes)(fd, atime, mtime);
}

export function lchmod(
  path: PathLike,
  mode: string | number
): Observable<void> {
  return observablify<[path: PathLike, mode: string | number]>(originalLchmod)(
    path,
    mode
  );
}

export function lchown(
  path: PathLike,
  uid: number,
  gid: number
): Observable<void> {
  return observablify<[path: PathLike, uid: number, gid: number]>(
    originalLchown
  )(path, uid, gid);
}

export function link(
  existingPath: PathLike,
  newPath: PathLike
): Observable<void> {
  return observablify<[existingPath: PathLike, newPath: PathLike]>(
    originalLink
  )(existingPath, newPath);
}

export function lstat(path: PathLike): Observable<Stats> {
  return observablify<[path: PathLike], [Stats]>(originalLstat)(path);
}

export function mkdir(
  path: PathLike,
  options: number | string | MakeDirectoryOptions | undefined | null
): Observable<void>;
export function mkdir(path: PathLike): Observable<void>;
export function mkdir(
  path: PathLike,
  options?: number | string | MakeDirectoryOptions | undefined | null
): Observable<void> {
  return observablify<
    [
      path: PathLike,
      options?: number | string | MakeDirectoryOptions | undefined | null
    ]
  >(originalMkdir)(path, options);
}

export function mkdtemp(
  prefix: string,
  options:
    | { encoding?: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null
): Observable<string>;
export function mkdtemp(
  prefix: string,
  options: 'buffer' | { encoding: 'buffer' }
): Observable<Buffer>;
export function mkdtemp(
  prefix: string,
  options: { encoding?: string | null } | string | undefined | null
): Observable<string | Buffer>;
export function mkdtemp(prefix: string): Observable<string>;
export function mkdtemp(
  prefix: string,
  options?:
    | 'buffer'
    | { encoding?: 'buffer' }
    | { encoding?: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null
): Observable<string | Buffer> {
  return observablify<
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
  >(originalMkdtemp)(prefix, options);
}

export function open(
  path: PathLike,
  flags: string | number,
  mode: string | number | undefined | null
): Observable<number>;
export function open(
  path: PathLike,
  flags: string | number
): Observable<number>;
export function open(
  path: PathLike,
  flags: string | number,
  mode?: string | number | undefined | null
): Observable<number> {
  return observablify<
    [
      path: PathLike,
      flags: string | number,
      mode?: string | number | undefined | null
    ],
    [fd: number]
  >(originalOpen)(path, flags, mode);
}

export function read(
  fd: number,
  buffer: Buffer | Uint8Array,
  offset: number,
  length: number,
  position: number | null
): Observable<[bytesRead: number, buffer: Buffer | Uint8Array]> {
  return observablify<
    [
      fd: number,
      buffer: Buffer | Uint8Array,
      offset: number,
      length: number,
      position: number | null
    ],
    [bytesRead: number, buffer: Buffer | Uint8Array]
  >(originalReed)(fd, buffer, offset, length, position);
}

export function readdir(
  path: PathLike,
  options:
    | { encoding: BufferEncoding | null; withFileTypes?: false }
    | BufferEncoding
    | undefined
    | null
): Observable<string[]>;
export function readdir(
  path: PathLike,
  options: { encoding: 'buffer'; withFileTypes?: false } | 'buffer'
): Observable<Buffer[]>;
export function readdir(
  path: PathLike,
  options:
    | { encoding?: string | null; withFileTypes?: false }
    | string
    | undefined
    | null
): Observable<string[] | Buffer[]>;
export function readdir(path: PathLike): Observable<string[]>;
export function readdir(
  path: PathLike,
  options: { encoding?: string | null; withFileTypes: true }
): Observable<Dirent[]>;
export function readdir(
  path: PathLike,
  options?: { encoding?: string | null } | string | undefined | null
): Observable<string[] | Buffer[] | Dirent[]> {
  return observablify<
    [
      path: PathLike,
      options?: { encoding?: string | null } | string | undefined | null
    ],
    [string[] | Buffer[] | Dirent[]]
  >(originalReaddir)(path, options);
}

export function readFile(
  path: PathLike | number,
  options: { encoding?: null; flag?: string } | undefined | null
): Observable<Buffer>;
export function readFile(
  path: PathLike | number,
  options: { encoding: string; flag?: string } | string
): Observable<string>;
export function readFile(
  path: PathLike | number,
  options:
    | { encoding?: string | null; flag?: string }
    | string
    | undefined
    | null
): Observable<string | Buffer>;
export function readFile(path: PathLike | number): Observable<Buffer>;
export function readFile(
  path: PathLike | number,
  options?:
    | { encoding?: string | null; flag?: string }
    | string
    | undefined
    | null
): Observable<string | Buffer> {
  return observablify<
    [
      path: PathLike | number,
      options?:
        | { encoding?: string | null; flag?: string }
        | string
        | undefined
        | null
    ],
    [string | Buffer]
  >(originalReadFile)(path, options);
}

export function readlink(
  path: PathLike,
  options:
    | { encoding?: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null
): Observable<string>;
export function readlink(
  path: PathLike,
  options: { encoding: 'buffer' } | 'buffer'
): Observable<Buffer>;
export function readlink(
  path: PathLike,
  options: { encoding?: string | null } | string | undefined | null
): Observable<string | Buffer>;
export function readlink(path: PathLike): Observable<string>;
export function readlink(
  path: PathLike,
  options?: { encoding?: string | null } | string | undefined | null
): Observable<string | Buffer> {
  return observablify<
    [
      path: PathLike,
      options?: { encoding?: string | null } | string | undefined | null
    ],
    [string | Buffer]
  >(originalReadLink)(path, options);
}

//todo(fs): implement realpath.native
export function realpath(
  path: PathLike,
  options:
    | { encoding?: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null
): Observable<string>;
export function realpath(
  path: PathLike,
  options: { encoding: 'buffer' } | 'buffer'
): Observable<Buffer>;
export function realpath(
  path: PathLike,
  options: { encoding?: string | null } | string | undefined | null
): Observable<string | Buffer>;
export function realpath(path: PathLike): Observable<string>;
export function realpath(
  path: PathLike,
  options?:
    | { encoding?: BufferEncoding | null }
    | BufferEncoding
    | undefined
    | null
    | { encoding?: 'buffer' }
    | 'buffer'
    | string
): Observable<Buffer | string> {
  return observablify<
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
  >(originalRealpath)(path, options);
}

export function rename(oldPath: PathLike, newPath: PathLike): Observable<void> {
  return observablify<[oldPath: PathLike, newPath: PathLike]>(originalRename)(
    oldPath,
    newPath
  );
}

export function rmdir(path: PathLike): Observable<void> {
  return observablify<[path: PathLike]>(originalRmdir)(path);
}

export function stat(path: PathLike): Observable<Stats> {
  return observablify<[path: PathLike], [stats: Stats]>(originalStat)(path);
}

//todo(fs): implemet symlink.Type
export function symlink(
  target: PathLike,
  path: PathLike,
  type: originalSymlink.Type | undefined | null
): Observable<void>;
export function symlink(target: PathLike, path: PathLike): Observable<void>;
export function symlink(
  target: PathLike,
  path: PathLike,
  type?: originalSymlink.Type | undefined | null
): Observable<void> {
  return observablify<
    [
      target: PathLike,
      path: PathLike,
      type?: originalSymlink.Type | undefined | null
    ]
  >(originalSymlink)(target, path, type);
}

export function truncate(
  path: PathLike,
  len: number | undefined | null
): Observable<void>;
export function truncate(path: PathLike): Observable<void>;
export function truncate(
  path: PathLike,
  len?: number | undefined | null
): Observable<void> {
  return observablify<[path: PathLike, len?: number | undefined | null]>(
    originalTruncate
  )(path, len);
}

export function unlink(path: PathLike): Observable<void> {
  return observablify<[path: PathLike]>(originalUnlink)(path);
}

// todo(fs): remove it in fs@1.0.0
/**
 *
 * @param filename
 * @param listener
 * @deprecated use watch and Subscription#unsubscribe
 */
export function unwatchFile(
  filename: PathLike,
  listener?: (curr: Stats, prev: Stats) => void
): Observable<void> {
  return defer(() => [originalUnwatchFile(filename, listener)]);
}

export function utimes(
  path: PathLike,
  atime: string | number | Date,
  mtime: string | number | Date
): Observable<void> {
  return observablify<
    [
      path: PathLike,
      atime: string | number | Date,
      mtime: string | number | Date
    ]
  >(originalUtimes)(path, atime, mtime);
}

export function watch(
  filename: PathLike,
  options:
    | {
        encoding?: BufferEncoding | null;
        persistent?: boolean;
        recursive?: boolean;
      }
    | BufferEncoding
    | undefined
    | null
): Observable<[event: string, filename: string]>;
export function watch(
  filename: PathLike,
  options:
    | { encoding: 'buffer'; persistent?: boolean; recursive?: boolean }
    | 'buffer'
): Observable<[event: string, filename: Buffer]>;
export function watch(
  filename: PathLike,
  options:
    | { encoding?: string | null; persistent?: boolean; recursive?: boolean }
    | string
    | null
): Observable<[event: string, filename: string | Buffer]>;
export function watch(
  filename: PathLike
): Observable<[event: string, filename: string]>;
export function watch(
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
): Observable<[event: string, filename: string | Buffer]> {
  return watchify<
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
  >(originalWatch)(filename, options);
}

export function watchFile(
  filename: PathLike,
  options: { persistent?: boolean; interval?: number } | undefined
): Observable<[curr: Stats, prev: Stats]>;
export function watchFile(
  filename: PathLike
): Observable<[curr: Stats, prev: Stats]>;
export function watchFile(
  filename: PathLike,
  options?: { persistent?: boolean; interval?: number } | undefined
): Observable<[curr: Stats, prev: Stats]> {
  return watchify<
    [
      filename: PathLike,
      options?: { persistent?: boolean; interval?: number } | undefined
    ],
    [curr: Stats, prev: Stats]
  >(originalWatchFile)(filename, options);
}

export function write<TBuffer extends NodeJS.ArrayBufferView>(
  fd: number,
  buffer: TBuffer,
  offset: number | undefined | null,
  length: number | undefined | null,
  position: number | undefined | null
): Observable<[written: number, buffer: TBuffer]>;
export function write<TBuffer extends NodeJS.ArrayBufferView>(
  fd: number,
  buffer: TBuffer,
  offset: number | undefined | null,
  length: number | undefined | null
): Observable<[written: number, buffer: TBuffer]>;
export function write<TBuffer extends NodeJS.ArrayBufferView>(
  fd: number,
  buffer: TBuffer,
  offset: number | undefined | null
): Observable<[written: number, buffer: TBuffer]>;
export function write<TBuffer extends NodeJS.ArrayBufferView>(
  fd: number,
  buffer: TBuffer
): Observable<[written: number, buffer: TBuffer]>;
export function write(
  fd: number,
  string: any,
  position: number | undefined | null,
  encoding: string | undefined | null
): Observable<[written: number, str: string]>;
export function write(
  fd: number,
  string: any,
  position: number | undefined | null
): Observable<[written: number, str: string]>;
export function write(
  fd: number,
  string: any
): Observable<[written: number, str: string]>;
export function write(
  fd: number,
  buffer: Buffer | Uint8Array | any,
  offset?: number | undefined | null,
  length?: number | undefined | null | string,
  position?: number | undefined | null
): Observable<[written: number, buffer: Buffer | Uint8Array | string]> {
  return observablify<
    [
      fd: number,
      buffer: Buffer | Uint8Array | any,
      offset?: number | undefined | null,
      length?: number | undefined | null | string,
      position?: number | undefined | null
    ],
    [written: number, buffer: Buffer | Uint8Array | string]
  >(originalWrite)(fd, buffer, offset, length, position);
}

export function writeFile(
  path: PathLike | number,
  data: any,
  options: WriteFileOptions
): Observable<void>;
export function writeFile(path: PathLike | number, data: any): Observable<void>;
export function writeFile(
  path: PathLike | number,
  data: any,
  options?:
    | { encoding?: string | null; mode?: number | string; flag?: string }
    | string
    | undefined
    | null
): Observable<void> {
  return observablify<
    [
      path: PathLike | number,
      data: any,
      options?:
        | { encoding?: string | null; mode?: number | string; flag?: string }
        | string
        | undefined
        | null
    ]
  >(originalWriteFile)(path, data, options);
}
