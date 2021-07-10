import {Quaternion} from '../../src/math/quaternion';

describe("Quaternion", ()=> {

  it("conjugate", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).conjugate()).
    toStrictEqual(new Quaternion(1, -1, -1, -1));
  });

  it("norm", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).norm()).toBe(2.0);
  });

  it("normalize", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).normalize()).
    toStrictEqual(new Quaternion(0.5, 0.5, 0.5, 0.5));
  });

  it("inverse", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).inverse()).
    toStrictEqual(new Quaternion(0.25, 0.25, 0.25, 0.25));
  });

});
