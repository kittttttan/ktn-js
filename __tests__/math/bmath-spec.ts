import {abs, gcd, isqrt, rootNth, log10, log2, pollardsRho} from '../../src/math/bmath';

describe('bmath', ()=> {
  it('abs', ()=> {
    expect(abs(0n)).toBe(0n);
    expect(abs(1n)).toBe(1n);
    expect(abs(-1n)).toBe(1n);
  });

  it('gcd', ()=> {
    expect(gcd(2n)).toBe(2n);
    expect(gcd(12n, 8n)).toBe(4n);
    expect(gcd(123n, 321n)).toBe(3n);
    expect(gcd(10n ** 64n, 1234567890n)).toBe(10n);
    expect(gcd(12n, 42n, 60n)).toBe(6n);
  });

  it('isqrt', ()=> {
    expect(isqrt(0n)).toBe(0n);
    expect(isqrt(1n)).toBe(1n);
    expect(isqrt(100n)).toBe(10n);
    expect(isqrt(6000n)).toBe(77n);
    expect(isqrt(10n ** 64n)).toBe(10n ** 32n);
    expect(isqrt(1234567890n ** 2n)).toBe(1234567890n);

    expect(() => isqrt(-1n)).toThrow(new RangeError('a < 0'));
  });

  it('rootNth', ()=> {
    expect(rootNth(0n, 3n)).toBe(0n);
    expect(rootNth(1n, 4n)).toBe(1n);
    expect(rootNth(100n, 2n)).toBe(10n);
    expect(rootNth(1000000n, 3n)).toBe(100n);
    expect(rootNth(470000n, 3n)).toBe(77n);
    expect(rootNth(10n ** 64n, 8n)).toBe(10n ** 8n);

    expect(() => rootNth(-1n)).toThrow(new RangeError('value < 0'));
  });

  it('log', ()=> {
    expect(log10(10n ** 2n)).toBe(2);
    expect(log2(2n ** 3n)).toBe(3);

    expect(() => log10(-1n)).toThrow(new RangeError('a < 0'));
    expect(() => log2(-1n)).toThrow(new RangeError('a < 0'));
  });

  it('rho', ()=> {
    expect(pollardsRho(300077n, 37n)).toBe(109n);
  });
});
