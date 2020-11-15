/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import {Primality} from '../../src/math/primality';

describe('Primality', ()=> {
  const expects = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31
  ];
  it('top', ()=> {
    let index = 0;
    for (let p of Primality.top(7)) {
      expect(p).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(7);
  });

  it('max', ()=> {
    let index = 0;
    for (let p of Primality.max(10)) {
      expect(p).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(4);
  });

  it('isPrime', ()=> {
    expect(false).toEqual(Primality.isPrime(0));
    expect(true).toEqual(Primality.isPrime(2));
    expect(true).toEqual(Primality.isPrime(103));
    expect(false).toEqual(Primality.isPrime(1681));
    expect(true).toEqual(Primality.isPrime(65537));
  });

  it('isBigPrime', ()=> {
    expect(false).toEqual(Primality.isBigPrime(4294967297n));
    expect(true).toEqual(Primality.isBigPrime((1n << 31n) - 1n));
  });
});
