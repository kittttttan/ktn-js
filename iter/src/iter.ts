'use strict';

export type double = number;

export default class Iter {
  /**
   * range like python3
   * @param {double} start
   * @param {double=} end
   * @param {double=} step
   * @return {!IterableIterator<double>}
   */
  public static range(start: double, end?: double, step?: double): IterableIterator<double> {
    start = +start;
    if (typeof(step) === 'undefined') {
      step = 1;
    }
    if (typeof(end) === 'undefined') {
      end = start;
      start = 0;
    }
    end = +end;
    step = +step;
    return function *(): IterableIterator<double> {
      if (step === 0) {
        throw new Error('range() arg 3 must not be zero');
      } else if (step > 0) {
        if (start > end) {
          end = start;
        }
        while (start < end) {
          yield start;
          start += step;
        }
      } else {
        if (start < end) {
          end = start;
        }
        while (start > end) {
          yield start;
          start += step;
        }
      }
    }();
  }

  /**
   * @param {...Iterable} iterables
   * @return {IterableIterator}
   */
  public static zip(...iterables: Iterable<any>[]): IterableIterator<any> {
    return function *(): IterableIterator<any> {
      if (iterables.length === 0) {
        return [];
      }

      const iters: Iterator<any>[] = iterables.map((i: Iterable<any>): Iterator<any> => i[Symbol.iterator]());
      while (true) {
        const entries: IteratorResult<any>[] = iters.map((i: Iterator<any>): any => i.next());
        const done: boolean = entries.some((entry: IteratorResult<any>): boolean => entry.done);
        if (done) {
          break;
        }
        yield entries.map((entry: IteratorResult<any>): any => entry.value);
      }
    }();
  }
}