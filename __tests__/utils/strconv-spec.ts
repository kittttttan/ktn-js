import {
  toZenkaku,
  toZenkakuKatakana,
  toHankaku,
  toHankakuKatakana,
  toKatakana,
  toHiragana,
  proper,
  convert,
} from '../../src/utils/strconv';

describe("strconv", ()=> {

  it("toZenkaku", ()=> {
    expect(toZenkaku('abcDEF')).toBe('ａｂｃＤＥＦ');
  });

  it("toZenkakuKatakana", ()=> {
    expect(toZenkakuKatakana('ｱｲｳｴｵ')).toBe('アイウエオ');
  });

  it("toHankaku", ()=> {
    expect(toHankaku('ａｂｃＤＥＦ')).toBe('abcDEF');
  });

  it("toHankakuKatakana", ()=> {
    expect(toHankakuKatakana('アイウエオ')).toBe('ｱｲｳｴｵ');
  });

  it("toKatakana", ()=> {
    expect(toKatakana('あいうえお')).toBe('アイウエオ');
  });

  it("toHiragana", ()=> {
    expect(toHiragana('アイウエオ')).toBe('あいうえお');
  });

  it("proper", ()=> {
    expect(proper('abc DEF')).toBe('Abc Def');
  });

  it("convert", ()=> {
    const src = 'aB あい ｳ ｃＤ';

    expect(convert(src, 0)).toBe('AB あい ｳ ＣＤ');
    expect(convert(src, 1)).toBe('ab あい ｳ ｃｄ');
    expect(convert(src, 2)).toBe('ａＢ　あい　ウ　ｃＤ');
    expect(convert(src, 3)).toBe('aB あい ｳ cD');
    expect(convert(src, 4)).toBe('aB アイ ｳ ｃＤ');
    expect(convert(src, 5)).toBe('aB あい ｳ ｃＤ');
    expect(convert(src, 6)).toBe('Ab あい ｳ ｃＤ');

    expect(convert(src, -1)).toBe(src);
  });

});
