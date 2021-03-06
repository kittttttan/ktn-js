import {StringUtil} from '../../src/utils/string';

describe("StringUtil", ()=> {

  it("format", ()=> {
    expect(StringUtil.format('number: %d', 7)).toBe('number: 7');
    expect(StringUtil.format('number: %02d', 7)).toBe('number: 07');
    expect(StringUtil.format('number: %-3d', 7)).toBe('number: 7  ');
    expect(StringUtil.format('hex: %x', 0xff)).toBe('hex: ff');
    expect(StringUtil.format('hex: %#x', 0xff)).toBe('hex: 0xff');
    expect(StringUtil.format('exponential: %.2e', 123)).toBe('exponential: 1.23e+2');
    expect(StringUtil.format('float: %+.2f', 3.1415)).toBe('float: +3.14');
    expect(StringUtil.format('string: %s', 'str')).toBe('string: str');
    expect(StringUtil.format('escape: %%d')).toBe('escape: %d');
  });

  it("escapeHTML", ()=> {
    expect(StringUtil.escapeHTML('&<>\'\"')).toBe('&amp;&lt;&gt;&apos;&quot;');
  });

  it("trim", ()=> {
    const blank = '  bl an  k    ';
    expect(StringUtil.trimLeft(blank)).toBe('bl an  k    ');
    expect(StringUtil.trimRight(blank)).toBe('  bl an  k');
  });

  it("nobr", ()=> {
    expect(StringUtil.nobr('multi\r\nline\r\n')).toBe('multiline');
  });

  it("random", ()=> {
    expect(StringUtil.random(0)).toBe('');
    expect(StringUtil.random(1, 0)).toBe('');

    let s = StringUtil.random(2, StringUtil.Types.LOWER);
    expect(s).toMatch(/^[a-z]+$/);

    s = StringUtil.random(3, StringUtil.Types.UPPER);
    expect(s).toMatch(/^[A-Z]+$/);

    s = StringUtil.random(4, StringUtil.Types.DIGITS);
    expect(s).toMatch(/^[0-9]+$/);

    s = StringUtil.random(1, StringUtil.Types.UNDERSCORE);
    expect(s).toBe('_');
  });

  it("reverse", ()=> {
    expect(StringUtil.reverse('hello')).toBe('olleh');
    expect(StringUtil.reverse('てすと')).toBe('とすて');
  });

  it("reverseLine", ()=> {
    expect(StringUtil.reverseLine('h\ne\nl\nl\no')).toBe('o\nl\nl\ne\nh');
    expect(StringUtil.reverseLine('て\r\nす\r\nと', '\r\n')).toBe('と\r\nす\r\nて');
  });

});
