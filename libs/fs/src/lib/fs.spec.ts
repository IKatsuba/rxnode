import { readdir } from './fs';

describe('fs', () => {
  describe('readdir', () => {
    it('should read current directory', async () => {
      expect(await readdir(__dirname).toPromise()).toEqual([
        ['fs.spec.ts', 'fs.ts'],
      ]);
    });
  });
});
