import {primes, sieveA, sieveE, isPrime, isBigPrime, factorization} from '../../src/math/primality';
import {take, takeWhile} from '../../src/utils/iter';

describe('primality', ()=> {
  const expects = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97,
  ];

  it('take', ()=> {
    let index = 0;
    for (let p of take(primes(), 7)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(7);
  });

  it('takeWhile', ()=> {
    let index = 0;
    for (let p of takeWhile(primes(), (n) => n < 100)) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(25);
  });

  it('sieve', ()=> {
    let index = 0;
    for (let p of sieveA(1)) {
      ++index;
    }
    expect(index).toBe(0);

    index = 0;
    for (const p of sieveA(expects[expects.length - 1])) {
      expect(p).toBe(expects[index]);
      ++index;
    }
    expect(index).toBe(expects.length);

    const p1 = sieveA(10000);
    const p2 = sieveE(10000);
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
    expect(isPrime(0)).toBe(false);
    expect(isPrime(2)).toBe(true);
    expect(isPrime(103)).toBe(true);
    expect(isPrime(1681)).toBe(false);
    expect(isPrime(65537)).toBe(true);
  });

  it('isBigPrime', ()=> {
    expect(isBigPrime(4294967297n)).toBe(false);
    expect(isBigPrime((1n << 31n) - 1n)).toBe(true);
  });

  it('factorization', ()=> {
    expect([...factorization(1)]).toStrictEqual([]);
    expect([...factorization(2)]).toStrictEqual([2]);
    expect([...factorization(1 << 4)]).toStrictEqual([2, 2, 2, 2]);
    expect([...factorization(999991)]).toStrictEqual([17, 59, 997]);
  });
});
