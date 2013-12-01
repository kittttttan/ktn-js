var Encode = require('../js/enc.js').Encode;
var Decode = require('../js/enc.js').Decode;

describe("Encode", function() {
  it("unary", function() {
    expect(Encode.unary(1)).toEqual('10');
    expect(Encode.unary(3)).toEqual('1110');
    expect(Encode.unary(1, true)).toEqual('01');
    expect(Encode.unary(3, true)).toEqual('0001');
  });

});

describe("Decode", function() {
  it("unary", function() {
    expect(Decode.unary('10').join('')).toEqual('1');
    expect(Decode.unary('1110').join('')).toEqual('3');
    expect(Decode.unary('01', true).join('')).toEqual('1');
    expect(Decode.unary('0001', true).join('')).toEqual('3');
  });

});
