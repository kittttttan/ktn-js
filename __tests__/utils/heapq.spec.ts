import { expect, test } from 'vitest'
import { bisect_left, bisect_right, insort_left, insort_right } from '../../src/utils/bisect'

test("bisect", () => {
  const a = [0, 1, 1, 2];
  expect(1).toBe(bisect_left(a, 1));
  expect(3).toBe(bisect_right(a, 1));

  insort_left(a, 2);
  [0, 1, 1, 2, 2].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });

  insort_right(a, 0);
  [0, 0, 1, 1, 2, 2].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });

  insort_right(a, 2);
  [0, 0, 1, 1, 2, 2, 2].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });
});
