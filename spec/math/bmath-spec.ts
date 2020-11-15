/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import {BMath} from '../../src/math/bmath';

describe('bmath', ()=> {

  it('abs', ()=> {
    expect(0n).toEqual(BMath.abs(0n));
    expect(1n).toEqual(BMath.abs(1n));
    expect(1n).toEqual(BMath.abs(-1n));
  });

  it('gcd', ()=> {
    expect(4n).toEqual(BMath.gcd(12n, 8n));
    expect(3n).toEqual(BMath.gcd(123n, 321n));
    expect(10n).toEqual(BMath.gcd(10n ** 64n, 1234567890n));
  });

  it('isqrt', ()=> {
    expect(10n).toEqual(BMath.isqrt(100n));
    expect(77n).toEqual(BMath.isqrt(6000n));
    expect(10n ** 32n).toEqual(BMath.isqrt(10n ** 64n));
    expect(1234567890n).toEqual(BMath.isqrt(1234567890n ** 2n));
  });

  it('rootNth', ()=> {
    expect(10n).toEqual(BMath.rootNth(100n, 2n));
    expect(100n).toEqual(BMath.rootNth(1000000n, 3n));
    expect(77n).toEqual(BMath.rootNth(470000n, 3n));
    expect(10n ** 8n).toEqual(BMath.rootNth(10n ** 64n, 8n));
  });

});
