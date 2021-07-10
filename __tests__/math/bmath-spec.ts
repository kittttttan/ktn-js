import {BMath} from '../../src/math/bmath';

describe('bmath', ()=> {

  it('abs', ()=> {
    expect(0n).toBe(BMath.abs(0n));
    expect(1n).toBe(BMath.abs(1n));
    expect(1n).toBe(BMath.abs(-1n));
  });

  it('gcd', ()=> {
    expect(4n).toBe(BMath.gcd(12n, 8n));
    expect(3n).toBe(BMath.gcd(123n, 321n));
    expect(10n).toBe(BMath.gcd(10n ** 64n, 1234567890n));
  });

  it('isqrt', ()=> {
    expect(10n).toBe(BMath.isqrt(100n));
    expect(77n).toBe(BMath.isqrt(6000n));
    expect(10n ** 32n).toBe(BMath.isqrt(10n ** 64n));
    expect(1234567890n).toBe(BMath.isqrt(1234567890n ** 2n));
  });

  it('rootNth', ()=> {
    expect(10n).toBe(BMath.rootNth(100n, 2n));
    expect(100n).toBe(BMath.rootNth(1000000n, 3n));
    expect(77n).toBe(BMath.rootNth(470000n, 3n));
    expect(10n ** 8n).toBe(BMath.rootNth(10n ** 64n, 8n));
  });

});
