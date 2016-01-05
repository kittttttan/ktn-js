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
  static toZenkaku(str) {
    return str
        .replace(/\\/g, '¥')
        .replace(/[ ]/g, '　')
        .replace(/'/g, '’')
        .replace(/"/g, '”')
        .replace(/[\u0021-\u007e]/g, function(a) {
      return String.fromCharCode(a.charCodeAt(0) + 0xfee0);
    });
  }

  /**
   * @method StringConverter.toZenkakuKatakana
   * @param {string} str
   * @return {string}
   */
  static toZenkakuKatakana(str) {
    var c, conv, han, i, j, n, ref, zen;
    conv = [];
    c = '';
    n = 0;
    zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'
        + 'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'
        + 'ワン゛゜'.split('');
    han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'
        + 'ﾜﾝﾞﾟ'.split('');
    for (i = j = 0, ref = str.length; j < ref; i = j += 1) {
      c = str.charAt(i);
      n = han.indexOf(c);
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
  static toHankaku(str) {
    return str
        .replace(/¥/g, '\\')
        .replace(/[　]/g, ' ')
        .replace(/’/g, '\'')
        .replace(/”/g, '"')
        .replace(/[\uff01-\uff5e]/g, function(a) {
      return String.fromCharCode(a.charCodeAt(0) - 0xfee0);
    });
  }

  /**
   * @method StringConverter.toHankakuKatakana
   * @param {string} str
   * @return {string}
   */
  static toHankakuKatakana(str) {
    var c, conv, han, i, j, n, ref, zen;
    conv = [];
    c = '';
    n = 0;
    zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'
        + 'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'
        + 'ワン゛゜'.split('');
    han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'
        + 'ﾜﾝﾞﾟ'.split('');
    for (i = j = 0, ref = str.length; j < ref; i = j += 1) {
      c = str.charAt(i);
      n = zen.indexOf(c);
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
  static toKatakana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(a) {
      return String.fromCharCode(a.charCodeAt(0) + 0x60);
    });
  }

  /**
   * @method StringConverter.toHiragana
   * @param {string} str
   * @return {string}
   */
  static toHiragana(str) {
    return str.replace(/[\u30A1-\u30F6]/g, function(a) {
      return String.fromCharCode(a.charCodeAt(0) - 0x60);
    });
  }

  /**
   * @method StringConverter.proper
   * @param {string} str
   * @return {string}
   */
  static proper(str) {
    return str.replace(/(\w+)/g, function(a) {
      return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase();
    });
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
  static convert(str, option) {
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
};
