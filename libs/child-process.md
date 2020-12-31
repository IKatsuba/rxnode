# child\_process

## `exec`

```typescript
function exec(command: string, options?: {
    encoding?: string | BufferEncoding | null | 'buffer';
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    shell?: string;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
    uid?: number;
    gid?: number;
    windowsHide?: boolean;
}): Observable<[stdout: string | Buffer, stderr: string | Buffer]>
```

Spawns a shell then executes the `command` within that shell, buffering any generated output. The `command` string passed to the exec function is processed directly by the shell, and special characters \(vary based on [shell](https://en.wikipedia.org/wiki/List_of_command-line_interpreters)\) need to be dealt with accordingly:

```typescript
exec('"/path/to/test file/test.sh" arg1 arg2').subscribe();
// Double quotes are used so that the space in the path is not interpreted as
// a delimiter of multiple arguments.

exec('echo "The \\$HOME variable is $HOME"').subscribe();
// The $HOME variable is escaped in the first instance, but not in the second.
```

**Never pass unsanitized user input to this function. Any input containing shell metacharacters may be used to trigger arbitrary command execution.**

The `stdout` and `stderr` arguments passed to the stream will contain the stdout and stderr output of the child process. By default, Node.js will decode the output as UTF-8 and pass strings to the callback. The `encoding` option can be used to specify the character encoding used to decode the stdout and stderr output. If `encoding` is `'buffer'`, or an unrecognized character encoding, `Buffer` objects will be passed to the callback instead.

```typescript
import { exec } from '@rxnode/child_process';

exec('cat *.js missing_file | wc -l').subscribe({
    next([stdout, stderr]) {
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    },
    error(error) {
      console.error(`exec error: ${error}`);
    }
});
```

If `timeout` is greater than `0`, the parent will send the signal identified by the `killSignal` property \(the default is `'SIGTERM'`\) if the child runs longer than `timeout` milliseconds.

Unlike the [`exec(3)`](http://man7.org/linux/man-pages/man3/exec.3.html) POSIX system call, `exec()` does not replace the existing process and uses a shell to execute the command.

### `execFile`

```typescript
function execFile(file: string, args?: readonly string[], options?: {
    encoding?: string | null | BufferEncoding;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
    uid?: number;
    gid?: number;
    windowsHide?: boolean;
    windowsVerbatimArguments?: boolean;
    shell?: boolean | string;
}): Observable<[stdout: string | Buffer, stderr: string | Buffer]>
```

The `execFile()` function is similar to [`exec()`](child-process.md#exec) except that it does not spawn a shell by default. Rather, the specified executable `file` is spawned directly as a new process making it slightly more efficient than [`exec()`](child-process.md#exec).

The same options as [`exec()`](child-process.md#exec) are supported. Since a shell is not spawned, behaviors such as I/O redirection and file globbing are not supported.

```typescript
import { execFile } from '@rxnode/child_process';

execFile('node', ['--version']).subscribe({
    next([stdout, stderr]) {
      console.log(stdout);
    },
    error(error) {
      console.error(`exec error: ${error}`);
    }
});
```

The `stdout` and `stderr` arguments passed to the stream will contain the stdout and stderr output of the child process. By default, Node.js will decode the output as UTF-8 and pass strings to the callback. The `encoding` option can be used to specify the character encoding used to decode the stdout and stderr output. If `encoding` is `'buffer'`, or an unrecognized character encoding, `Buffer` objects will be passed to the callback instead.

**If the `shell` option is enabled, do not pass unsanitized user input to this function. Any input containing shell metacharacters may be used to trigger arbitrary command execution.**

