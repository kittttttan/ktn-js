var Vector = require('../js/vector.js').Vector;

describe("Vector", function() {

  it("norm", function() {
    expect((new Vector(3, 4, 0)).norm()).toEqual(5.0);
  });

  it("add", function() {
    var v = new Vector(1, 2, 3);

    expect(v.add(new Vector(0, 1, -1)).toString()).toEqual('(1,3,2)');
  });

  it("sub", function() {
    var v = new Vector(1, 2, 3);

    expect(v.sub(new Vector(0, 1, -1)).toString()).toEqual('(1,1,4)');
  });

  it("mul", function() {
    var v = new Vector(1, 2, 3);

    expect(v.mul(2).toString()).toEqual('(2,4,6)');
  });

  it("dot", function() {
    var v = new Vector(1, 2, 3);

    expect(v.dot(new Vector(0, 1, -1))).toEqual(-1);
  });

});
