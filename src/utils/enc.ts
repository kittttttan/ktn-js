'use strict';

/**
 * Encode
 * @class Encode
 */
export class Encode {
  /**
   * @method Encode.unary
   * @param {number} n natural number
   * @param {boolean=} [alt]
   * @return {string} unary coding
   */
  public static unary(n: number, alt = false): string {
    if (n < 0) { throw new Error(`unary(n, alt): n=${n} must >= 0`); }

    let former: string;
    let latter: string;
    if (alt) {
      former = '0';
      latter = '1';
    } else {
      former = '1';
      latter = '0';
    }

    return former.repeat(n) + latter;
  }

  /**
   * @method Encode.eliasGamma
   * @param {number} n natural number
   * @return {string} Elias gamma coding
   */
  public static eliasGamma(n: number): string {
    if (n < 1) { throw new Error(`eliasGamma(n): n=${n} must >= 1`); }

    const bin: string = n.toString(2);
    return '0'.repeat(bin.length - 1) + bin;
  }

  /**
   * @method Encode.eliasDelta
   * @param {number} n natural number
   * @return {string} Elias delta coding
   */
  public static eliasDelta(n: number): string {
    if (n < 1) { throw new Error(`eliasDelta(n): n=${n} must >= 1`); }

    const bin: string = n.toString(2);
    const gamma: string = Encode.eliasGamma(bin.length);
    return gamma + bin.substring(1);
  }

  /**
   * @method Encode.eliasOmega
   * @param {number} n natural number
   * @return {string} Elias omega coding
   */
  public static eliasOmega(n: number): string {
    if (n < 1) { throw new Error(`eliasOmega(n): n=${n} must >= 1`); }

    let res = '0';
    while (n > 1) {
      const bin: string = n.toString(2);
      res = bin + res;
      n = bin.length - 1;
    }

    return res;
  }

  /**
   * @method Encode.golomb
   * @param {number} n natural number
   * @param {number=} [m=8]
   * @return {string} Golomb coding
   */
  public static golomb(n: number, m = 8): string {
    if (n < 0) { throw new Error(`golomb(n, m): n=${n} must >= 0`); }

    m = (m | 0) || 8;
    if (m < 1) { throw new Error(`golomb(n, m): m=${m} must >= 1`); }

    const q: number = n / m | 0;
    const r: number = n % m;
    const bin: string = m.toString(2);
    let b: number = bin.length - 1;
    const isBin: boolean = (b !== 1) && !(b & (b - 1));

    let res: string = Encode.unary(q, true);
    if (isBin) {
      res += ('0'.repeat(b) + r.toString(2)).slice(-b);
    } else {
      ++b;
      if (r < (1 << b) - m) {
        res += ('0'.repeat(b - 1) + r.toString(2)).slice(-(b - 1));
      } else {
        res += ('0'.repeat(b) + (r + (1 << b) - m).toString(2)).slice(-b);
      }
    }
    // console.log('m=%d, b=%d (bin=%s), 2^b-m=%d, r=%d',
    //    m, b, (isBin?'true':'false'), (1<<b)-m, r);

    return res;
  }
}

/**
 * Decode
 * @class Decode
 */
export class Decode {
  /**
   * @method Decode.unary
   * @param {string}  str
   * @param {boolean=} alt
   * @return {number[]} natural number
   */
  public static unary(str: string, alt = false): number[] {
    const res: number[] = [];
    if (!str) { return res; }

    let former: string;
    let latter: string;
    if (alt) {
      former = '0';
      latter = '1';
    } else {
      former = '1';
      latter = '0';
    }

    let cnt = 0;
    const l: number = str.length;
    for (let i = 0; i < l; ++i) {
      switch (str.charAt(i)) {
      case former:
        ++cnt;
        break;
      case latter:
        res.push(cnt);
        cnt = 0;
        break;
      default:
        throw new Error(`Parse Error: ${str} at ${i}`);
      }
    }

    return res;
  }

  /**
   * @method Decode.eliasGamma
   * @param {string} str
   * @return {number[]} natural number
   */
  public static eliasGamma(str: string): number[] {
    const res: number[] = [];
    if (!str) { return res; }

    const l: number = str.length;
    let cnt = 0;
    let bin = '';
    for (let i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        ++cnt;
      } else if (str.charAt(i) === '1') {
        bin = str.substr(i, cnt + 1);
        i += cnt + 1;
        res.push(parseInt(bin, 2));
        cnt = 0;
        --i;
      } else {
        throw new Error(`Parse Error: ${str} at ${i}`);
      }
    }

    return res;
  }

  /**
   * @method Decode.eliasDelta
   * @param {string} str
   * @return {number[]} natural number
   */
  public static eliasDelta(str: string): number[] {
    const res: number[] = [];
    if (!str) { return res; }

    const l: number = str.length;
    let cnt = 0;
    let bin = '';
    let gamma: number;
    for (let i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        ++cnt;
      } else if (str.charAt(i) === '1') {
        bin = str.substr(i, cnt + 1);
        i += cnt + 1;
        gamma = parseInt(bin, 2);

        bin = `1${str.substr(i, gamma - 1)}`;
        i += gamma - 1;
        res.push(parseInt(bin, 2));

        cnt = 0;
        --i;
      } else {
        throw new Error(`Parse Error: ${str} at ${i}`);
      }
    }

    return res;
  }

  /**
   * @method Decode.eliasOmega
   * @param {string} str
   * @return {number[]} natural number
   */
  public static eliasOmega(str: string): number[] {
    const res: number[] = [];
    if (!str) { return res; }

    const l: number = str.length;
    let n = 1;
    let bin = '';
    for (let i = 0; i < l; ++i) {
      if (str.charAt(i) === '0') {
        res.push(n);
        n = 1;
      } else {
        bin = str.substr(i, n + 1);
        i += n + 1;
        n = parseInt(bin, 2);
        --i;
      }
    }

    return res;
  }
}
