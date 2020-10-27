import {
  exec as originalExec,
  execFile as originalExecFile,
  ExecOptions,
  ExecFileOptions,
} from 'child_process';
import { observablify } from '@rxnode/core';

export const exec = observablify<
  [
    command: string,
    options?: {
      encoding?: string | BufferEncoding | null | 'buffer';
    } & ExecOptions
  ],
  [stdout: string | Buffer, stderr: string | Buffer]
>(originalExec);

export const execFile = observablify<
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
>(originalExecFile);
