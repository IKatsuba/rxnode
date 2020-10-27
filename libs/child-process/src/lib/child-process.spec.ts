import { join } from 'path';
import { exec, execFile } from './child-process';

describe('childProcess', () => {
  describe('exec', () => {
    it('should exec a command', async () => {
      expect.assertions(1);

      const [stdout] = await exec(`echo 'Hi there!'`).toPromise();

      expect(stdout.toString().trim()).toEqual('Hi there!');
    });
  });

  describe('execFile', () => {
    it('should exec a file', async () => {
      expect.assertions(1);

      const [stdout] = await execFile(
        join(__dirname, '__fixtures__/file-for-exec')
      ).toPromise();

      expect(stdout.toString().trim()).toEqual('Hi there!');
    });
  });
});
