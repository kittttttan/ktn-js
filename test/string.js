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
    expect(StringUtil.format('number: %-3d', 7)).toEqual('number: 7  ');
    expect(StringUtil.format('hex: %x', 0xff)).toEqual('hex: ff');
    expect(StringUtil.format('hex: %#x', 0xff)).toEqual('hex: 0xff');
    expect(StringUtil.format('exponential: %.2e', 123)).toEqual('exponential: 1.23e+2');
    expect(StringUtil.format('float: %+.2f', 3.1415)).toEqual('float: +3.14');
    expect(StringUtil.format('string: %s', 'str')).toEqual('string: str');
    expect(StringUtil.format('escape: %%d')).toEqual('escape: %d');
  });

  it("escapeHTML", function() {
    expect(StringUtil.escapeHTML('&<>\'\"')).toEqual('&amp;&lt;&gt;&apos;&quot;');
  });

  it("trim", function() {
    var blank = '  bl an  k    ';
    expect(StringUtil.trimLeft(blank)).toEqual('bl an  k    ');
    expect(StringUtil.trimRight(blank)).toEqual('  bl an  k');
    expect(StringUtil.trim(blank)).toEqual('bl an  k');
  });

  it("nobr", function() {
    expect(StringUtil.nobr('multi\r\nline\r\n')).toEqual('multiline');
  });

  it("with", function() {
    var src = 'Nana';
    expect(StringUtil.startsWith(src, 'N')).toBe(true);
    expect(StringUtil.startsWith(src, 'n')).toBe(false);
    expect(StringUtil.endsWith(src, 'na')).toBe(true);
    expect(StringUtil.endsWith(src, 'A')).toBe(false);
    expect(StringUtil.endsWith(src, '7777777')).toBe(false);
  });

  it("genRandomString", function() {
    expect(StringUtil.genRandomString(0)).toEqual('');
    expect(StringUtil.genRandomString(1, 0)).toEqual('');

    var s = StringUtil.genRandomString(0, StringUtil.Types.SIGN);
    expect(s).toEqual('');

    s = StringUtil.genRandomString(1, StringUtil.Types.UNDERSCORE);
    expect(s).toEqual('_');
  });

});
