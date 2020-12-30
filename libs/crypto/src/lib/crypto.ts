import {
  DSAKeyPairOptions,
  ECKeyPairOptions,
  generateKeyPair as originalGenerateKeyPair,
  pbkdf2 as originalPbkdf2,
  randomBytes as originalRandomBytes,
  randomFill as originalRandomFill,
  RSAKeyPairOptions,
  scrypt as originalScrypt,
  ScryptOptions,
} from 'crypto';
import { observablify } from '@rxnode/core';
import { Observable } from 'rxjs';

export function generateKeyPair(
  type: 'rsa',
  options: RSAKeyPairOptions<'pem', 'pem'>
): Observable<[publicKey: string, privateKey: string]>;
export function generateKeyPair(
  type: 'rsa',
  options: RSAKeyPairOptions<'pem', 'der'>
): Observable<[publicKey: string, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'rsa',
  options: RSAKeyPairOptions<'der', 'pem'>
): Observable<[publicKey: Buffer, privateKey: string]>;
export function generateKeyPair(
  type: 'rsa',
  options: RSAKeyPairOptions<'der', 'der'>
): Observable<[publicKey: Buffer, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'dsa',
  options: DSAKeyPairOptions<'pem', 'pem'>
): Observable<[publicKey: string, privateKey: string]>;
export function generateKeyPair(
  type: 'dsa',
  options: DSAKeyPairOptions<'pem', 'der'>
): Observable<[publicKey: string, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'dsa',
  options: DSAKeyPairOptions<'der', 'pem'>
): Observable<[publicKey: Buffer, privateKey: string]>;
export function generateKeyPair(
  type: 'dsa',
  options: DSAKeyPairOptions<'der', 'der'>
): Observable<[publicKey: Buffer, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'ec',
  options: ECKeyPairOptions<'pem', 'pem'>
): Observable<[publicKey: string, privateKey: string]>;
export function generateKeyPair(
  type: 'ec',
  options: ECKeyPairOptions<'pem', 'der'>
): Observable<[publicKey: string, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'ec',
  options: ECKeyPairOptions<'der', 'pem'>
): Observable<[publicKey: Buffer, privateKey: string]>;
export function generateKeyPair(
  type: 'ec',
  options: ECKeyPairOptions<'der', 'der'>
): Observable<[publicKey: Buffer, privateKey: Buffer]>;
export function generateKeyPair(
  type: 'rsa' | 'dsa' | 'ec',
  options:
    | RSAKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
    | DSAKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
    | ECKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
): Observable<[publicKey: string | Buffer, privateKey: string | Buffer]> {
  return observablify<
    [
      type: 'rsa' | 'dsa' | 'ec',
      options:
        | RSAKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
        | DSAKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
        | ECKeyPairOptions<'pem' | 'der', 'pem' | 'der'>
    ],
    [publicKey: string | Buffer, privateKey: string | Buffer]
  >(originalGenerateKeyPair)(type, options);
}

export function pbkdf2(
  password: string | Buffer | NodeJS.TypedArray | DataView,
  salt: string | Buffer | NodeJS.TypedArray | DataView,
  iterations: number,
  keylen: number,
  digest: string
): Observable<Buffer> {
  return observablify(originalPbkdf2)(
    password,
    salt,
    iterations,
    keylen,
    digest
  );
}

export function randomBytes(size: number): Observable<Buffer> {
  return observablify(originalRandomBytes)(size);
}

export function randomFill<T extends Buffer | NodeJS.TypedArray | DataView>(
  buffer: T
): Observable<T>;
export function randomFill<T extends Buffer | NodeJS.TypedArray | DataView>(
  buffer: T,
  offset: number
): Observable<T>;
export function randomFill<T extends Buffer | NodeJS.TypedArray | DataView>(
  buffer: T,
  offset: number,
  size: number
): Observable<T>;
export function randomFill<T extends Buffer | NodeJS.TypedArray | DataView>(
  buffer: T,
  offset?: number,
  size?: number
): Observable<T> {
  return observablify<[buffer: T, offset?: number, size?: number], [buf: T]>(
    originalRandomFill
  )(buffer, offset, size);
}

export function scrypt(
  password: string | Buffer | NodeJS.TypedArray | DataView,
  salt: string | Buffer | NodeJS.TypedArray | DataView,
  keylen: number
): Observable<Buffer>;
export function scrypt(
  password: string | Buffer | NodeJS.TypedArray | DataView,
  salt: string | Buffer | NodeJS.TypedArray | DataView,
  keylen: number,
  options: ScryptOptions
): Observable<Buffer>;
export function scrypt(
  password: string | Buffer | NodeJS.TypedArray | DataView,
  salt: string | Buffer | NodeJS.TypedArray | DataView,
  keylen: number,
  options?: ScryptOptions
): Observable<Buffer> {
  return observablify(originalScrypt)(password, salt, keylen, options);
}
