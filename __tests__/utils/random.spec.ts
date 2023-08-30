import { expect, test } from 'vitest'
import { Random } from '../../src/utils/random'

test("random", () => {
  const r = new Random();

  r.init(0);
  expect(r.int32()).toBe(2357136044);
  expect(r.int32()).toBe(2546248239);
  expect(r.int32()).toBe(3071714933);

  r.init(1);
  expect(r.int31()).toBe(895547922);
  expect(r.int31()).toBe(2141438069);
  expect(r.int31()).toBe(1546885062);

  r.initByArray([2]);
  expect(r.real1()).toBe(0.9560342701049601);
  expect(r.real2()).toBe(0.8631093262229115);
  expect(r.real3()).toBe(0.9478274871362373);
});
