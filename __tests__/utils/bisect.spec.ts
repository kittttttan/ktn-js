import { expect, test } from 'vitest'
import { heapify, heappop, heappush } from '../../src/utils/heapq'

test("bisect", () => {
  const a = [3, 5, 1, 6, 2, 4];
  heapify(a);
  [1, 2, 3, 6, 5, 4].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });

  expect(1).toBe(heappop(a));
  expect(2).toBe(heappop(a));
  [3, 4, 5, 6].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });

  heappush(a, 1);
  heappush(a, 2);
  [1, 3, 2, 6, 4, 5].forEach((v, i) => {
    expect(v).toBe(a[i]);
  });
});
