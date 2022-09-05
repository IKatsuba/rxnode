# Rxnode

## Rxnode — reactive nodejs API

![](.gitbook/assets/image%20%281%29.png)

At the beginning of 2020, my career as a frontend developer turned in an unexpected direction for me. I haven't written a single Angular component in a year. I Replaced Angular with server code and code for the CLI. It was a new and interesting experience for me, but it wasn't easy to solve my usual tasks without RxJS.

Let's look at a simple example of reading and writing a file using the native features of nodejs

```typescript
import { readFile, writeFile } from 'fs';

readFile('src/some-file.js', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  writeFile('src/some-file.js', data, (error) => {
    if (error) {
      console.error(error);
      return;
    }

    console.log('Success!');
  });
});
```

Code with callbacks after Angular seems complicated. First, I translated callbacks to promises.

```typescript
import * as fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('src/some-file.js')
  .then((data) => writeFile('src/some-file.js', data))
  .then(() => {
    console.log('Success!');
  })
  .cacth(console.error);
```

I was OK with this solution until I needed to implement several tasks' competitive execution with a limit. RxJS has such an opportunity out of the box. Why would I invent my own algorithm on promises?

The `promisify` function is replaced by the `bindNodeCallback` function, which RxJS itself supplies.

```typescript
import * as fs from 'fs';
import { bindNodeCallback, Observable } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

const readFile = bindNodeCallback(fs.readFile);
const writeFile = bindNodeCallback(fs.writeFile);

let files: Observable<string>;
const LIMIT = 2;

files
  .pipe(
    mergeMap(
      (file) => someProcessWithFiles(file),
      LIMIT
  )
  .subscribe({
    complete() {
      console.log('Complete!');
    },
  });
```

It quickly became apparent that you need to import and wrap the API in each file or move it to the library at the project level. And when there was more than one such project, I decided to put my developments in separate packages with the `@rxnode` scopes and published [the GitHub code](https://github.com/IKatsuba/rxnode).

The project is NX Workspace. Each core package from nodejs corresponds to one library in a scope. If you want to use the `fs` package, you import functions with the same names from the`@rxnode/fs` packages.

```typescript
import { readFile, writeFile } from '@rxnode/fs';
import { switchMap } from 'rxjs/operators';

readFile('src/some-file.js')
  .pipe(switchMap((data) => writeFile('src/some-file.js', data)))
  .subscribe({
    complete() {
      console.log('Complete!');
    },
  });
```

This is how you can start a simple server.

```typescript
import { createServer } from '@rxnode/http';

const server = createServer();

server.subscribe(([req, res]) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

server.listen(8080).subscribe();
```

Currently, Rxnode contains only 4 packages out of 20 planned. An up-to-date list can be found in the [documentation](https://rxnode.gitbook.io/docs/). We will be glad to receive any help in project development! We need your ideas and your hands!

### About logo

The Rxnode logo features an [axolotl](https://en.wikipedia.org/wiki/Axolotl). And this is the merit of my wife, for which many thanks to her!

While working on the library, she looked at the RxJS logo and asked me, "Is this an axolotl?" When I replied negatively, she suggested depicting the axolotl on the Rxnode logo in Node.js shades. So I did!

{% embed url="https://medium.com/rxnode/rxnode-reactive-nodejs-api-f32c8e02e295" %}

## Packages

- [x] [child_process](libs/child-process.md)
- [ ] cluster
- [x] [crypto](libs/crypto.md)
- [ ] dns
- [ ] events
- [x] [fs](libs/fs.md)
- [x] [http](libs/http.md)
- [ ] http2
- [ ] https
- [ ] inspector
- [ ] net
- [ ] process
- [ ] readline
- [ ] repl
- [ ] stream
- [ ] tls
- [ ] tty
- [ ] dgram
- [ ] util
- [ ] worker_threads

## We are supported by

[![](.gitbook/assets/gitbook.svg)](https://www.gitbook.com/)[![](.gitbook/assets/jetbrains-variant-2.png)](https://www.jetbrains.com/?from=rxnode)
