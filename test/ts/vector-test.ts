/// <reference path="typings/jasmine.d.ts"/>
import {Vector} from '../../src/ts/vector';

describe("Vector", ()=> {

  it("norm", ()=> {
    expect((new Vector(3, 4, 0)).norm()).toEqual(5.0);
  });

  it("add", ()=> {
    const v = new Vector(1, 2, 3);

    expect(v.add(new Vector(0, 1, -1)).toString()).toEqual('(1,3,2)');
  });

  it("sub", ()=> {
    const v = new Vector(1, 2, 3);

    expect(v.sub(new Vector(0, 1, -1)).toString()).toEqual('(1,1,4)');
  });

  it("mul", ()=> {
    const v = new Vector(1, 2, 3);

    expect(v.mul(2).toString()).toEqual('(2,4,6)');
  });

  it("dot", ()=> {
    const v = new Vector(1, 2, 3);

    expect(v.dot(new Vector(0, 1, -1))).toEqual(-1);
  });

});
