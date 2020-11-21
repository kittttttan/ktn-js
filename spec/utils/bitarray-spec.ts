/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import {BitArray} from '../../src/utils/bitarray';

describe("bitarray", ()=> {

  it("bitarray", ()=> {
    const a = new BitArray(64);
    expect('0'.repeat(64)).toEqual(a.toString());

    a.set(0, true);
    expect(true).toEqual(a.get(0));
    expect('0'.repeat(63) + '1').toEqual(a.toString());

    a.set(0, false);
    expect(false).toEqual(a.get(0));
    expect('0'.repeat(64)).toEqual(a.toString());

    a.set(63, true);
    expect(true).toEqual(a.get(63));
    expect('1' + '0'.repeat(63)).toEqual(a.toString());

    a.set(63, false);
    expect(false).toEqual(a.get(63));
    expect('0'.repeat(64)).toEqual(a.toString());
  });

});
