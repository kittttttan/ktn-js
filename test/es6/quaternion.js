import {Quaternion} from '../../src/es6/quaternion.js';

describe("Quaternion", ()=> {

  it("conjugate", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).conjugate()).
        toEqual(new Quaternion(1, -1, -1, -1));
  });

  it("norm", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).norm()).toEqual(2.0);
  });

  it("normalize", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).normalize()).
        toEqual(new Quaternion(0.5, 0.5, 0.5, 0.5));
  });

  it("inverse", ()=> {
    expect((new Quaternion(1, 1, 1, 1)).inverse()).
        toEqual(new Quaternion(0.25, 0.25, 0.25, 0.25));
  });

});
