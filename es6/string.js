const Types = {
  LOWER: 0x01,
  UPPER: 0x02,
  DIGITS: 0x04,
  UNDERSCORE: 0x08,
  SIGN: 0x10
};

const Reg = {
  URI: /\w+:\/\/[\w\-.\/?%&=:@;]*/g,
  XMLTag: function() {
    return /<\/?\w+[^>]*>/g;
  },
  CComment: /\/\*[\s\S]*?\*\//gm,
  LineComment: /\/\/.*$/gm,
  DoubleQuote: /"([^\\"\n]|\\.)*"/g
};

export class StringUtil {
  static get Types() { return Types; }
  static get Reg() { return Reg; }

  /**
   * sprintf
   * 
   * @param {string} str
   * @return {string}
   */
  static format(str) {
    var argv, index;
    argv = arguments;
    index = 1;
    return str.replace(
        /%([+\-#0])?(\d+)?(?:\.(\d+))?([%defoxs])/g,
        function(src, flag, width, prec, type) {
      var n, s;
      if (type === '%') {
        return '%';
      }
      s = '';
      n = 0;
      if (type === 's') {
        s = argv[index];
      } else if (type === 'd') {
        n = argv[index] | 0;
        s = (flag === '+' && n > 0 ? '+' : '') + n;
      } else if (type === 'o') {
        n = argv[index] | 0;
        s = (flag === '+' && n > 0 ? '+' : '')
          + (flag === '#' ? '0' : '') + n.toString(8);
      } else if (type === 'x') {
        n = argv[index] | 0;
        s = (flag === '+' && n > 0 ? '+' : '')
          + (flag === '#' ? '0x' : '') + n.toString(16);
      } else if (type === 'e') {
        s = (flag === '+' && argv[index] > 0 ? '+' : '')
          + (prec ? argv[index].toExponential(prec) : argv[index].toString());
      } else if (type === 'f') {
        s = (flag === '+' && argv[index] > 0 ? '+' : '')
          + (prec ? argv[index].toFixed(prec) : argv[index].toString());
      }
      ++index;
      if (width > s.length) {
        if (flag === '-') {
          s += (flag === '0' ? '0' : ' ').repeat(width - s.length);
          return s;
        }
        s = (flag === '0' ? '0' : ' ').repeat(width) + s;
        return s.slice(-width);
      }
      return s;
    });
  }

  /**
   * str.format in Python
   * http://docs.python.jp/2/library/string.html#formatspec
   *
   * @param {string} str
   * @param {...*} rest
   * @return {string}
   */
  static pyformat(str, rest) {
    let argv = arguments;
    let cnt = 0;
    let index = 1;
    /**
     * @param {!*} src
     * @param {!string} type
     * @param {string=} prefix
     * return {!string}
     */
    function typeFormat(src, type, prefix) {
      var isPrefix, pre;
      if (type === void 0) {
        return src;
      }
      isPrefix = prefix === '#';
      switch (type) {
        case 's':
          return src.toString();
        case 'b':
          pre = isPrefix ? '0b' : '';
          return pre + src.toString(2);
        case 'c':
          return String.fromCharCode(src | 0);
        case 'd':
          return src.toString(10);
        case 'o':
          pre = isPrefix ? '0' : '';
          return pre + src.toString(8);
        case 'x':
          pre = isPrefix ? '0x' : '';
          return pre + src.toString(16);
        case 'X':
          pre = isPrefix ? '0x' : '';
          return pre + src.toString(16);
        case 'n':
          return src.toString(10);
        case ' ':
          return src.toString(10);
        default:
          return src.toString();
      }
    }
    /**
     * @param {!string} src
     * @param {number} width
     * @param {?string=} align
     * @param {?string=} fill
     * @return {!string}
     */
    function alignFormat(src, width, align, fill) {
      var add, ch, isFilled;
      if (width < 1) {
        return src;
      }
      if (align === void 0) {
        return src;
      }
      str = src.toString();
      ch = fill === void 0 ? ' ' : fill;
      isFilled = width > str.length;
      add = isFilled ? ch.repeat(width - str.length) : '';
      switch (align) {
        case '<':
          return (str + add).substring(0, width);
        case '>':
          return (add + str).slice(-width);
        case '=':
          return src.toString();
        case '^':
          return add.substring(0, width >> 1)
              + src.toString()
              + add.substring(width >> 1, width);
        default:
          return src.toString();
      }
    }
    return str.replace(
        /{(?!{)([0-9a-zA-Z_\[\]]+)?(?::(?:([^}])?([<>=^]))?([ +-])?(#)?(0)?(\d+)?(\.\d+)?([sbcdoxXn ])?)?}(?!})/g,
        function(src, fieldName, fill,
            align, sign, prefix, zero, width, prec, type) {
      /*
      console.log({
        src: src,
        fieldName: fieldName,
        fill: fill,
        align: align,
        sign: sign,
        prefix: prefix,
        zero: zero,
        width: width,
        prec: prec,
        type: type
      });
      */
      var value;
      ++cnt;
      if (zero === '0') {
        fill = '0';
        align = '=';
      }
      if (fieldName === void 0) {
        index = cnt;
        value = typeFormat(argv[index], type);
      } else if (fieldName.match(/\d+/)) {
        index = (fieldName | 0) + 1;
        value = typeFormat(argv[index], type, prefix);
      } else {
        value = typeFormat(this[fieldName], type, prefix);
      }
      value = alignFormat(value, width, align, fill);
      return value;
    });
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  static escapeHTML(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  static escapeJS(s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/'/g, '\\\'')
      .replace(/\//g, '\\/');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  static trimLeft(s) {
    return s.replace(/^\s+/, '');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  static trimRight(s) {
    return s.replace(/\s+$/, '');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  static nobr(s) {
    return s.replace(/[\r\n]+/g, '');
  }

  /**
   * @param {!number} len
   * @param {number=} opt_filter
   * @return {!string}
   */
  static random(len, opt_filter) {
    var i, j, letter, range, ref, str;
    str = '';
    letter = '';
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
    range = letter.length;
    for (i = j = 0, ref = len; j < ref; i = j += 1) {
      str += letter.charAt(Math.random() * range | 0);
    }
    return str;
  }
};
