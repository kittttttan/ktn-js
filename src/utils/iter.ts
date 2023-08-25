import type {Np, float} from '../types';

/**
 * range like python3
 */
export function* range(start: float, end?: float, step?: float): Generator<number> {
  if (step === 0) {
    throw new Error('range() arg 3 must not be zero');
  }

  start = +start;
  if (typeof step === 'undefined') {
    step = 1;
  }
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  end = +end;
  step = +step;

  if (step > 0) {
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
}

export function* zip(...iterables: Generator<any>[]): Generator<any> {
  if (iterables.length === 0) {
    return;
  }

  const iters: Generator<any>[] = iterables.map((i: Generator<any>): Generator<any> => i[Symbol.iterator]());
  while (true) {
    const entries: IteratorResult<any>[] = iters.map((i: Generator<any>): any => i.next());
    const done: boolean = entries.some((entry: IteratorResult<any>): boolean => !!entry.done);
    if (done) {
      break;
    }
    yield entries.map((entry: IteratorResult<any>): any => entry.value);
  }
}

export function* take<T>(g: Generator<T>, n: Np, offset = 0): Generator<T> {
  for (const v of g) {
    if (n-- <= 0) {
      return;
    }
    if (offset-- <= 0) {
      yield v;
    }
  }
}

export function* takeWhile<T>(g: Generator<T>, f: (a: T) => boolean): Generator<any> {
  for (const v of g) {
    if (!f(v)) {
      return;
    }

    yield v;
  }
}

export function* filter<T>(g: Generator<T>, f: (a: T) => boolean): Generator<any> {
  for (const v of g) {
    if (f(v)) {
      yield v;
    }
  }
}

export function* map<T>(g: Generator<T>, f: (a: T) => unknown): Generator<unknown> {
  for (const v of g) {
    yield f(v);
  }
}
