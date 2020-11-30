import { isPromiseLike } from '@rxnode/core';
import { Observable } from 'rxjs';
import { Promise as BluebirdPromise } from 'bluebird';

describe('utils', () => {
  describe('isPromiseLike', () => {
    it('should be truthy', function () {
      expect(
        isPromiseLike(
          new Promise(() => {
            /**/
          })
        )
      ).toEqual(true);
      expect(
        isPromiseLike({
          then: () => {
            /**/
          },
        })
      ).toEqual(true);
      expect(isPromiseLike(BluebirdPromise.delay(1))).toEqual(true);
    });

    it('should be falsy', function () {
      expect(isPromiseLike(new Observable())).toEqual(false);
      expect(isPromiseLike({})).toEqual(false);
    });
  });
});
