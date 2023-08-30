import { expect, test } from 'vitest'
import { fibonacci, fib, bigFibonacci, bigFib } from '../../src/math/sequence/fib'
import { take, takeWhile } from '../../src/utils/iter'

const expects = [
  0, 1, 1, 2, 3, 5, 8, 13, 21, 34,
  55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765,
];
test("fibonacci", () => {
  let index = 0;
  for (const i of take(fibonacci(), 10)) {
    expect(i).toBe(expects[index]);
    ++index;
  }
  expect(index).toBe(10);

  index = 0;
  for (const i of takeWhile(fibonacci(), (n) => n <= 100)) {
    expect(i).toBe(expects[index]);
    ++index;
  }
  expect(index).toBe(12);
});

test("fib", () => {
  expect(fib(0)).toBe(expects[0]);
  expect(fib(9)).toBe(expects[9]);
  expect(fib(19)).toBe(expects[19]);
});

test("bigFibonacci", () => {
  let index = 0;
  for (const i of take(bigFibonacci(), 10)) {
    expect(i).toBe(BigInt(expects[index]));
    ++index;
  }
  expect(index).toBe(10);

  index = 0;
  for (const i of takeWhile(bigFibonacci(), (n) => n <= 100)) {
    expect(i).toBe(BigInt(expects[index]));
    ++index;
  }
  expect(index).toBe(12);
});

test("bigFib", () => {
  expect(bigFib(0n)).toBe(BigInt(expects[0]));
  expect(bigFib(9n)).toBe(BigInt(expects[9]));
  expect(bigFib(19n)).toBe(BigInt(expects[19]));
});
