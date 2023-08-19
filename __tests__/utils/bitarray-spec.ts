import {BitArray} from '../../src/utils/bitarray';

describe("bitarray", ()=> {
  it("bitarray", ()=> {
    const a = new BitArray(64);
    expect('0'.repeat(64)).toBe(a.toString());

    a.set(0, true);
    expect(true).toBe(a.get(0));
    expect('0'.repeat(63) + '1').toBe(a.toString());

    a.set(0, false);
    expect(false).toBe(a.get(0));
    expect('0'.repeat(64)).toBe(a.toString());

    a.set(63, true);
    expect(true).toBe(a.get(63));
    expect('1' + '0'.repeat(63)).toBe(a.toString());

    a.set(63, false);
    expect(false).toBe(a.get(63));
    expect('0'.repeat(64)).toBe(a.toString());

    a.toggle(0);
    expect(true).toBe(a.get(0));
    expect('0'.repeat(63) + '1').toBe(a.toString());

    a.toggle(0);
    expect(false).toBe(a.get(0));
    expect('0'.repeat(64)).toBe(a.toString());

    a.toggle(63);
    expect(true).toBe(a.get(63));
    expect('1' + '0'.repeat(63)).toBe(a.toString());

    a.toggle(63);
    expect(false).toBe(a.get(63));
    expect('0'.repeat(64)).toBe(a.toString());
  });
});
