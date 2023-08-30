import {
  range, zip,
  take, takeWhile,
  filter, map
} from '../../src/utils/iter';

describe("iter", () => {
  it("range", () => {
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

    expect([...range(1, 0)]).toStrictEqual([]);
    expect([...range(0, 1, -1)]).toStrictEqual([]);

    expect(() => [...range(0, 1, 0)]).toThrow(new Error('range() arg 3 must not be zero'));
  });

  it("zip", () => {
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

  it("take", () => {
    let i = 0;
    for (let n of take(range(10), 3)) {
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

  it("filter", () => {
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

  it("map", () => {
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
});
