/// <reference path="../../node_modules/@types/jasmine/index.d.ts" />
import {Primality} from '../../src/math/primality';

describe("Primality", ()=> {
  const expects = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31
  ];
  it("top", ()=> {
    let index = 0;
    for (let p of Primality.top(7)) {
      expect(p).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(7);
  });

  it("max", ()=> {
    let index = 0;
    for (let p of Primality.max(10)) {
      expect(p).toEqual(expects[index]);
      ++index;
    }
    expect(index).toEqual(4);
  });

});
