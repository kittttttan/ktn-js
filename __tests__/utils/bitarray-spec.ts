import {BitArray} from '../../src/utils/bitarray';

describe("bitarray", ()=> {
  it("-1", ()=> {
    expect(() => new BitArray(-1)).toThrow(new RangeError());
  });

  it("0", ()=> {
    const a = new BitArray(0);
    expect(a.toString()).toBe('');

    expect(() => a.get(0)).toThrow(new RangeError());
    expect(() => a.set(0, true)).toThrow(new RangeError());
    expect(() => a.toggle(0)).toThrow(new RangeError());
  });

  it("8", ()=> {
    const a = new BitArray(8);
    expect(a.toString()).toBe('00000000');

    a.set(0, true);
    expect(a.get(0)).toBe(true);
    expect(a.toString()).toBe('00000001');

    a.toggle(0);
    expect(a.get(0)).toBe(false);
    expect(a.toString()).toBe('00000000');

    a.toggle(0);
    expect(a.get(0)).toBe(true);
    expect(a.toString()).toBe('00000001');

    a.fill(true);
    expect(a.toString()).toBe('11111111');

    a.fill(false);
    expect(a.toString()).toBe('00000000');
  });

  it("64", ()=> {
    const a = new BitArray(64);
    expect(a.toString()).toBe('0'.repeat(64));

    a.set(0, true);
    expect(a.get(0)).toBe(true);
    expect(a.toString()).toBe('0'.repeat(63) + '1');

    a.set(0, false);
    expect(a.get(0)).toBe(false);
    expect(a.toString()).toBe('0'.repeat(64));

    a.set(63, true);
    expect(a.get(63)).toBe(true);
    expect(a.toString()).toBe('1' + '0'.repeat(63));

    a.set(63, false);
    expect(a.get(63)).toBe(false);
    expect(a.toString()).toBe('0'.repeat(64));

    a.toggle(0);
    expect(a.get(0)).toBe(true);
    expect(a.toString()).toBe('0'.repeat(63) + '1');

    a.toggle(0);
    expect(a.get(0)).toBe(false);
    expect(a.toString()).toBe('0'.repeat(64));

    a.toggle(63);
    expect(a.get(63)).toBe(true);
    expect(a.toString()).toBe('1' + '0'.repeat(63));

    a.reverse();
    expect(a.toString()).toBe('0' + '1'.repeat(63));

    a.reverse();
    expect(a.toString()).toBe('1' + '0'.repeat(63));

    a.toggle(63);
    expect(a.get(63)).toBe(false);
    expect(a.toString()).toBe('0'.repeat(64));

    a.fill(true);
    expect(a.toString()).toBe('1'.repeat(64));

    a.fill(false);
    expect(a.toString()).toBe('0'.repeat(64));
  });
});
