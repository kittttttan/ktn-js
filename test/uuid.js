var uuid = require('../js/uuid.js').uuid;

describe("uuid", function() {

  it("uuid", function() {
    var u = uuid();
    expect(u.version).toEqual(4);
    expect(u.variant).toEqual(8);

    var str = u.toString();
    expect(str.length).toEqual(36);

    var ns = '74c45628-1bd5-4bf8-8df7-0315dd66987d';
    var n = u.fromString(ns);
    expect(n.version).toEqual(4);
    expect(n.variant).toEqual(8);
    expect(n.toString()).toEqual(ns);
  });

});
