import {
  exec as originalExec,
  execFile as originalExecFile,
  ExecFileOptions,
  ExecFileOptionsWithBufferEncoding,
  ExecFileOptionsWithOtherEncoding,
  ExecFileOptionsWithStringEncoding,
  ExecOptions,
} from 'child_process';
import { observablify } from '@rxnode/core';
import { Observable } from 'rxjs';

export function exec(
  command: string
): Observable<[stdout: string, stderr: string]>;
export function exec(
  command: string,
  options: { encoding: 'buffer' | null } & ExecOptions
): Observable<[stdout: Buffer, stderr: Buffer]>;
export function exec(
  command: string,
  options: { encoding: BufferEncoding } & ExecOptions
): Observable<[stdout: string, stderr: string]>;
export function exec(
  command: string,
  options: { encoding: string } & ExecOptions
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function exec(
  command: string,
  options: ExecOptions
): Observable<[stdout: string, stderr: string]>;
export function exec(
  command: string,
  options: ({ encoding?: string | null } & ExecOptions) | undefined | null
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function exec(
  command: string,
  options?: {
    encoding?: string | BufferEncoding | null | 'buffer';
  } & ExecOptions
): Observable<[stdout: string | Buffer, stderr: string | Buffer]> {
  return observablify<
    [
      command: string,
      options?: {
        encoding?: string | BufferEncoding | null | 'buffer';
      } & ExecOptions
    ],
    [stdout: string | Buffer, stderr: string | Buffer]
  >(originalExec)(command, options);
}

export function execFile(
  file: string
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  options: ExecFileOptionsWithBufferEncoding
): Observable<[stdout: Buffer, stderr: Buffer]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null,
  options: ExecFileOptionsWithBufferEncoding
): Observable<[stdout: Buffer, stderr: Buffer]>;
export function execFile(
  file: string,
  options: ExecFileOptionsWithStringEncoding
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null,
  options: ExecFileOptionsWithStringEncoding
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  options: ExecFileOptionsWithOtherEncoding
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null,
  options: ExecFileOptionsWithOtherEncoding
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function execFile(
  file: string,
  options: ExecFileOptions
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null,
  options: ExecFileOptions
): Observable<[stdout: string, stderr: string]>;
export function execFile(
  file: string,
  options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function execFile(
  file: string,
  args: ReadonlyArray<string> | undefined | null,
  options: ({ encoding?: string | null } & ExecFileOptions) | undefined | null
): Observable<[stdout: string | Buffer, stderr: string | Buffer]>;
export function execFile(
  file: string,
  args?:
    | ReadonlyArray<string>
    | ({ encoding?: string | null | BufferEncoding } & ExecFileOptions)
    | undefined
    | null,
  options?:
    | ({ encoding?: string | null | BufferEncoding } & ExecFileOptions)
    | undefined
    | null
): Observable<[stdout: string | Buffer, stderr: string | Buffer]> {
  return observablify<
    [
      file: string,
      args?:
        | ReadonlyArray<string>
        | ({ encoding?: string | null | BufferEncoding } & ExecFileOptions)
        | undefined
        | null,
      options?:
        | ({ encoding?: string | null | BufferEncoding } & ExecFileOptions)
        | undefined
        | null
    ],
    [stdout: string | Buffer, stderr: string | Buffer]
  >(originalExecFile)(file, args, options);
}
