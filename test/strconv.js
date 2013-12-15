var StringConverter = require('../js/strconv.js').StringConverter;

describe("StringConverter", function() {

  it("toZenkaku", function() {
    expect(StringConverter.toZenkaku('abcDEF')).toEqual('ａｂｃＤＥＦ');
  });

  it("toZenkakuKatakana", function() {
    expect(StringConverter.toZenkakuKatakana('ｱｲｳｴｵ')).toEqual('アイウエオ');
  });

  it("toHankaku", function() {
    expect(StringConverter.toHankaku('ａｂｃＤＥＦ')).toEqual('abcDEF');
  });

  it("toHankakuKatakana", function() {
    expect(StringConverter.toHankakuKatakana('アイウエオ')).toEqual('ｱｲｳｴｵ');
  });

  it("toKatakana", function() {
    expect(StringConverter.toKatakana('あいうえお')).toEqual('アイウエオ');
  });

  it("toHiragana", function() {
    expect(StringConverter.toHiragana('アイウエオ')).toEqual('あいうえお');
  });

  it("proper", function() {
    expect(StringConverter.proper('abc DEF')).toEqual('Abc Def');
  });

  it("convert", function() {
    var src = 'aB あい ｳ ｃＤ';

    expect(StringConverter.convert(src, 0)).toEqual('AB あい ｳ ＣＤ');
    expect(StringConverter.convert(src, 1)).toEqual('ab あい ｳ ｃｄ');
    expect(StringConverter.convert(src, 2)).toEqual('ａＢ　あい　ウ　ｃＤ');
    expect(StringConverter.convert(src, 3)).toEqual('aB あい ｳ cD');
    expect(StringConverter.convert(src, 4)).toEqual('aB アイ ｳ ｃＤ');
    expect(StringConverter.convert(src, 5)).toEqual('aB あい ｳ ｃＤ');
    expect(StringConverter.convert(src, 6)).toEqual('Ab あい ｳ ｃＤ');

    expect(StringConverter.convert(src, -1)).toEqual(src);
  });

});
