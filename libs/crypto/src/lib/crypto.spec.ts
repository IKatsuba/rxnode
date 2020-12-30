import {
  generateKeyPair,
  pbkdf2,
  randomBytes,
  randomFill,
  scrypt,
} from './crypto';

describe('crypto', () => {
  it('generateKeyPair', async () => {
    expect(
      await generateKeyPair('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'spki',
          format: 'pem',
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem',
          cipher: 'aes-256-cbc',
          passphrase: 'top secret',
        },
      }).toPromise()
    ).toEqual([expect.any(String), expect.any(String)]);
  });

  it('pbkdf2', async () => {
    expect(
      await pbkdf2('secret', 'salt', 100000, 64, 'sha512').toPromise()
    ).toEqual(expect.any(Buffer));
  });

  it('randomBytes', async () => {
    expect(await randomBytes(256).toPromise()).toEqual(expect.any(Buffer));
  });

  it('randomFill', async () => {
    expect(await randomFill(Buffer.alloc(10), 5, 5).toPromise()).toEqual(
      expect.any(Buffer)
    );
  });

  it('scrypt', async () => {
    expect(await scrypt('secret', 'salt', 64).toPromise()).toEqual(
      expect.any(Buffer)
    );
  });
});
