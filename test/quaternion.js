var Quaternion = require('../js/quaternion.js').Quaternion;

describe("Quaternion", function() {

  it("conjugate", function() {
    expect((new Quaternion(1, 1, 1, 1)).conjugate()).
        toEqual(new Quaternion(1, -1, -1, -1));
  });

  it("norm", function() {
    expect((new Quaternion(1, 1, 1, 1)).norm()).toEqual(2.0);
  });

  it("normalize", function() {
    expect((new Quaternion(1, 1, 1, 1)).normalize()).
        toEqual(new Quaternion(0.5, 0.5, 0.5, 0.5));
  });

  it("inverse", function() {
    expect((new Quaternion(1, 1, 1, 1)).inverse()).
        toEqual(new Quaternion(0.25, 0.25, 0.25, 0.25));
  });

});
