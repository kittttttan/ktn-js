import {abs, gcd, isqrt, rootNth} from '../../src/math/bmath';

describe('bmath', ()=> {
  it('abs', ()=> {
    expect(0n).toBe(abs(0n));
    expect(1n).toBe(abs(1n));
    expect(1n).toBe(abs(-1n));
  });

  it('gcd', ()=> {
    expect(2n).toBe(gcd(2n));
    expect(4n).toBe(gcd(12n, 8n));
    expect(3n).toBe(gcd(123n, 321n));
    expect(10n).toBe(gcd(10n ** 64n, 1234567890n));
    expect(6n).toBe(gcd(12n, 42n, 60n));
  });

  it('isqrt', ()=> {
    expect(10n).toBe(isqrt(100n));
    expect(77n).toBe(isqrt(6000n));
    expect(10n ** 32n).toBe(isqrt(10n ** 64n));
    expect(1234567890n).toBe(isqrt(1234567890n ** 2n));
  });

  it('rootNth', ()=> {
    expect(10n).toBe(rootNth(100n, 2n));
    expect(100n).toBe(rootNth(1000000n, 3n));
    expect(77n).toBe(rootNth(470000n, 3n));
    expect(10n ** 8n).toBe(rootNth(10n ** 64n, 8n));
  });
});
