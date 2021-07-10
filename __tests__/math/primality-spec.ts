import {Primality} from '../../src/math/primality';

describe('Primality', ()=> {
  const expects = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31
  ];
  it('top', ()=> {
    let index = 0;
    for (let p of Primality.top(7)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(7);
  });

  it('max', ()=> {
    let index = 0;
    for (let p of Primality.max(10)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(4);
  });

  it('sieveMax', ()=> {
    let index = 0;
    for (let p of Primality.sieveMax(1)) {
      ++index;
    }
    expect(0).toBe(index);

    index = 0;
    for (let p of Primality.sieveMax(expects.length)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
  });

  it('isPrime', ()=> {
    expect(false).toBe(Primality.isPrime(0));
    expect(true).toBe(Primality.isPrime(2));
    expect(true).toBe(Primality.isPrime(103));
    expect(false).toBe(Primality.isPrime(1681));
    expect(true).toBe(Primality.isPrime(65537));
  });

  it('isBigPrime', ()=> {
    expect(false).toBe(Primality.isBigPrime(4294967297n));
    expect(true).toBe(Primality.isBigPrime((1n << 31n) - 1n));
  });

  it('factorization', ()=> {
    expect([]).toStrictEqual(Primality.factorization(1));
    expect([2]).toStrictEqual(Primality.factorization(2));
    expect([2, 2, 2, 2]).toStrictEqual(Primality.factorization(1 << 4));
    expect([17, 59, 997]).toStrictEqual(Primality.factorization(999991));
  });
});
