import {StringConverter} from '../es6/strconv.js';

describe("StringConverter", ()=> {

  it("toZenkaku", ()=> {
    expect(StringConverter.toZenkaku('abcDEF')).toEqual('ａｂｃＤＥＦ');
  });

  it("toZenkakuKatakana", ()=> {
    expect(StringConverter.toZenkakuKatakana('ｱｲｳｴｵ')).toEqual('アイウエオ');
  });

  it("toHankaku", ()=> {
    expect(StringConverter.toHankaku('ａｂｃＤＥＦ')).toEqual('abcDEF');
  });

  it("toHankakuKatakana", ()=> {
    expect(StringConverter.toHankakuKatakana('アイウエオ')).toEqual('ｱｲｳｴｵ');
  });

  it("toKatakana", ()=> {
    expect(StringConverter.toKatakana('あいうえお')).toEqual('アイウエオ');
  });

  it("toHiragana", ()=> {
    expect(StringConverter.toHiragana('アイウエオ')).toEqual('あいうえお');
  });

  it("proper", ()=> {
    expect(StringConverter.proper('abc DEF')).toEqual('Abc Def');
  });

  it("convert", ()=> {
    const src = 'aB あい ｳ ｃＤ';

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
