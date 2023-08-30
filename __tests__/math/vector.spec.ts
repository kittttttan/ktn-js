import { expect, test } from 'vitest'
import { Vector } from '../../src/math/vector'

test("norm", () => {
  expect((new Vector(3, 4, 0)).norm()).toBe(5.0);
});

test("add", () => {
  const v = new Vector(1, 2, 3);

  expect(v.add(new Vector(0, 1, -1)).toString()).toBe('(1,3,2)');
});

test("sub", () => {
  const v = new Vector(1, 2, 3);

  expect(v.sub(new Vector(0, 1, -1)).toString()).toBe('(1,1,4)');
});

test("mul", () => {
  const v = new Vector(1, 2, 3);

  expect(v.mul(2).toString()).toBe('(2,4,6)');
});

test("dot", () => {
  const v = new Vector(1, 2, 3);

  expect(v.dot(new Vector(0, 1, -1))).toBe(-1);
});
