/// <reference path="../node_modules/@types/jasmine/index.d.ts" />
import StringUtil from '../src/string';

describe("StringUtil", ()=> {

  it("format", ()=> {
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

  it("escapeHTML", ()=> {
    expect(StringUtil.escapeHTML('&<>\'\"')).toEqual('&amp;&lt;&gt;&apos;&quot;');
  });

  it("trim", ()=> {
    const blank = '  bl an  k    ';
    expect(StringUtil.trimLeft(blank)).toEqual('bl an  k    ');
    expect(StringUtil.trimRight(blank)).toEqual('  bl an  k');
  });

  it("nobr", ()=> {
    expect(StringUtil.nobr('multi\r\nline\r\n')).toEqual('multiline');
  });

  it("random", ()=> {
    expect(StringUtil.random(0)).toEqual('');
    expect(StringUtil.random(1, 0)).toEqual('');

    //let s = StringUtil.random(0, StringUtil.Types.SIGN);
    //expect(s).toEqual('');

    //s = StringUtil.random(1, StringUtil.Types.UNDERSCORE);
    //expect(s).toEqual('_');
  });

});
