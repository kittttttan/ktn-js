import { expect, test } from 'vitest'
import { Uuid } from '../../src/utils/uuid'

test("uuid", () => {
  const u = Uuid.uuid();
  expect(u.version).toBe(4);
  expect(u.variant).toBe(8);

  const str = u.toString();
  expect(str.length).toBe(36);

  const ns = '74c45628-1bd5-4bf8-8df7-0315dd66987d';
  const n = u.fromString(ns);
  expect(n.version).toBe(4);
  expect(n.variant).toBe(8);
  expect(n.toString()).toBe(ns);
});
