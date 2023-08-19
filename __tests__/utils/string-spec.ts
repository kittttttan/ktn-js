import {format, escapeHTML, nobr, random, Types, reverse, reverseLine} from '../../src/utils/string';

describe("string", ()=> {
  it("format", ()=> {
    expect(format('number: %d', 7)).toBe('number: 7');
    expect(format('number: %02d', 7)).toBe('number: 07');
    expect(format('number: %-3d', 7)).toBe('number: 7  ');
    expect(format('hex: %x', 0xff)).toBe('hex: ff');
    expect(format('hex: %#x', 0xff)).toBe('hex: 0xff');
    expect(format('exponential: %.2e', 123)).toBe('exponential: 1.23e+2');
    expect(format('float: %+.2f', 3.1415)).toBe('float: +3.14');
    expect(format('string: %s', 'str')).toBe('string: str');
    expect(format('escape: %%d')).toBe('escape: %d');
  });

  it("escapeHTML", ()=> {
    expect(escapeHTML('&<>\'\"')).toBe('&amp;&lt;&gt;&apos;&quot;');
  });

  it("nobr", ()=> {
    expect(nobr('multi\r\nline\r\n')).toBe('multiline');
  });

  it("random", ()=> {
    expect(random(0)).toBe('');
    expect(random(1, 0)).toBe('');

    let s = random(2, Types.LOWER);
    expect(s).toMatch(/^[a-z]+$/);

    s = random(3, Types.UPPER);
    expect(s).toMatch(/^[A-Z]+$/);

    s = random(4, Types.DIGITS);
    expect(s).toMatch(/^[0-9]+$/);

    s = random(1, Types.UNDERSCORE);
    expect(s).toBe('_');
  });

  it("reverse", ()=> {
    expect(reverse('hello')).toBe('olleh');
    expect(reverse('てすと')).toBe('とすて');
  });

  it("reverseLine", ()=> {
    expect(reverseLine('h\ne\nl\nl\no')).toBe('o\nl\nl\ne\nh');
    expect(reverseLine('て\r\nす\r\nと', '\r\n')).toBe('と\r\nす\r\nて');
  });
});
