# fs

### `access`

```typescript
function(path: PathLike, mode?: number): Observable<void>
```

Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. Check [File access constants](https://nodejs.org/docs/latest-v12.x/api/fs.html#fs_file_access_constants) for possible values of `mode`. It is possible to create a mask consisting of the bitwise OR of two or more values \(e.g. `fs.constants.W_OK | fs.constants.R_OK`\).

The following examples check if `package.json` exists and if it is readable or writable.

```typescript
import { access } from '@rxnode/fs';

const file = 'package.json';

// Check if the file exists in the current directory.
access(file, fs.constants.F_OK).subscribe({
  next() {
    console.log(`${file} exists`);
  },
  error(err) {
    console.log(`${file} does not exist`);
  },
});

// Check if the file is readable.
access(file, fs.constants.R_OK).subscribe({
  next() {
    console.log(`${file} is readable`);
  },
  error(err) {
    console.log(`${file} is not readable`);
  },
});

// Check if the file is writable.
access(file, fs.constants.W_OK).subscribe({
  next() {
    console.log(`${file} is writable`);
  },
  error(err) {
    console.log(`${file} is not writable`);
  },
});

// Check if the file exists in the current directory, and if it is writable.
access(file, fs.constants.F_OK | fs.constants.W_OK).subscribe({
  next() {
    console.log(`${file} exists, and it is writable`);
  },
  error(err) {
    console.error(
      `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`
    );
  },
});
```

Do not use `access()` to check for the accessibility of a file before calling `open()`, `readFile()` or `writeFile()`. Doing so introduces a race condition since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if it is not accessible.

**write \(NOT RECOMMENDED\)**

```typescript
import { access, open } from '@rxnode/fs';

access('myfile').subscribe({
  next() {
    console.error('myfile already exists');
  },
  error() {
    open('myfile', 'wx').subscribe((fd) => {
      writeMyData(fd);
    });
  },
});
```

**write \(RECOMMENDED\)**

```typescript
import { open } from '@rxnode/fs';

open('myfile', 'wx').subscribe((fd) => writeMyData(fd));
```

**read \(NOT RECOMMENDED\)**

```typescript
import { access, open } from '@rxnode/fs';

access('myfile').subscribe(() => {
  open('myfile', 'r').subscribe((fb) => readMyData(fd));
});
```

**read \(RECOMMENDED\)**

```typescript
import { open } from '@rxnode/fs';

open('myfile', 'r').subscribe((fd) => {
  readMyData(fd);
});
```

The "not recommended" examples above check for accessibility and then use the file; the "recommended" examples are better because they use the file directly and handle the error if any.

In general, check for the accessibility of a file only if the file will not be used directly, for example when its accessibility is a signal from another process.

On Windows, access-control policies \(ACLs\) on a directory may limit access to a file or directory. The `fs.access()` function, however, does not check the ACL and therefore may report that a path is accessible even if the ACL restricts the user from reading or writing to it.
