'use strict';

import {int} from '@ktn/type';

/**
 * @class StringUtil
 */
export class StringUtil {
  /**
   * sprintf
   *
   * @param {string} str
   * @param {...?} argv
   * @return {string}
   */
  public static format(str: string, ...argv: any[]): string {
    // const argv = arguments;
    let index: int = 0;
    return str.replace(
        /%([+\-#0])?(\d+)?(?:\.(\d+))?([%defoxs])/g,
        (src: string, flag: string, width: int, prec: string, type: string): string => {
      if (type === '%') {
        return '%';
      }
      let s: string = '';
      let n: int = 0;
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
  public static pyformat(str: string, ...argv: any[]): string {
    let cnt: int = 0;
    let index: int = 1;
    /**
     * @param {!*} src
     * @param {!string} type
     * @param {string=} prefix
     * return {!string}
     */
    function typeFormat(src: any, type: string, prefix?: string): string {
      if (type === void 0) {
        return src;
      }
      let pre: string;
      const isPrefix: boolean = prefix === '#';
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
    function alignFormat(src: string, width: number, align?: string, fill?: string): string {
      if (width < 1) {
        return src;
      }
      if (align === void 0) {
        return src;
      }
      const srcstr: string = src.toString();
      const ch: string = fill === void 0 ? ' ' : fill;
      const isFilled: boolean = width > srcstr.length;
      const add: string = isFilled ? ch.repeat(width - srcstr.length) : '';
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
        (src: string, fieldName: string, fill: string,
            align: string, sign: string, prefix: string,
            zero: string, width: int, prec: string, type: string): string => {
      ++cnt;
      if (zero === '0') {
        fill = '0';
        align = '=';
      }
      let value: string;
      if (fieldName === void 0) {
        index = cnt - 1;
        value = typeFormat(argv[index], type);
      } else if (fieldName.match(/\d+/)) {
        index = parseInt(fieldName, 10);
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
  public static escapeHTML(s: string): string {
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
  public static escapeJS(s: string): string {
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
  public static trimLeft(s: string): string {
    return s.replace(/^\s+/, '');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  public static trimRight(s: string): string {
    return s.replace(/\s+$/, '');
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  public static nobr(s: string): string {
    return s.replace(/[\r\n]+/g, '');
  }

  /**
   * @param {!int} len
   * @param {int=} optFilter
   * @return {!string}
   */
  public static random(len: int, optFilter: int = StringUtil.Types.LOWER | StringUtil.Types.UPPER | StringUtil.Types.DIGITS): string {
    let letter: string = '';
    if (optFilter & StringUtil.Types.LOWER) {
      letter += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (optFilter & StringUtil.Types.UPPER) {
      letter += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (optFilter & StringUtil.Types.DIGITS) {
      letter += '0123456789';
    }
    if (optFilter & StringUtil.Types.UNDERSCORE) {
      letter += '_';
    }
    if (optFilter & StringUtil.Types.SIGN) {
      letter += '!\"#$%&\'()=~|-^@[;:],./`{+*}>?';
    }

    let str: string = '';
    const range: int = letter.length;
    const rnd: () => number = Math.random;
    for (let i: int = 0; i < len; ++i) {
      str += letter.charAt(rnd() * range | 0);
    }
    return str;
  }

  /**
   * @param {!string} s
   * @return {!string}
   */
  public static reverse(s: string): string {
    let r: string = '';
    for (let i = s.length - 1; i >= 0; i--) {
      r += s[i];
    }

    return r;
  }

  /**
   * @param {!string} s
   * @param {string=} br
   * @return {!string}
   */
  public static reverseLine(s: string, br: string = '\n'): string {
    return s.split(br).reverse().join(br);
  }
}

export namespace StringUtil {
  export enum Types {
    LOWER = 1 << 0,
    UPPER = 1 << 1,
    DIGITS = 1 << 2,
    UNDERSCORE = 1 << 3,
    SIGN = 1 << 4,
  }
  
  export class Reg {
    static get URI(): RegExp { return /\w+:\/\/[\w\-.\/?%&=:@;]*/g; }
    static get XMLTag(): RegExp { return /<\/?\w+[^>]*>/g; }
    static get CComment(): RegExp { return /\/\*[\s\S]*?\*\//gm; }
    static get LineComment(): RegExp { return /\/\/.*$/gm; }
    static get DoubleQuote(): RegExp { return /"([^\\"\n]|\\.)*"/g; }
  }
}
