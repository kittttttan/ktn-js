import {StringConverter} from '../../src/utils/strconv';

describe("StringConverter", ()=> {

  it("toZenkaku", ()=> {
    expect(StringConverter.toZenkaku('abcDEF')).toBe('ａｂｃＤＥＦ');
  });

  it("toZenkakuKatakana", ()=> {
    expect(StringConverter.toZenkakuKatakana('ｱｲｳｴｵ')).toBe('アイウエオ');
  });

  it("toHankaku", ()=> {
    expect(StringConverter.toHankaku('ａｂｃＤＥＦ')).toBe('abcDEF');
  });

  it("toHankakuKatakana", ()=> {
    expect(StringConverter.toHankakuKatakana('アイウエオ')).toBe('ｱｲｳｴｵ');
  });

  it("toKatakana", ()=> {
    expect(StringConverter.toKatakana('あいうえお')).toBe('アイウエオ');
  });

  it("toHiragana", ()=> {
    expect(StringConverter.toHiragana('アイウエオ')).toBe('あいうえお');
  });

  it("proper", ()=> {
    expect(StringConverter.proper('abc DEF')).toBe('Abc Def');
  });

  it("convert", ()=> {
    const src = 'aB あい ｳ ｃＤ';

    expect(StringConverter.convert(src, 0)).toBe('AB あい ｳ ＣＤ');
    expect(StringConverter.convert(src, 1)).toBe('ab あい ｳ ｃｄ');
    expect(StringConverter.convert(src, 2)).toBe('ａＢ　あい　ウ　ｃＤ');
    expect(StringConverter.convert(src, 3)).toBe('aB あい ｳ cD');
    expect(StringConverter.convert(src, 4)).toBe('aB アイ ｳ ｃＤ');
    expect(StringConverter.convert(src, 5)).toBe('aB あい ｳ ｃＤ');
    expect(StringConverter.convert(src, 6)).toBe('Ab あい ｳ ｃＤ');

    expect(StringConverter.convert(src, -1)).toBe(src);
  });

});
