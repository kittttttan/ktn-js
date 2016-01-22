/**
 * Big Integer in JavaScript.
 */

import './ktn';

/**
 * @private
 * @const
 * @type !int
 */
const _SHIFT: int = 16;
/**
 * @private
 * @const
 * @type !int
 */
const _BASE: int = 1 << _SHIFT;
/**
 * @private
 * @const
 * @type !int
 */
const _MASK: int = _BASE - 1;

/**
 * Integer
 * @class Integer
 * @property {Uint32Array} Integer#_d Digits [d0, d1, ..., dn]
 * @property {boolean} Integer#_s Sign +, -. `false` means -.
 * @property {int} Integer#_l Length of digits
 */
export class Integer implements Ktn.Field {
  protected _d: Uint32Array;
  protected _s: boolean;
  protected _l: int;

  /**
   * Initialize 0
   */
  constructor() {
    this._d = new Uint32Array(3);
    this._s = true;
    this._l = 1;
  }

  /**
   * @static
   * @const
   * @property {!int} SHIFT
   */
  static get SHIFT(): int {
    return _SHIFT;
  }

  /**
   * @static
   * @const
   * @property {!int} BASE
   */
  static get BASE(): int {
    return _BASE;
  }

  /**
   * @static
   * @const
   * @property {!int} MASK
   */
  static get MASK(): int {
    return _MASK;
  }

  /**
   * 1
   * @static
   * @method Integer.one
   * @return {!Integer} 1.
   */
  static get one(): Integer {
    return Integer.num(1);
  }

  /**
   * 0
   * @static
   * @method Integer.zero
   * @return {!Integer} 0.
   */
  static get zero(): Integer {
    return new Integer();
  }

  /**
   * Converts integer to Integer.
   * @static
   * @method Integer.num
   * @param {!int} n -0x7fffffff <= n <= 0x7fffffff
   * @return {!Integer}
   * 
   * @example
   * Integer.num(0);       // 0
   * Integer.num(1234567); // 1234567
   * Integer.num(-37);     // -37
   */
  public static num(n: int): Integer {
    n = n | 0;

    const a: Integer = new Integer();
    if (!n) { return a; }

    if (n < 0) {
      n = -n;
      a._s = false;
    }

    a._d[0] = n & _MASK;

    n = n >>> _SHIFT;
    if (n) {
      a._d[1] = n & _MASK;
      a._l = 2;
    }

    return a;
  }

  /**
   * Converts digit string to Integer.
   * @static
   * @method Integer.str
   * @param {!string} str For example '-9' or 'FF' etc.
   * @param {int=} [base=10] 2, 8, 10 or 16
   * @return {!Integer}
   * 
   * @example
   * Integer.str('77');     // 77
   * Integer.str('ff', 16); // 255
   * Integer.str('111', 2); // 7
   */
  public static str(str: string, base: int = 10): Integer {
    let index: int = 0;
    let sign: boolean = true;
    if (str.charAt(index) === '+') {
      index = index + 1;
    } else if (str.charAt(index) === '-') {
      sign = false;
      index = index + 1;
    }

    // ignore following zeros. '00102' is regarded as '102'.
    while (str.charAt(index) === '0') {
      index = index + 1;
    }
    if (!str.charAt(index)) {
      return Integer.zero;
    }

    let len: int = 0;
    if (base === 8) {
      len = 3 * (str.length + 1 - index);
    } else {
      if (!str.charAt(index)) { index = index - 1; }
      len = (str.length + 1 - index) << 2;
    }
    len = (len >>> 4) + 1;

    const z: Integer = Integer.alloc(len, sign);
    z.fillZero(len);

    const zd: Uint32Array = z._d;
    let bl: int = 1;

    for (;;) {
      let c: string = str.charAt(index);
      index = index + 1;
      if (!c) {
        break;
      }

      let n: int = parseInt(c, base);
      for (let i: int = 0; ;) {
        for (; i < bl; i = i + 1) {
          n = n + zd[i] * base;
          zd[i] = n & _MASK;
          n = n >>> _SHIFT;
        }
        if (!n) {
          break;
        }

        bl = bl + 1;
      }
    }

    return z.norm();
  }

  /**
   * Converts exponential string to Integer.
   * @static
   * @method Integer.exp
   * @param {!string} a
   * @return {!Integer}
   * @example
   *   Integer.exp("7");      // 7
   *   Integer.exp("7e3");    // 7000
   *   Integer.exp("314e-2"); // 3
   */
  public static exp(a: string): Integer {
    const i: number = a.indexOf('e', 0);
    if (i < 0) {
      // 'e' is not found
      return Integer.str(a);
    }

    let s: string = a.substr(0, i);
    let e: int = parseInt(a.substr(i + 1, a.length - (i + 1)), 10);
    const fpt: int = s.indexOf('.', 0);

    if (fpt >= 0) {
      // '.' is found
      const np: int = s.length - (fpt + 1);
      s = s.substr(0, fpt) + s.substr(fpt + 1, np);
      e = e - np;
    }

    if (e < 0) {
      s = s.slice(0, e);
    } else {
      s += '0'.repeat(e);
    }

    return Integer.str(s);
  }

  /**
   * Converts anything to Integer.
   * @static
   * @method Integer.any
   * @param {!*} a
   * @return {!Integer}
   * @example
   *   Integer.any(0);         // 0
   *   Integer.any(1234567);   // 1234567
   *   Integer.any(-12.34567); // -12
   *   Integer.any("37");      // 37
   */
  public static any(a: any): Integer {
    if (typeof a === 'object') {
      if (a instanceof Integer) {
        return a.clone();
      }
      return new Integer();
    }

    if (typeof a === 'number') {
      a = +a;
      if (-0x7fffffff <= a && a <= 0x7fffffff) {
        return Integer.num(a);
      }

      a += '';
    }

    if (typeof a === 'string') {
      return Integer.exp(a);
    }

    return new Integer();
  }

  /**
   * @static
   * @method Integer.factorial
   * @param {!number} n
   * @return {!Integer}
   * @example
   *   Integer.factorial(3); // 1*2*3 = 6
   */
  public static factorial(n: int): Integer {
    n = n | 0;
    if (n < 1) {
      return Integer.one;
    }
    return Integer.factOdd(n).mul(Integer.factEven(n));
  }

  /**
   * @param {number} n
   * @return {!Integer}
   */
  public static factOdd(n: int): Integer {
    n = n | 0;

    let m: Integer = Integer.one;
    const limit: int = 1 << ((_SHIFT - 1) << 1);

    for (let i = 0;; i = i + 1 | 0) {
      const l = (n / (1 << i)) | 0;
      if (l < 3) { break; }

      let mi: int = 1;
      let mj: int = 1;
      for (let j: int = 3; (j | 0) <= (l | 0); j = j + 2 | 0) {
        mi = mi * j;
        if (mi > limit) {
          m = m.mul(Integer.num(mj));
          mi = mj = j;
        } else {
          mj = mi;
        }
      }

      if ((mj | 0) > 1) {
        m = m.mul(Integer.num(mj));
      }
    }

    return m;
  }

  /**
   * @private
   * @param {number} n
   * @return {!Integer}
   */
  public static factEven(n: number): Integer {
    n = n | 0;

    let s: int = 0;
    while (n) {
      n = n >>> 1;
      s = s + n;
    }

    return Integer.one.leftShift(s);
  }

  /**
   * Convert Integer to String.
   * @override
   * @method Integer#toString
   * @param {number=} [b=10] Base 2, 8, 10 or 16
   * @return {!string}
   */
  public toString(b: number = 10): string {
    let i: int = this._l;
    if (i < 2 && !this._d[0]) {
      return '0';
    }

    let j: number = 0;
    let hbase: number = 0;
    switch (b) {
    case 16:
      j = (i << 3) + 2 | 0;
      hbase = 0x10000;
      break;
    case 8:
      j = (i << 4) + 2 | 0;
      hbase = 0x1000;
      break;
    case 2:
      j = (i << 4) + 2 | 0;
      hbase = 0x10;
      break;
    case 10: default:
      j = (i * 241 / 50 | 0) + 2 | 0;
      hbase = 10000;
      break;
    }

    const digits: string = '0123456789abcdef';
    const t: Integer = this.clone();
    const d: Uint32Array = t._d;
    let s: string = '';

    while (i && j) {
      let k: number = i;
      let n: number = 0;
      while (k--) {
        n = (n << _SHIFT) | d[k];
        d[k] = n / hbase | 0;
        n = n % hbase | 0;
      }
      if (!d[i - 1]) { i = i - 1 | 0; }

      k = 4;
      while (k--) {
        s = digits.charAt(n % b | 0) + s;
        j = j - 1 | 0;
        n = n / b | 0;
        if (!i && !n) { break; }
      }
    }

    s = s.replace(/^0+/, '');
    if (!this._s) {
      s = `-${s}`;
    }

    return s;
  }

  /**
   * @method Integer#digits
   * @return {Uint32Array}
   */
  get digits(): Uint32Array {
    return this._d;
  }

  /**
   * @method Integer#capacity
   * @return {!number}
   */
  get capacity(): number {
    return this._d.length | 0;
  }

  /**
   * @method Integer#arrayLength
   * @return {!number}
   */
  get arrayLength(): number {
    return this._l | 0;
  }

  /**
   * @method Integer#sign
   * @return {!boolean}
   */
  get sign(): boolean {
    return this._s;
  }

  /**
   * @method Integer#sign
   * @param {!boolean} sign
   */
  set sign(sign: boolean) {
    this._s = !!sign;
  }

  /**
   * Copy Integer.
   * @method Integer#clone
   * @return {!Integer}
   */
  public clone(): Integer {
    const b: Integer = new Integer();
    b._s = this._s;
    b._l = this._l;
    b._d = new Uint32Array(this._l);
    b._d.set(this._d.subarray(0, this._l));

    return b;
  }

  /**
   * Add zeros and shift decimal.
   * @method Integer#addZero
   * @param {!number} b Number of zeros.
   * @return {!Integer} this * 10<sup>n</sup>
   */
  public addZero(b: number): Integer {
    b = b | 0;
    return Integer.str(this.toString() + '0'.repeat(b));
  }

  /**
   * <<
   * @method Integer#leftShift
   * @param {!number} b
   * @return {!Integer}
   */
  public leftShift(b: number): Integer {
    b = b | 0;

    const a: Integer = this;
    const ad: Uint32Array = a._d;
    const l: number = a._l | 0;
    const d: number = b / _SHIFT | 0;
    const cl: number = l + d + 1 | 0;
    const bb: number = b % _SHIFT;
    const c: Integer = Integer.alloc(cl, a._s);
    const cd: Uint32Array = c._d;

    for (let i: number = 0; (i | 0) < (d | 0); i = i + 1 | 0) {
      cd[i] = 0;
    }

    let carry: number = 0;
    let i: number = 0;
    for (; (i | 0) < (l | 0); i = i + 1 | 0) {
      const t: number = (ad[i] << bb) + carry;
      cd[i + d] = t & _MASK;
      carry = t >> _SHIFT;
    }
    cd[i + d] = carry;

    return c.norm();
  }

  /**
   * >>
   * @method Integer#rightShift
   * @param {!number} b
   * @return {!Integer}
   */
  public rightShift(b: number): Integer {
    const a: Integer = this;
    const ad: Uint32Array = a._d;
    const l: number = a._l;
    const d: number = b / _SHIFT | 0;

    if (l <= d) { return new Integer(); }

    const bb: number = b % _SHIFT;
    const mask: number = (1 << bb) - 1;
    const cl: number = l - d;
    const c: Integer = Integer.alloc(cl, a._s);
    const cd: Uint32Array = c._d;
    let i: number = 0;

    for (; i < cl - 1; i = i + 1) {
      cd[i] = ((ad[i + d + 1] & mask) << (_SHIFT - bb)) + (ad[i + d] >> bb);
    }
    cd[i] = ad[i + d] >> bb;

    return c.norm();
  }

  /**
   * @method Integer#isOdd
   * @return {!boolean}
   */
  public isOdd(): boolean { return !!(this._d[0] & 1); }

  /**
   * @method Integer#isEven
   * @return {!boolean}
   */
  public isEven(): boolean { return !(this._d[0] & 1); }

  /**
   * @method Integer#isNonZero
   * @return {!boolean}
   */
  public isNonZero(): boolean { return this._l > 1 || this._d[0] !== 0; }

  /**
   * Fast squaring.
   * @method Integer#square
   * @return {!Integer} this * this
   */
  public square(): Integer {
    const x: Uint32Array = this._d;
    const t: number = this._l;
    const s: Integer = Integer.alloc(t << 1, true);
    const w: Uint32Array = s._d;
    s.fillZero(s._l);

    for (let i: number = 0; i < t; i = i + 1) {
      let uv: number = w[i << 1] + x[i] * x[i];
      let u: number = uv >>> _SHIFT;
      let v: number = uv & _MASK;
      w[i << 1] = v;
      let c: number = u;

      for (let j: number = i + 1; j < t; j = j + 1) {
        // uv = w[i + j] + (x[j] * x[i] << 1) + c
        // can overflow.
        uv = x[j] * x[i];
        u = (uv >>> _SHIFT) << 1;
        v = (uv & _MASK) << 1;
        v += w[i + j] + c;
        u += v >>> _SHIFT;
        v = v & _MASK;
        w[i + j] = v;
        c = u;
      }

      w[i + t] = u;
    }

    return s.norm();
  }

  /**
   * Square root.
   * @method Integer#sqrt
   * @return {!Integer} <code>&radic;</code>this
   */
  public sqrt(): Integer {
    if (!this.isNonZero()) { return this; }

    let b = this.clone();
    let c = Integer.one;

    while (b.cmp(c) > 0) {
      b.half();
      c.double();
    }

    do {
      b = c.clone();
      c = this.divmod(c, false).add(c);
      c.half();
    } while (b.cmp(c) > 0);

    return b;
  }

  /**
   * Pow.
   * @method Integer#pow
   * @param {!number} b
   * @return {!Integer} this<sup>b</sup>
   */
  public pow(b: number): Integer {
    b = +b;
    if (b < 0 || Math.floor(b) !== b) {
      throw new Error('Not implemented pow(b) if b is neither natural number nor zero.');
    }
    if (!b) { return Integer.one; }
    if (this.equal(Integer.one)) { return Integer.one; }

    b = b | 0;
    let p = Integer.one;
    let a = this.clone();

    for (; b > 0; b >>= 1, a = a.square()) {
      if (b & 1) { p = p.mul(a); }
    }

    return p;
  }

  /**
   * Greatest Common Divisor.
   * @method Integer#gcd
   * @param {!Integer} b
   * @return {!Integer}
   */
  public gcd(b: Integer): Integer {
    if (!b.isNonZero()) { return this; }
    let c;
    let a = this.abs();

    while ((c = a.divmod(b, true)).isNonZero()) {
      a = b;
      b = c;
    }

    return b;
  }

  /**
   * Greatest Common Divisor.
   * @method Integer#gcdBin
   * @param {!Integer} b
   * @return {!Integer}
   */
  public gcdBin(b: Integer): Integer {
    if (this.cmpAbs(b) < 0) { return b.gcdBin(this); }
    if (!b.isNonZero()) { return this; }

    const g = Integer.one;
    let a = this.abs();
    b = b.abs();
    while (!(a._d[0] & 1) && !(b._d[0] & 1)) {
      a.half();
      b.half();
      g.double();
    }

    while (a.isNonZero()) {
      while (!(a._d[0] & 1)) {
        a.half();
      }

      while (!(b._d[0] & 1)) {
        b.half();
      }

      if (a.cmpAbs(b) < 0) {
        b = b.sub(a);
        b.half();
      } else {
        a = a.sub(b);
        a.half();
      }
    }

    return g.mul(b);
  }

  /**
   * Add absolute values of Integer.
   * @method Integer#addAbs
   * @param {!Integer} b
   * @param {boolean} sign
   * @return {!Integer}
   *        |this| + |b| (sign == true)
   *      -(|this| + |b|) (else)
   */
  public addAbs(b: Integer, sign: boolean): Integer {
    if (this._l < b._l) {
      return b.addAbs(this, sign);
    }

    const ad = this._d;
    const bd = b._d;
    const al = this._l;
    const bl = b._l;
    const z = Integer.alloc(al + 1, sign);
    const zd = z._d;
    let i = 0;
    let num = 0;

    for (; i < bl; i = i + 1) {
      num += ad[i] + bd[i];
      zd[i] = num & _MASK;
      num >>>= _SHIFT;
    }
    for (; num && i < al; i = i + 1) {
      num += ad[i];
      zd[i] = num & _MASK;
      num >>>= _SHIFT;
    }
    for (; i < al; i = i + 1) {
      zd[i] = ad[i];
    }
    zd[i] = num & _MASK;
    // console.log(z);

    return z.norm();
  }

  /**
   * Subtract absolute values of Integer.
   * @method Integer#subAbs
   * @param {!Integer} b
   * @param {boolean} sign
   * @return {!Integer}
   *      ||this| - |b|| (sign == true)
   *     -||this| - |b|| (else)
   */
  public subAbs(b: Integer, sign: boolean): Integer {
    const ad = this._d;
    const bd = b._d;
    const al = this._l;
    const bl = b._l;
    const z = Integer.alloc(al, sign);
    const zd = z._d;
    let i = 0;
    let c = 0;

    for (; i < bl; i = i + 1) {
      c = ad[i] - bd[i] - c;
      if (c < 0) {
        zd[i] = c & _MASK;
        c = 1;
      } else {
        zd[i] = c;
        c = 0;
      }
    }

    for (; i < al; i = i + 1) {
      c = ad[i] - c;
      if (c < 0) {
        zd[i] = c & _MASK;
        c = 1;
      } else {
        zd[i] = c;
        c = 0;
      }
    }

    return z.norm();
  }

  /**
   * Addition.
   * @method Integer#add
   * @param {!Integer} b
   * @return {!Integer} this + b
   */
  public add(b: Integer): Integer {
    if (this._s !== b._s) {
      if (this.cmpAbs(b) < 0) {
        return b.subAbs(this, b._s);
      }

      return this.subAbs(b, this._s);
    }

    return this.addAbs(b, this._s);
  }

  /**
   * Subtraction.
   * @method Integer#sub
   * @param {!Integer} b
   * @return {!Integer} this - b
   */
  public sub(b: Integer): Integer {
    if (this._s === b._s) {
      if (this.cmpAbs(b) < 0) {
          return b.subAbs(this, !b._s);
      }

      return this.subAbs(b, this._s);
    }

    return this.addAbs(b, this._s);
  }

  /**
   * Multiplication.
   * @method Integer#mul
   * @param {!Integer} b
   * @return {!Integer} this * b
   */
  public mul(b: Integer): Integer {
    // if (this.equal(b)) { return this.square(); }

    const ad: Uint32Array = this._d;
    const bd: Uint32Array = b._d;
    const al: number = this._l | 0;
    const bl: number = b._l | 0;
    // if (al > 125 && bl > 125) { return longK(this, b); }

    const abl: number = al + bl | 0;
    const z: Integer = Integer.alloc(abl, this._s === b._s);

    z.fillZero(abl);
    for (let i = 0, j = 0, n = 0, d = 0, e = 0, zd = z._d;
        (i | 0) < (al | 0); i = i + 1 | 0) {
      d = ad[i];
      if (!d) { continue; }

      n = 0;
      for (j = 0; (j | 0) < (bl | 0); j = j + 1 | 0) {
        e = n + d * bd[j];
        n = zd[i + j] + e;
        if (e) { zd[i + j] = n & _MASK; }
        n >>>= _SHIFT;
      }

      if (n) { zd[i + j] = n | 0; }
    }

    return z.norm();
  }

  /**
   * Multiplication with karatsuba method.
   * @method Integer#kmul
   * @param {!Integer} y
   * @return {!Integer} this * y
   */
  public kmul(y: Integer): Integer {
    const x = this;
    let N = x.bitLength();
    const l = y.bitLength();

    if (N < l) { N = l; }
    if (N < 2001) { return x.mul(y); }

    // number of bits divided by 2, rounded up
    N = (N >>> 1) + (N & 1);

    // x = a + b 2^N, y = c + d 2^N
    const b = x.rightShift(N);
    const a = x.sub(b.leftShift(N));
    const d = y.rightShift(N);
    const c = y.sub(d.leftShift(N));
    const ac = a.kmul(c);
    const bd = b.kmul(d);
    const abcd = a.add(b).kmul(c.add(d));

    // xy
    // = (a + 2^N b) (c + 2^N d)
    // = ac + 2^N ((a + b) (c + d) - ac - bd) + 2^(N + 1) bd
    return ac.add(abcd.sub(ac).sub(bd).leftShift(N)).add(bd.leftShift(N << 1));
  }

  /**
   * Division or Mod.
   * @method Integer#divmod
   * @param {!Integer} b
   * @param {boolean=} modulus If true then mod, else div.
   * @throws {Error} zero division
   * @return {!Integer}
   *     this % b (modulus == true)
   *     this / b (else)
   */
  public divmod(b: Integer, modulus: boolean): Integer {
    const a = this;
    const ad = a._d;
    let bd = b._d;
    const na = a._l;
    const nb = b._l;

    if (nb < 2 && !bd[0]) {
      // zero division
      throw new Error('zero division');
    }

    const albl = na === nb;
    if (na < nb || (albl && ad[na - 1] < bd[nb - 1])) {
      if (modulus) { return a; }
      return new Integer();
    }

    let t = 0;
    if (nb === 1) {
      const dd = bd[0];
      const z = a.clone();
      const zd = z._d;
      let i = na;

      while (i--) {
        t = ((t << _SHIFT) | zd[i]) >>> 0;
        zd[i] = (t / dd) & _MASK;
        t %= dd;
      }

      if (modulus) {
        if (!a._s) { return Integer.num(-t); }

        return Integer.num(t);
      }

      z._s = a._s === b._s;
      return z.norm();
    }

    const z = Integer.alloc(albl ? na + 2 : na + 1, a._s === b._s);
    let zd = z._d;
    z.fillZero(z._l);
    const dd = _BASE / (bd[nb - 1] + 1) & _MASK;

    let j = 0;
    let num = 0;
    if (dd === 1) {
      j = na;
      while (j--) { zd[j] = ad[j]; }
    } else {
      const bb = b.clone();
      const td = bb._d;

      for (; j < nb; j = j + 1) {
        num += bd[j] * dd;
        td[j] = num & _MASK;
        num >>>= _SHIFT;
      }

      bd = td;
      j = num = 0;

      for (; j < na; j = j + 1) {
        num += ad[j] * dd;
        zd[j] = num & _MASK;
        num >>>= _SHIFT;
      }

      zd[j] = num & _MASK;
    }

    let i = 0;
    let q = 0;
    let ee = 0;
    j = albl ? na + 1 : na;
    do {
      if (zd[j] === bd[nb - 1]) {
        q = _MASK;
      } else {
        q = (((zd[j] << _SHIFT) | zd[j - 1]) >>> 0) / bd[nb - 1] & _MASK;
      }

      if (q) {
        i = num = t = 0;
        do {
          t += bd[i] * q;
          ee = (t & _MASK) - num;
          num = zd[j - nb + i] - ee;
          if (ee) { zd[j - nb + i] = num & _MASK; }
          num >>= _SHIFT;
          t >>>= _SHIFT;
        } while (++i < nb);

        num += zd[j - nb + i] - t;
        while (num) {
          i = num = 0;
          q = q - 1;

          do {
            ee = num + bd[i];
            num = zd[j - nb + i] + ee;
            if (ee) { zd[j - nb + i] = num & _MASK; }
            num >>= _SHIFT;
          } while (++i < nb);

          num = num - 1;
        }
      }

      zd[j] = q;
    } while (--j >= nb);

    const div = z.clone();
    zd = div._d;
    if (modulus) {
      if (dd) {
        t = 0;
        i = nb;
        while (i--) {
          t = ((t << _SHIFT) | zd[i]) >>> 0;
          zd[i] = (t / dd) & _MASK;
          t %= dd;
        }
      }
      div._l = nb;
      div._s = a._s;

      return div.norm();
    }

    j = (albl ? na + 2 : na + 1) - nb;
    for (i = 0; i < j; i = i + 1) { zd[i] = zd[i + nb]; }
    div._l = j;

    return div.norm();
  }

  /**
   * Division.
   * @method Integer#div
   * @param {!Integer} b
   * @return {!Integer} this / b
   */
  public div(b: Integer): Integer {
    return this.divmod(b, false);
  }

  /**
   * Modulo.
   * @method Integer#mod
   * @param {!Integer} b
   * @return {!Integer} this % b
   */
  public mod(b: Integer): Integer {
    return this.divmod(b, true);
  }

  /**
   * Compare between two absolute values of Integer objects.
   * @method Integer#cmpAbs
   * @param {!Integer} b
   * @return {!number}
   *      -1 (|this| < |b|)
   *       0 (|this| = |b|)
   *       1 (|this| > |b|)
   */
  public cmpAbs(b: Integer): number {
    if (this === b) { return 0; }

    const ad = this._d;
    const bd = b._d;
    let al = this._l;
    const bl = b._l;

    if (al < bl) { return -1; }
    if (al > bl) { return 1; }

    do { al = al - 1; } while (al && ad[al] === bd[al]);
    if (!al && ad[0] === bd[0]) { return 0; }

    return ad[al] > bd[al] ? 1 : -1;
  }

  /**
   * Compare between two Integer.
   * @method Integer#cmp
   * @param {!Integer} b
   * @return {!number}
   *     -1 (this < b)
   *      0 (this = b)
   *      1 (this > b)
   */
  public cmp(b: Integer): number {
    if (this === b) { return 0; }
    if (this._s !== b._s) { return this._s ? 1 : -1; }

    const ad = this._d;
    const bd = b._d;
    let al = this._l;
    const bl = b._l;

    if (al < bl) { return this._s ? -1 : 1; }
    if (al > bl) { return this._s ? 1 : -1; }

    do { al = al - 1; } while (al && ad[al] === bd[al]);
    if (!al && ad[0] === bd[0]) {
      return (this._s ? 1 : 0) - (b._s ? 1 : 0);
    }

    if (ad[al] > bd[al]) { return this._s ? 1 : -1; }
    return this._s ? -1 : 1;
  }

  /**
   * ==
   * @method Integer#eq
   * @param {!Integer} b
   * @return {!boolean}
   */
  public eq(b: Integer): boolean {
    if (this === b) { return true; }

    b = Integer.any(b);
    if (this._s !== b._s) { return false; }

    const ad = this._d;
    const bd = b._d;
    const l = this._l;
    if (l !== b._l) { return false; }

    for (let i = 0; i < l; i = i + 1) {
      if (ad[i] !== bd[i]) { return false; }
    }

    return true;
  }

  /**
   * ===
   * @method Integer#equal
   * @param {!Integer} b
   * @return {!boolean}
   */
  public equal(b: Integer): boolean {
    if (this === b) { return true; }
    if (!(b instanceof Integer)) { return false; }
    if (this._s !== b._s) { return false; }

    const ad = this._d;
    const bd = b._d;
    const l = this._l;
    if (l !== b._l) { return false; }

    for (let i = 0; i < l; i = i + 1) {
      if (ad[i] !== bd[i]) { return false; }
    }

    return true;
  }

  /**
   * Absolute Integer.
   * @method Integer#abs
   * @return {!Integer} |this|.
   */
  public abs(): Integer {
    const z = this.clone();
    z._s = true;
    return z;
  }

  /**
   * Negate Integer.
   * @method Integer#neg
   * @return {!Integer} -this.
   */
  public neg(): Integer {
    const z = this.clone();
    if (z.isNonZero()) { z._s = !z._s; }
    return z;
  }

  /**
   * Get length of bit
   * @return {!number}
   */
  public bitLength(): number {
    const d = this._d;
    const l = this._l;
    return d[l - 1].toString(2).length + ((l - 1) << 4);
  }

  /**
   * Right shift by 1.
   * @return {!Integer} a >> 1
   */
  public half(): Integer {
    const a: Integer = this;
    const d: Uint32Array = a._d;
    const l: number = a._l - 1;

    for (let i: number = 0; i < l; i = i + 1) {
      d[i] = (((d[i + 1] & 1) << _SHIFT) + d[i]) >>> 1;
    }
    d[l] >>>= 1;

    return a.norm();
  }

  /**
   * Left shift by 1.
   * @return {!Integer} a << 1
   */
  public double(): Integer {
    const a: Integer = this;
    const d: Uint32Array = a._d;
    const l: number = a._l;

    let c = 0;
    for (let i: number = 0; i < l; i = i + 1) {
      const t: number = (d[i] << 1) + c;
      d[i] = t & _MASK;
      c = t >>> _SHIFT;
    }
    if (c) {
      if (l >= a._d.length) {
        const ta = new Uint32Array(l);
        ta.set(d);
        ta[l] = c;
        a._d = ta;
      } else {
        d[l] = c;
      }
      a._l = a._l + 1;
    }

    return a.norm();
  }

  /**
   * Delete following zeros. [2, 0, 1, 0, 0] -> [2, 0, 1]
   * @return {!Integer}
   */
  protected norm(): Integer {
    const a = this;
    const d = a._d;
    let l = a._l | 0;

    do { l = l - 1 | 0; } while (l && !d[l]);
    a._l = l + 1 | 0;

    // -0 -> +0
    if (!l && !d[l]) { a._s = true; }

    return a;
  }

  /**
   * Assign zero to initialize.
   * @param {!number} n Length.
   * @return {!Integer}
   */
  protected fillZero(n: number): Integer {
    n = n | 0;
    if (n < 0) {
      throw new RangeError(`Integer#fillZero(n): n must >= 0 but ${n}`);
    }

    const a = this;
    const d = a._d;
    while (n--) { d[n] = 0; }

    return a;
  }

  /**
   * Set length.
   * @private
   * @param {!number} length
   * @param {boolean=} sign
   * @return {!Integer}
   */
  protected static alloc(length: number, sign: boolean): Integer {
    length = length | 0;

    const a: Integer = new Integer();
    a._s = sign ? true : false;
    a._l = length;
    a._d = new Uint32Array(length);

    return a;
  }
}
