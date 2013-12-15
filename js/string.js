/**
 * repeat string
 * @method StringUtil.repeat
 * @param {string} str
 * @param {number} repeat
 * @return {string}
 */
var repeatString = function(str, repeat) {
  var result = '';
  for (; repeat > 0; repeat >>= 1, str += str) {
    if (repeat & 1) {
      result += str;
    }
  }
  return result;
};

var Types = {
  LOWER: 0x01,
  UPPER: 0x02,
  DIGITS: 0x04,
  UNDERSCORE: 0x08,
  SIGN: 0x10
};

/**
 * StringUtil
 * @class StringUtil
 */
var StringUtil = {
  // RegExp snippets
  regURI: /\w+:\/\/[\w\-.\/?%&=:@;]*/g,
  regXMLTag: /<\/?\w+[^>]*>/g,
  regCComment: /\/\*[\s\S]*?\*\//gm,
  regLineComment: /\/\/.*$/gm,
  regDoubleQuote: /"([^\\"\n]|\\.)*"/g,

  Types: Types,
  repeat: repeatString,

  /**
   * sprintf
   * @method StringUtil.format
   * @param {string} str
   * @return {string}
   */
  format: function(str) {
    var argv = arguments;
    var index = 1;
    
    return str.replace(
      /%([+\-#0])?(\d+)?(?:\.(\d+))?([%defoxs])/g,
      function(src, flag, width, prec, type) {
        if (type === '%') { return '%'; }
        var s = '', n = 0;
        if (type === 's') {
          s = argv[index];
        }
        else if (type === 'd') {
          n = argv[index] | 0;
          s = (flag === '+' && n > 0 ? '+' : '') + n;
        }
        else if (type === 'o') {
          n = argv[index] | 0;
          s = (flag === '+' && n > 0 ? '+' : '') +
              (flag === '#' ? '0' : '') + (n).toString(8);
        }
        else if (type === 'x') {
          n = argv[index] | 0;
          s = (flag === '+' && n > 0 ? '+' : '') +
              (flag === '#' ? '0x' : '') + (n).toString(16);
        }
        else if (type === 'e') {
          s = (flag === '+' && argv[index] > 0 ? '+' : '') +
              (prec ? argv[index].toExponential(prec) :
                  argv[index].toString());
        }
        else if (type === 'f') {
          s = (flag === '+' && argv[index] > 0 ? '+' : '') +
              (prec ? argv[index].toFixed(prec) : argv[index].toString());
        }
        ++index;
        if (width > s.length) {
          if (flag === '-') {
            s += repeatString((flag === '0' ? '0': ' '), width - s.length);
            return s;
          }

          s = repeatString((flag === '0' ? '0': ' '), width) + s;
          return s.slice(-width);
        }
        return s;
      });
  },

  /**
   * @param {string} s
   * @return {string}
   */
  escapeHTML: function(s) {
    return s.
        replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').
        replace(/'/g, '&apos;').replace(/"/g, '&quot;');
  },

  /**
   * @param {string} s
   * @return {string}
   */
  escapeJS: function(s) {
    return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').
        replace(/'/g, '\\\'').replace(/\//g, '\\/');
        // replace(/</g, '\\x3c').replace(/>/g, '\\x3e');
  },

  /**
   * @param {string} s
   * @return {string}
   */
  trimLeft: function(s) {
    return s.replace(/^\s+/, '');
  },

  /**
   * @param {string} s
   * @return {string}
   */
  trimRight: function(s) {
    return s.replace(/\s+$/, '');
  },

  /**
   * @param {string} s
   * @return {string}
   */
  trim: function(s) {
    return s.replace(/^\s+|\s+$/g, '');
  },

  /**
   * @param {string} s
   * @return {string}
   */
  nobr: function(s) {
    return s.replace(/[\r\n]+/g, '');
  },

  /**
   * @param {string} src
   * @param {string} suffix
   * @return {boolean}
   */
  startsWith: function(src, suffix) {
    return !src.indexOf(suffix);
  },

  /**
   * @param {string} src
   * @param {string} suffix
   * @return {boolean}
   */
  endsWith: function(src, suffix) {
    var len = suffix.length;
    if (src.length < len) { return false; }
    return src.slice(-len) === suffix;
  },

  /**
   * @param {number} len
   * @param {number} opt_filter
   */
  genRandomString: function(len, opt_filter) {
    var str = '';
    var letter = '';

    if (arguments.length < 2) {
      opt_filter = Types.LOWER | Types.UPPER | Types.DIGITS;
    }

    if (opt_filter & Types.LOWER) {
      letter += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (opt_filter & Types.UPPER) {
      letter += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (opt_filter & Types.DIGITS) {
      letter += '0123456789';
    }
    if (opt_filter & Types.UNDERSCORE) {
      letter += '_';
    }
    if (opt_filter & Types.SIGN) {
      letter += '!\"#$%&\'()=~|-^@[;:],./`{+*}>?';
    }

    for (var i = 0, range = letter.length; i < len; ++i) {
      str += letter.charAt(Math.random() * range | 0);
    }

    return str;
  }
};

Object.freeze(StringUtil);

// exports
exports.StringUtil = StringUtil;
