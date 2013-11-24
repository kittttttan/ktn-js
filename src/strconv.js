(function(exports){
'use strict';

/**
 * StringConverter
 * @class StringConverter
 */
var StringConverter = {
  /**
   * @method StringConverter.toZenkaku
   * @param {string} str
   * @return {string}
   */
  toZenkaku: function(str) {
    return str.replace(/\\/g, '¥').replace(/ /g, '　')
        .replace(/'/g, '’').replace(/"/g, '”') // '
        .replace(/[\u0021-\u007e]/g, function(a){
          return String.fromCharCode(a.charCodeAt(0) + 0xfee0);
        });
  },

  /**
   * @method StringConverter.toZenkakuKatakana
   * @param {string} str
   * @return {string}
   */
  toZenkakuKatakana: function(str) {
  var conv = [], c  = '', n = 0,
      zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'+
          'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'+
          'ワン゛゜'.split(''),
      han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'+
          'ﾜﾝﾞﾟ'.split('');
    for (var i = 0, l = str.length; i < l; ++i) {
      c = str.charAt(i);
      n = han.indexOf(c);
      if (n > -1) {
        c = zen[n];
      }
      conv.push(c);
    }
    return conv.join('');
  },

  /**
   * @method StringConverter.toHankaku
   * @param {string} str
   * @return {string}
   */
  toHankaku: function(str) {
    return str.replace(/¥/g, '\\').replace(/　/g, ' ')
        .replace(/’/g, '\'').replace(/”/g, '"') // '
        .replace(/[\uff01-\uff5e]/g, function(a){
          return String.fromCharCode(a.charCodeAt(0) - 0xfee0);
        });
  },

  /**
   * @method StringConverter.toHankakuKatakana
   * @param {string} str
   * @return {string}
   */
  toHankakuKatakana: function(str) {
  var conv = [], c  = '', n = 0,
      zen = '。「」、ヲァィゥェォャュョッアイウエオカキクケコサシスセソ'+
          'タチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロ'+
          'ワン゛゜'.split(''),
      han = '｡｢｣､ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛ'+
          'ﾜﾝﾞﾟ'.split('');
    for (var i = 0, l = str.length; i < l; ++i) {
      c = str.charAt(i);
      n = zen.indexOf(c);
      if (n > -1) {
        c = han[n];
      }
      conv.push(c);
    }
    return conv.join('');
  },

  /**
   * @method StringConverter.toKatakana
   * @param {string} str
   * @return {string}
   */
  toKatakana: function(str) {
    return str.replace(/[\u3041-\u3096]/g, function(a){
      return String.fromCharCode(a.charCodeAt(0) + 0x60);
    });
  },

  /**
   * @method StringConverter.toHiragana
   * @param {string} str
   * @return {string}
   */
  toHiragana: function(str) {
    return str.replace(/[\u30A1-\u30F6]/g, function(a){
      return String.fromCharCode(a.charCodeAt(0) - 0x60);
    });
  },

  /**
   * @method StringConverter.proper
   * @param {string} str
   * @return {string}
   */
  proper: function(str) {
    return str.replace(/(\w+)/g, function(a) {
      return a.charAt(0).toUpperCase() + a.substring(1).toLowerCase();
    });
  },

  /**
   * Convert string format
   * @method StringConverter.format
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
  convert: function(str, option) {
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

// exports
exports.StringConverter = StringConverter;

}(typeof exports !== 'undefined' ? exports : this));
