import { expect, test } from 'vitest'
import { Quaternion } from '../../src/math/quaternion'

test("conjugate", () => {
  expect((new Quaternion(1, 1, 1, 1)).conjugate()).
    toStrictEqual(new Quaternion(1, -1, -1, -1));
});

test("norm", () => {
  expect((new Quaternion(1, 1, 1, 1)).norm()).toBe(2.0);
});

test("normalize", () => {
  expect((new Quaternion(1, 1, 1, 1)).normalize()).
    toStrictEqual(new Quaternion(0.5, 0.5, 0.5, 0.5));
});

test("inverse", () => {
  expect((new Quaternion(1, 1, 1, 1)).inverse()).
    toStrictEqual(new Quaternion(0.25, 0.25, 0.25, 0.25));
});
