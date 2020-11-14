/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import {BMath} from '../../src/math/bmath';

describe('bmath', ()=> {

  it('abs', ()=> {
    expect(1n).toEqual(BMath.abs(1n));
    expect(1n).toEqual(BMath.abs(-1n));
  });

  it('gcd', ()=> {
    expect(4n).toEqual(BMath.gcd(12n, 8n));
    expect(3n).toEqual(BMath.gcd(123n, 321n));
    expect(1n).toEqual(BMath.gcd(1234n, 4321n));
  });

});
