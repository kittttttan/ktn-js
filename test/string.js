var StringUtil = require('../js/string.js').StringUtil;

describe("StringUtil", function() {

  it("repeat", function() {
    expect(StringUtil.repeat('ABC', 0)).toEqual('');
    expect(StringUtil.repeat('ABC', 1)).toEqual('ABC');
    expect(StringUtil.repeat('ABC', 2)).toEqual('ABCABC');
    expect(StringUtil.repeat('ABC', 3)).toEqual('ABCABCABC');
    expect(StringUtil.repeat('n', 7)).toEqual('nnnnnnn');
  });

  it("format", function() {
    expect(StringUtil.format('number: %d', 7)).toEqual('number: 7');
    expect(StringUtil.format('number: %02d', 7)).toEqual('number: 07');
    expect(StringUtil.format('hex: %x', 0xff)).toEqual('hex: ff');
    expect(StringUtil.format('hex: %#x', 0xff)).toEqual('hex: 0xff');
  });

});
