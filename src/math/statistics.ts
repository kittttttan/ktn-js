import type {int, uint, float} from '../types';

/**
 * factorial
 */
export function fact(a: int): int {
  a = a | 0;
  if (a < 2) { return 1; }
  let b = 1;
  while (a > 1) {
    b *= a--;
  }
  return b;
}

export function sortNum(arr: float[]): float[] {
  return arr.sort((a: float, b: float): float => a - b);
}

export function median(arr: float[]): float {
  // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[(arr.length - 1) / 2 | 0];
  return sortNum(Array.prototype.concat.apply(arr))[(arr.length - 1) / 2 | 0];
}

export function midrange(arr: float[]): float {
  // const a = Reflect.apply(Array.prototype.concat, undefined, arr);
  const a = Array.prototype.concat.apply(arr);
  return (a[0] + a[a.length - 1]) / 2;
}

/**
 * arithmetic mean
 */
export function amean(arr: float[]): float {
  let s = 0;
  const l = arr.length;
  let i = l;
  while (i--) {
    s += arr[i];
  }
  return s / l;
}

/**
 * geometric mean
 */
export function gmean(arr: float[]): float {
  let s = 1;
  const l = arr.length;
  let i = l;
  while (i--) {
    s *= arr[i];
  }
  return Math.pow(s, 1.0 / l);
}

/**
 * Harmonic mean
 */
export function hmean(arr: float[]): float {
  let s = 0;
  const l = arr.length;
  let i = l;
  while (i--) {
    s += 1.0 / arr[i];
  }
  return l / s;
}

/**
 * Generalized mean
 */
export function genmean(arr: float[], p: float): float {
  if (!p) { return gmean(arr); }
  if (p === -Infinity) {
    // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[0];
    return sortNum(Array.prototype.concat.apply(arr))[0];
  }
  if (p === Infinity) {
    // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[arr.length - 1];
    return sortNum(Array.prototype.concat.apply(arr))[arr.length - 1];
  }
  let s = 0;
  const l = arr.length;
  let i = l;
  while (i--) {
    s += Math.pow(arr[i], p);
  }
  return Math.pow(s / l, 1.0 / p);
}

export function variance(arr: float[]): float {
  let [s, s2] = [0, 0];
  const l = arr.length;
  let i = l;
  while (i--) {
    s += arr[i];
    s2 += arr[i] * arr[i];
  }
  return (s2 * l - s * s) / (l * l);
}

/**
 * Permutation
 */
export function nPm(n: uint, m: uint): uint {
  if (n < 0) { throw new Error(`nPm(n = ${n}, m = ${m}): n must not < 0`); }
  m = m || 0;
  let a = 1;
  while (n - m > 0) { a *= n--; }
  return a;
}

/**
 * Combination
 */
export function nCm(n: uint, m: uint): uint {
  return (n < m || m < 0) ? 0 :
    fact(n) / (fact(n - m) * fact(m));
}

/**
 * error function
 * erf(x) = 2/\sqrt{\pi} \int_{x}^{0} e^[-t^2} dt
 */
export function erf(x: float): float {
  if (x === 0) { return 0; }
  if (x === Infinity) { return 1; }
  if (x < 0) { return -erf(-x); }
  if (x < 2) {
    // return 1.1283791670955126 * Math.exp(-x * x) * (x + 2 * Math.pow(x, 3) / 3 + 4 * Math.pow(x, 5) / 15);
    // 2/Math.sqrt(Math.PI) = 1.1283791670955126
    return 1.1283791670955126
      * (x
        - Math.pow(x, 3) / 3
        + Math.pow(x, 5) / 10
        - Math.pow(x, 7) / 42
        + Math.pow(x, 9) / 216
        - Math.pow(x, 11) / 1320
        + Math.pow(x, 13) / 9360
        - Math.pow(x, 15) / 75600
        + Math.pow(x, 17) / 685440
        - Math.pow(x, 19) / 6894720
        + Math.pow(x, 21) / 76204800
        - Math.pow(x, 23) / 918086400
        + Math.pow(x, 25) / 11975040000
        - Math.pow(x, 27) / 168129561600
        + Math.pow(x, 29) / 2528170444800
        - Math.pow(x, 31) / 40537905408000
      );
  }
  return 1 - 0.5641895835477563 * Math.exp(-x * x)
    * (1 / x
      - 0.5 * Math.pow(x, -3)
      + 0.75 * Math.pow(x, -5)
      - 15 * Math.pow(x, -7) / 8
      - 105 * Math.pow(x, -9) / 16
      + 945 * Math.pow(x, -11) / 32
      - 10395 * Math.pow(x, -13) / 64
      + 135135 * Math.pow(x, -15) / 128
      - 2027025 * Math.pow(x, -17) / 256
    );
  // 1/Math.sqrt(Math.PI) = 0.5641895835477563
}

/**
 * Triangular
 */
export class Triangular {
  protected _low: float;
  protected _high: float;
  protected _mode: float;

  public constructor(low = 0.0, high = 1.0, mode = .5) {
    this._low = low;
    this._high = high;
    this._mode = mode;
  }

  public toString(): string {
    return `Triangular(${this._low}, ${this._high}, ${this._mode})`;
  }

  public valueOf(): float {
    let u = Math.random();
    let l = this._low;
    let h = this._high;
    const m = this._mode;
    let c = (m - l) / (h - l);
    if (u > c) {
      u = 1.0 - u;
      c = 1.0 - c;
      h = this._low;
      l = this._high;
    }
    return l + (h - l) * Math.pow(u * c, .5);
  }

  public gen(n = 1): float[] {
    const arr: float[] = [];
    const m = this._mode;
    let l = this._low;
    let h = this._high;
    let c = (m - l) / (h - l);
    for (let i = 0; i < n; i++) {
      let u = Math.random();
      if (u > c) {
        u = 1.0 - u;
        c = 1.0 - c;
        h = this._low;
        l = this._high;
      }
      arr[i] = l + (h - l) * Math.pow(u * c, .5);
    }
    return arr;
  }
}

/**
 * Bernoulli distribution
 */
export class Be {
  protected p: float;
  /**
   * @param p 0 <= p <= 1
   */
  public constructor(p: float) {
    this.p = (p > 1) ? 1 :
      (p > 0) ? p : 0;
  }

  public toString(): string {
    return `Be(${this.p})`;
  }

  public P(): float {
    return this.p;
  }

  public E(): float {
    return this.p;
  }

  public V(): float {
    return this.p * (1 - this.p);
  }

  public gen(n = 1): float[] {
    const arr: float[] = [];
    while (n--) {
      const r = Math.random();
      arr[n] = (r > this.p ? 0 : 1);
    }
    return arr;
  }
}

/**
 * Binomial distribution
 */
export class B {
  protected n: uint;
  protected p: float;
  /**
   * @param n n > 0
   * @param p 0 <= p <= 1
   */
  public constructor(n: uint, p: float) {
    n |= 0;
    this.n = n;
    this.p = (p > 1) ? 1 :
      (p > 0) ? p : 0;
  }

  public toString(): string {
    return `B(${this.n}, ${this.p})`;
  }

  public P(k: uint): float {
    return nCm(this.n, k) * Math.pow(this.p, k) *
      Math.pow(1 - this.p, this.n - k);
  }

  public E(): float {
    return this.n * this.p;
  }

  public V(): float {
    return this.n * this.p * (1 - this.p);
  }

  public gen(n = 1): float[] {
    let i = n;
    const arr: float[] = [];
    while (i--) {
      let p = 0;
      let j = this.n;
      while (j--) {
        if (Math.random() > this.p) {
          ++p;
        }
      }
      arr[i] = p;
    }
    return arr;
  }
}

/**
 * Exponential distribution
 */
export class Exp {
  protected l: float;
  /**
   * @param l l > 0
   */
  public constructor(l: float) {
    this.l = (l > 0) ? l : 1;
  }

  public toString(): string {
    return `Exp(${this.l})`;
  }

  public P(x: float): float {
    return 1 - Math.pow(Math.E, -this.l * x);
  }

  public E(): float {
    return 1.0 / this.l;
  }

  public V(): float {
    return 1.0 / (this.l * this.l);
  }

  public gen(n = 1): float[] {
    let i = n;
    const arr: float[] = [];
    while (i--) {
      let r = Math.random();
      while (r <= 1e-7) { r = Math.random(); }
      arr[i] = -Math.log(r) / this.l;
    }
    return arr;
  }
}

/**
 * Normal distribution
 */
export class Norm {
  protected m: float;
  protected s: float;
  /**
   * Normal distribution
   */
  public constructor(m: float, s: float) {
    this.m = m;
    this.s = s;
  }

  public toString(): string {
    return `Norm(${this.m},${this.s})`;
  }

  public P(x: float): float {
    return 0.5 * (1 + erf((x - this.m) / (this.s * 1.4142135623730951)));
    // Math.sqrt(2) = 1.4142135623730951
  }

  public E(): float {
    return this.m;
  }

  public V(): float {
    return this.s * this.s;
  }

  public gen(n = 1): float[] {
    const arr: float[] = [];
    let i = n;
    while (i--) {
      let z: float;
      for (; ;) {
        const r1 = Math.random();
        const r2 = 1 - Math.random();
        z = 1.7155277699214135 * (r1 - 0.5) / r2;
        // 4 * exp(-0.5)/sqrt(2.0) = 1.7155277699214135
        const zz = z * z / 4.0;
        if (zz <= -Math.log(r2)) {
          break;
        }
      }
      arr[i] = this.m + z * this.s;
    }
    return arr;
  }
}
