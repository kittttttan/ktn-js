import { expect, test } from 'vitest'
import {
  range, string, stringRange,
  zip, chain, chunk,
  take, takeWhile, skip,
  filter, map, each, enumerate,
  fold, reduce, sum,
  any, all,
} from '../../src/utils/iter'

test("range", () => {
  let index = 0;
  for (let i of range(7)) {
    expect(i).toBe(index);
    ++index;
  }
  expect(7).toBe(index);
  index = 3;
  for (let i of range(3, 7)) {
    expect(i).toBe(index);
    ++index;
  }
  expect(7).toBe(index);
  index = 7;
  for (let i of range(7, 0, -2)) {
    expect(i).toBe(index);
    index -= 2;
  }
  expect(-1).toBe(index);

  expect([...range(1)]).toStrictEqual([0]);
  expect([...range(1, 0)]).toStrictEqual([1]);
  expect([...range(1, 0, 1)]).toStrictEqual([]);
  expect([...range(0, 1, -1)]).toStrictEqual([]);
  expect([...range(undefined, 1)]).toStrictEqual([0]);
});

test("zip", () => {
  expect([...zip()]).toStrictEqual([]);

  let v1 = 0;
  let v2 = 7;
  for (let vs of zip(range(7), range(7, 0, -2))) {
    expect(v1).toBe(vs[0]);
    expect(v2).toBe(vs[1]);
    v1 += 1;
    v2 += -2;
  }
  expect(v1).toBe(4);
});

test("take", () => {
  let i = 0;
  for (let n of take(range(), 3)) {
    expect(n).toBe(i);
    i++;
  }
  expect(i).toBe(3);

  i = 0;
  for (let n of takeWhile(range(10), (v) => v < 3)) {
    expect(n).toBe(i);
    i++;
  }
  expect(i).toBe(3);
});

test("skip", () => {
  let i = 10;
  for (let n of take(skip(range(), 10), 3)) {
    expect(n).toBe(i);
    i++;
  }
  expect(i).toBe(13);
});

test("filter", () => {
  function* a() {
    yield* [0, 1, 0, 3, false, true];
  }
  const b = [1, 3, true];
  let i = 0;
  for (let n of filter(a())) {
    expect(n).toBe(b[i]);
    i++;
  }

  const c = [false, true];
  i = 0;
  for (let n of filter(a(), (v) => typeof v === 'boolean')) {
    expect(n).toBe(c[i]);
    i++;
  }
});

test("map", () => {
  function* a() {
    yield* [1, 2, 3];
  }
  const b = [1, 4, 9];
  let i = 0;
  for (let n of map(a(), (n) => n * n)) {
    expect(n).toBe(b[i]);
    i++;
  }
});

test("each", () => {
  function* a() {
    yield* [1, 3, 5];
  }
  const b = [1, 3, 5];
  const c = [0, 1, 2];
  each(a(), (n, i) => {
    expect(n).toBe(b[i]);
    expect(i).toBe(c[i]);
  });
});

test("enumerate", () => {
  const a = [1, 3, 5];
  let i = 0;
  for (let [index, n] of enumerate(range(1, 7, 2))) {
    expect(index).toBe(i);
    expect(n).toBe(a[i]);
    i++;
  }
});

test("chain", () => {
  const a = [0, 1, 2, 3, 2, 1];
  let i = 0;
  for (const n of chain(range(0, 3, 1), range(3, 0, -1))) {
    expect(n).toBe(a[i]);
    i++;
  }
});

test("chunk", () => {
  const a = [[0, 1], [2, 3], [4]];
  let i = 0;
  for (const n of chunk(range(5), 2)) {
    expect(n).toStrictEqual(a[i]);
    i++;
  }

  expect([...chunk(range(5), 0)]).toStrictEqual([]);
});

test("string", () => {
  const a = ['a', 'b', 'c'];
  let i = 0;
  for (const c of string('abc')) {
    expect(c).toBe(a[i]);
    i++;
  }
});

test("stringRange", () => {
  const a = ['a', 'b', 'c'];
  let i = 0;
  for (const c of stringRange('a', 'c')) {
    expect(c).toBe(a[i]);
    i++;
  }
});

test("any", () => {
  function* a() {
    yield* [false, 0, ''];
  }
  expect(any(a())).toBe(false);

  function* b() {
    yield* [false, 0, '', 1];
  }
  expect(any(b())).toBe(true);
});

test("all", () => {
  function* a() {
    yield* [false, 0, ''];
  }
  expect(all(a())).toBe(false);

  function* b() {
    yield* [false, 0, '', 1];
  }
  expect(all(b())).toBe(false);

  function* c() {
    yield* [true, -1, 'a', 1.23];
  }
  expect(all(c())).toBe(true);
});

test("fold", () => {
  expect(fold(10, range(3), (a, v) => a - v)).toBe(7);
});

test("reduce", () => {
  expect(reduce(range(3), (a, v) => a - v)).toBe(-3);
});

test("sum", () => {
  expect(sum(range(3))).toBe(3);
});
