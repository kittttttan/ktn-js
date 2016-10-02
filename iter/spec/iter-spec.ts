/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import Iter from '../src/iter';

describe("Iter", ()=> {

  it("range", ()=> {
    let index = 0;
    for (let i of Iter.range(7)) {
      expect(i).toEqual(index);
      ++index;
    }
    expect(7).toEqual(index);
    index = 3;
    for (let i of Iter.range(3, 7)) {
      expect(i).toEqual(index);
      ++index;
    }
    expect(7).toEqual(index);
    index = 7;
    for (let i of Iter.range(7, 0, -2)) {
      expect(i).toEqual(index);
      index -= 2;
    }
    expect(-1).toEqual(index);
  });

  it("zip", ()=> {
    let v1 = 0;
    let v2 = 7;
    for (let vs of Iter.zip(Iter.range(7), Iter.range(7, 0, -2))) {
      expect(v1).toEqual(vs[0]);
      expect(v2).toEqual(vs[1]);
      v1 += 1;
      v2 += -2;
    }
    expect(v1).toEqual(4);
  });

});
