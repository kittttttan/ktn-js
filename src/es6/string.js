const Types = {
  LOWER: 0x01,
  UPPER: 0x02,
  DIGITS: 0x04,
  UNDERSCORE: 0x08,
  SIGN: 0x10
};

const Reg = {
  URI: /\w+:\/\/[\w\-.\/?%&=:@;]*/g,
  XMLTag: () => /<\/?\w+[^>]*>/g,
  CComment: /\/\*[\s\S]*?\*\//gm,
  LineComment: /\/\/.*$/gm,
  DoubleQuote: /"([^\\"\n]|\\.)*"/g
};

/**
 * @class StringUtil
 */
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
    const argv = arguments;
    let index = 1;
    return str.replace(
        /%([+\-#0])?(\d+)?(?:\.(\d+))?([%defoxs])/g,
        (src, flag, width, prec, type) => {
      if (type === '%') {
        return '%';
      }
      let s = '';
      let n = 0;
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
   * @param {...*} argv
   * @return {string}
   */
  static pyformat(str, ...argv) {
    let cnt = 0;
    let index = 1;
    /**
     * @param {!*} src
     * @param {!string} type
     * @param {string=} prefix
     * return {!string}
     */
    function typeFormat(src, type, prefix) {
      if (type === void 0) {
        return src;
      }
      let pre;
      const isPrefix = prefix === '#';
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
      if (width < 1) {
        return src;
      }
      if (align === void 0) {
        return src;
      }
      const srcstr = src.toString();
      const ch = fill === void 0 ? ' ' : fill;
      const isFilled = width > srcstr.length;
      const add = isFilled ? ch.repeat(width - srcstr.length) : '';
      switch (align) {
        case '<':
          return (srcstr + add).substring(0, width);
        case '>':
          return (add + srcstr).slice(-width);
        case '=':
          return srcstr;
        case '^':
          return add.substring(0, width >> 1)
              + srcstr
              + add.substring(width >> 1, width);
        default:
          return srcstr;
      }
    }
    return str.replace(
        /{(?!{)([0-9a-zA-Z_\[\]]+)?(?::(?:([^}])?([<>=^]))?([ +-])?(#)?(0)?(\d+)?(\.\d+)?([sbcdoxXn ])?)?}(?!})/g,
        (src, fieldName, fill,
            align, sign, prefix, zero, width, prec, type) => {
      ++cnt;
      if (zero === '0') {
        fill = '0';
        align = '=';
      }
      let value;
      if (fieldName === void 0) {
        index = cnt - 1;
        value = typeFormat(argv[index], type);
      } else if (fieldName.match(/\d+/)) {
        index = fieldName | 0;
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
   * @param {number=} optFilter
   * @return {!string}
   */
  static random(len, optFilter) {
    if (arguments.length < 2) {
      optFilter = Types.LOWER | Types.UPPER | Types.DIGITS;
    }

    let letter = '';
    if (optFilter & Types.LOWER) {
      letter += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (optFilter & Types.UPPER) {
      letter += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (optFilter & Types.DIGITS) {
      letter += '0123456789';
    }
    if (optFilter & Types.UNDERSCORE) {
      letter += '_';
    }
    if (optFilter & Types.SIGN) {
      letter += '!\"#$%&\'()=~|-^@[;:],./`{+*}>?';
    }

    let str = '';
    const range = letter.length;
    const rnd = Math.random;
    for (let i = 0; i < len; ++i) {
      str += letter.charAt(rnd() * range | 0);
    }
    return str;
  }
}
