import { observablify } from './observablify';

function completeFn(
  str: string,
  num: number,
  callback: (err: Error, result?: 'done') => void
) {
  callback(null, 'done');
}

function failFn(
  num: number,
  str: string,
  callback: (err: Error, result?: 'done') => void
) {
  callback(new Error('error'));
}

describe('observablify', () => {
  it('should be', async () => {
    expect.assertions(1);

    const a = observablify(completeFn);

    expect(await a('1', 1).toPromise()).toEqual(['done']);
  });

  it('should be', async () => {
    expect.assertions(1);

    const a = observablify(failFn);

    expect(
      await a(1, '1')
        .toPromise()
        .catch((err) => err)
    ).toEqual(new Error('error'));
  });
});
