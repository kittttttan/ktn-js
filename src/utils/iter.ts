import type { float } from '../types';

export function* range(start?: float, end?: float, step?: float): Generator<number> {
  if (typeof end === 'undefined') {
    if (typeof start === 'undefined') {
      start = 0;
      end = Number.MAX_SAFE_INTEGER;
    } else {
      end = start;
      start = 0;
    }
  }
  if (typeof start === 'undefined') {
    start = 0;
  }

  if (typeof step === 'undefined') {
    if (start > end) {
      step = -1;
    } else {
      step = 1;
    }
  }

  if (step < 0) {
    for (let i = start; i > end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  }
}

/**
 * 最大 n 個の要素をスキップ
 */
export function skip<T>(g: Generator<T>, n: number): Generator<T> {
  if (n < 1) {
    return g;
  }

  while (n-- > 0) {
    const h = g.next();
    if (h.done) {
      return g;
    }
  }

  return g;
}

/**
 * 最大 n 個の要素を取得
 */
export function* take<T>(g: Generator<T>, n: number): Generator<T> {
  if (n < 1) {
    return;
  }

  while (n-- > 0) {
    const h = g.next();
    if (h.done) {
      return g;
    }

    yield h.value;
  }
}

/**
 * 条件を満たさなくなるまで要素を取得
 */
export function* takeWhile<T>(g: Generator<T>, f: (a: T) => boolean): Generator<T, void> {
  for (const v of g) {
    if (!f(v)) { return; }
    yield v;
  }
}

/**
 * 条件を満たす要素を取得
 */
export function* filter<T>(g: Generator<T>, f = (a: T) => !!a): Generator<T> {
  for (const v of g) {
    if (f(v)) { yield v; }
  }
}

/**
 * 各要素に適用
 */
export function* map<T>(g: Generator<T>, f: (a: T) => unknown): Generator<unknown> {
  for (const v of g) {
    yield f(v);
  }
}

export function each<T>(g: Generator<T>, f: (a: T, i: number) => unknown): void {
  let i = 0;
  for (const v of g) {
    f(v, i);
    i++;
  }
}

/**
 * 結合
 */
export function* zip(...args: Generator[]): Generator<Array<unknown>, void> {
  if (args.length === 0) {
    return;
  }

  for (; ;) {
    const elms: unknown[] = [];
    for (const g of args) {
      const i = g.next();
      if (i.done) {
        return;
      }
      elms.push(i.value);
    }
    yield elms;
  }
}

export function* chain(...args: Generator[]): Generator<unknown, void> {
  for (const g of args) {
    for (const v of g) {
      yield v;
    }
  }
}

export function* chunk<T>(g: Generator<T>, n: number): Generator<T[], void> {
  if (n < 1) {
    return;
  }

  while (true) {
    const a: T[] = [];
    for (let i = 0; i < n; i++) {
      const h = g.next()
      if (h.done) {
        if (a) {
          yield a;
        }
        return;
      }
      a.push(h.value);
    }

    yield a;
  }
}

/**
 * インデックスを付与
 */
export function enumerate<T>(g: Generator<T>): Generator<unknown[]> {
  return zip(range(), g);
}

export function* string(s: string): Generator<string> {
  for (const c of s) {
    yield c;
  }
}

export function* stringRange(s: string, e: string): Generator<string> {
  const r = range(s.charCodeAt(0), e.charCodeAt(0) + 1);
  for (const n of r) {
    yield String.fromCharCode(n);
  }
}

export function fold<T>(init: T, g: Generator<T>, f: (a: T, v: T) => T): T {
  let a = init;
  for (const v of g) {
    a = f(a, v);
  }

  return a;
}

export function reduce<T>(g: Generator<T>, f: (a: T, v: T) => T): T | void {
  const h = g.next();
  if (h.done) {
    return;
  }

  const init = h.value;
  return fold(init, g, f);
}

export function sum(g: Generator<any>): any {
  return reduce(g, (a, b) => a + b);
}

export function any(g: Generator<unknown>): boolean {
  for (; ;) {
    const h = g.next();
    if (h.done) {
      break;
    }

    if (h.value) {
      return true;
    }
  }

  return false;
}

export function all(g: Generator<unknown>): boolean {
  for (; ;) {
    const h = g.next();
    if (h.done) {
      break;
    }

    if (!h.value) {
      return false;
    }
  }

  return true;
}
