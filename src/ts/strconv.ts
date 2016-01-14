/**
 * StringConverter
 * @class StringConverter
 */
export class StringConverter {
  /**
   * @method StringConverter.toZenkaku
   * @param {string} str
   * @return {string}
   */
  static toZenkaku(str: string): string {
    return str
        .replace(/\\/g, '¥')
        .replace(/[ ]/g, '　')
        .replace(/'/g, '’')
        .replace(/"/g, '”')
        .replace(/[\u0021-\u007e]/g, (a) =>
          String.fromCharCode(a.charCodeAt(0) + 0xfee0)
        );
  }

  /**
   * @method StringConverter.toZenkakuKatakana
   * @param {string} str
   * @return {string}
   */
  static toZenkakuKatakana(str: string): string {
    const conv = [];
    const zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜'.split('');
    const han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ'.split('');
    for (let i = 0, ref = str.length; i < ref; ++i) {
      let c = str.charAt(i);
      const n = han.indexOf(c);
      if (n > -1) {
        c = zen[n];
      }
      conv.push(c);
    }
    return conv.join('');
  }

  /**
   * @method StringConverter.toHankaku
   * @param {string} str
   * @return {string}
   */
  static toHankaku(str: string): string {
    return str
        .replace(/¥/g, '\\')
        .replace(/[　]/g, ' ')
        .replace(/’/g, '\'')
        .replace(/”/g, '"')
        .replace(/[\uff01-\uff5e]/g, (a) =>
          String.fromCharCode(a.charCodeAt(0) - 0xfee0)
        );
  }

  /**
   * @method StringConverter.toHankakuKatakana
   * @param {string} str
   * @return {string}
   */
  static toHankakuKatakana(str: string): string {
    const conv = [];
    const zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン゛゜'.split('');
    const han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ'.split('');
    for (let i = 0, ref = str.length; i < ref; ++i) {
      let c = str.charAt(i);
      const n = zen.indexOf(c);
      if (n > -1) {
        c = han[n];
      }
      conv.push(c);
    }
    return conv.join('');
  }

  /**
   * @method StringConverter.toKatakana
   * @param {string} str
   * @return {string}
   */
  static toKatakana(str: string): string {
    return str.replace(/[\u3041-\u3096]/g, (a) =>
      String.fromCharCode(a.charCodeAt(0) + 0x60)
    );
  }

  /**
   * @method StringConverter.toHiragana
   * @param {string} str
   * @return {string}
   */
  static toHiragana(str: string): string {
    return str.replace(/[\u30A1-\u30F6]/g, (a) =>
      String.fromCharCode(a.charCodeAt(0) - 0x60)
    );
  }

  /**
   * @method StringConverter.proper
   * @param {string} str
   * @return {string}
   */
  static proper(str: string): string {
    return str.replace(/(\w+)/g, (a) =>
      a.charAt(0).toUpperCase() + a.substring(1).toLowerCase()
    );
  }

  /**
   * Convert string format
   * @method StringConverter.convert
   * @param {string} str
   * @param {number} option
   * <pre>
   *   0 to upper
   *   1 to lower
   *   2 to zenkaku
   *   3 to hankaku
   *   4 to katakana
   *   5 to hiragana
   *   6 proper
   * </pre>
   * @return {string}
   */
  static convert(str: string, option: number): string {
    switch (option) {
      case 0:
        return str.toUpperCase();
      case 1:
        return str.toLowerCase();
      case 2:
        return this.toZenkakuKatakana(this.toZenkaku(str));
      case 3:
        return this.toHankakuKatakana(this.toHankaku(str));
      case 4:
        return this.toKatakana(str);
      case 5:
        return this.toHiragana(str);
      case 6:
        return this.proper(str);
      default:
        break;
    }
    return str;
  }
}
