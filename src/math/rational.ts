/**
 * Rational
 */

import {BMath} from './bmath';

/**
 * Rational
 *
 * @class Rational
 * @property {bigint} Rational#_n Numerator
 * @property {bigint} Rational#_d Denominator
 */
export class Rational {
  protected _n: bigint;
  protected _d: bigint;

  /**
   * @param {bigint} n
   * @param {bigint} d
   * @param {boolean=} f If f is true then skip cancel().
   */
  constructor(n: bigint, d: bigint, f?: boolean) {
    if (d == 0n) {
      throw new RangeError('d = 0');
    }
    if (f) {
      this._n = n;
      this._d = d;
    } else {
      const t: bigint[] = n != 0n ? Rational.cancel(n, d) : [0n, 1n];
      this._n = t[0];
      this._d = t[1];
    }
  }

  /**
   * 1
   * @static
   * @method Rational.one
   * @return {Rational} 1
   */
  static get one(): Rational {
    return new Rational(1n, 1n, true);
  }

  /**
   * 0
   * @static
   * @method Rational.zero
   * @return {Rational} 0
   */
  static get zero(): Rational {
    return new Rational(0n, 1n, true);
  }

  /**
   * Convert Number to Rational.
   * @static
   * @method Rational.num
   * @param {bigint} a Numerator
   * @param {bigint=} b Denominator
   * @param {boolean=} c
   * @return {Rational}
   */
  public static num(a: bigint, b?: bigint, c?: boolean): Rational {
    if (!b) {
      return new Rational(a, 1n, true);
    }
    return new Rational(a, b, c);
  }

  /**
   * Convert String to Rational.
   * @static
   * @method Rational.str
   * @param {string} a ex.'-1/2', '0.1/1.02'.
   * @return {Rational}
   */
  public static str(a: string): Rational {
    const as: string[] = a.split('/');
    as[1] = as[1] || '1';

    // sign
    const [s1, s2]: boolean[] = [as[0][0] === '-', as[1][0] === '-'];
    as[0] = as[0].replace(/[-+]/g, '');
    as[1] = as[1].replace(/[-+]/g, '');

    // dot
    const [d1, d2]: number[] = [as[0].indexOf('.'), as[1].indexOf('.')];
    const [l1, l2]: number[] = [d1 < 0 ? 0 : as[0].length - d1 - 1, d2 < 0 ? 0 : as[1].length - d2 - 1];
    as[0] = as[0].replace('.', '').replace(/^0*(\d+)$/, '$1');
    as[1] = as[1].replace('.', '').replace(/^0*(\d+)$/, '$1');
    if (l1 > l2) {
      as[1] = `${as[1]}${'0'.repeat(l1 - l2)}`;
    } else if (l1 < l2) {
      as[0] = `${as[0]}${'0'.repeat(l2 - l1)}`;
    }

    // sign
    if (s1 !== s2) {
      as[0] = `-${as[0]}`;
    }

    return new Rational(BigInt(as[0]), BigInt(as[1]));
  }

  /**
   * Convert anything to Rational.
   * @static
   * @method Rational.any
   * @param {any} a
   * @param {any=} b
   * @throws {Error} ZeroDivisionError
   * @return {Rational}
   */
  public static any(a: any, b?: any): Rational {
    if (!arguments.length) {
      return Rational.zero;
    }
    if (arguments.length === 1) {
      if (a instanceof Rational) { return a.clone(); }
      if (typeof a === 'string') { return Rational.str(a); }
      return new Rational(BigInt(a), 1n, true);
    }
    if (!b) {
      throw new Error('zero division');
    }
    if (!a) { return Rational.zero; }
    return new Rational(BigInt(a), BigInt(b));
  }

  /**
   * @static
   * @method Rational.cancel
   * @param {bigint} a
   * @param {bigint} b
   * @return {bigint[]}
   */
  public static cancel(a: bigint, b: bigint): bigint[] {
    const g: bigint = BMath.gcd(BMath.abs(a), BMath.abs(b));
    a /= g;
    b /= g;
    if (b < 0n) {
      a = -a;
      b = -b;
    }
    return [a, b];
  }

  /**
   * @method Rational#clone
   * @return {Rational}
   */
  public clone(): Rational {
    return new Rational(this._n, this._d, true);
  }

  /**
   * @method Rational#toString
   * @return {string}
   */
  public toString(): string {
    if (this._n == 0n) { return '0'; }
    if (this._d == 1n) { return this._n.toString(); }
    return `${this._n}/${this._d}`;
  }

  /**
   * @method Rational#html
   * @return {string}
   */
  public html(): string {
    return this.toString();
  }

  /**
   * @method Rational#tex
   * @return {string}
   */
  public tex(): string {
    // if (this._d == 1) {return this._n.toString();}
    return `\\frac{${this._n}}{${this._d}}`;
  }

  get sign(): boolean {
    return this._n >= 0n;
  }

  /**
   * @method Rational#abs
   * @return {Rational} |this|.
   */
  public abs(): Rational {
    const n: bigint = this._n < 0n ? -this._n : this._n;
    return new Rational(n, this._d, true);
  }

  /**
   * @method Rational#neg
   * @return {Rational} -this.
   */
  public neg(): Rational {
    return new Rational(-this._n, this._d, true);
  }

  /**
   * @method Rational#eq
   * @param {any?} b
   * @return {boolean} this == b.
   */
  public eq(b: any): boolean {
    b = Rational.any(b);
    if (this._n == b._n && this._d == b._d) { return true; }
    return false;
  }

  /**
   * @method Rational#equal
   * @param {Rational} b
   * @return {boolean} this === b.
   */
  public equal(b: Rational): boolean {
    if (!(b instanceof Rational)) { return false; }
    if (this._n == b._n && this._d == b._d) { return true; }
    return false;
  }

  /**
   * @method Rational#cmp
   * @param {Rational} b
   * @return {number}
   *   1 (this > b)
   *   0 (this = b)
   *  -1 (this < b).
   */
  public cmp(b: Rational): number {
    const m = this._n * b._d;
    const n = this._d * b._n;
    if (m > n) { return 1; }
    if (m < n) { return -1; }
    return 0;
  }

  /**
   * Multiplicative inverse (or reciprocal)
   * @method Rational#inv
   * @return {Rational}
   */
  public inv(): Rational {
    const n: bigint = this._n;
    const d: bigint = this._d;
    if (n == 0n) {
      throw new Error('zero division');
    }
    if (n < 0n) {
      return new Rational(-d, -n, true);
    }
    return new Rational(d, n, true);
  }

  /**
   * @method Rational#add
   * @param {Rational} b
   * @return {Rational} this + b.
   */
  public add(b: Rational): Rational {
    return new Rational(
        this._n * b._d + this._d * b._n,
        this._d * b._d);
  }

  /**
   * @method Rational#sub
   * @param {Rational} b
   * @return {Rational} this - b.
   */
  public sub(b: Rational): Rational {
    return new Rational(
        this._n * b._d - this._d * b._n,
        this._d * b._d);
  }

  /**
   * @method Rational#mul
   * @param {Rational} b
   * @return {Rational} this * b.
   */
  public mul(b: Rational): Rational {
    return new Rational(this._n * b._n, this._d * b._d);
  }

  /**
   * @method Rational#div
   * @param {Rational} b
   * @return {Rational} this / b.
   */
  public div(b: Rational): Rational {
    return new Rational(this._n * b._d, this._d * b._n);
  }

  /**
   * @method Rational#pow
   * @param {bigint|Rational} n
   * @return {Rational} this ^ n.
   */
  public pow(n: bigint|Rational): Rational {
    let b: bigint;
    if (n instanceof Rational) {
      if (n._d == 1n) {
        b = n._n;
      } else {
        throw new RangeError('n must be integer');
      }
    } else {
      b = n;
    }
    return new Rational(this._n ** b, this._d ** b, true);
  }

  // public calc(): bigint|number {
  //   if (this._d == 1n) {
  //     return this._n;
  //   }
  //   return Number(this._n) / Number(this._d);
  // }
}
