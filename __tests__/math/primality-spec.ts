import {Primality} from '../../src/math/primality';

describe('Primality', ()=> {
  const expects = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
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
    for (let p of Primality.max(100)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(25);
  });

  it('sieve', ()=> {
    let index = 0;
    for (let p of Primality.sieveA(1)) {
      ++index;
    }
    expect(index).toBe(0);

    index = 0;
    for (const p of Primality.sieveA(expects[expects.length - 1])) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(expects.length);

    const p1 = Primality.sieveA(10000);
    const p2 = Primality.sieveE(10000);
    while (true) {
      const r1 = p1.next();
      const r2 = p2.next();
      if (!r1.done) {
        expect(r2.done).toBe(r1.done);
        break;
      }

      expect(r2.value).toBe(r1.value);
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
