import { join } from 'path';
import { readdir, readFile, watch, writeFile } from './fs';
import { take } from 'rxjs/operators';

describe('fs', () => {
  describe('readdir', () => {
    it('should read a current directory', async () => {
      expect.assertions(1);

      expect(
        await readdir(join(__dirname, '__fixtures__')).toPromise()
      ).toEqual(['some-file.txt']);
    });
  });
  describe('watchFile', () => {
    let originalFileContent: string;
    let fileName: string;

    beforeAll(async () => {
      fileName = join(__dirname, '__fixtures__/some-file.txt');
      originalFileContent = (await readFile(fileName).toPromise()).toString();
    });

    it('should watch the file', async () => {
      expect.assertions(1);

      const watchedPromise = watch(
        join(__dirname, '__fixtures__/some-file.txt')
      )
        .pipe(take(1))
        .toPromise();

      await writeFile(
        join(__dirname, '__fixtures__/some-file.txt'),
        originalFileContent
      ).toPromise();

      expect(await watchedPromise).toEqual(['change', 'some-file.txt']);
    });
  });
});
