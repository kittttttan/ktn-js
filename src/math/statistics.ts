/**
 * factorial
 */
export function fact(a: number): number {
  a = a | 0;
  if (a < 2) { return 1; }
  let b = 1;
  while (a > 1) {
    b *= a--;
  }
  return b;
}

export function sortNum(arr: number[]): number[] {
  return arr.sort((a: number, b: number): number => a - b);
}

export function median(arr: number[]): number {
  // return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[(arr.length - 1) / 2 | 0];
  return sortNum(Array.prototype.concat.apply(arr))[(arr.length - 1) / 2 | 0];
}

export function midrange(arr: number[]): number {
  // const a = Reflect.apply(Array.prototype.concat, undefined, arr);
  const a: number[] = Array.prototype.concat.apply(arr);
  return (a[0] + a[a.length - 1]) / 2;
}

/**
 * arithmetic mean
 */
export function amean(arr: number[]): number {
  let s = 0;
  const l: number = arr.length;
  let i: number = l;
  while (i--) {
    s += arr[i];
  }
  return s / l;
}

/**
 * geometric mean
 */
export function gmean(arr: number[]): number {
  let s = 1;
  const l: number = arr.length;
  let i: number = l;
  while (i--) {
    s *= arr[i];
  }
  return Math.pow(s, 1.0 / l);
}

/**
 * Harmonic mean
 */
export function hmean(arr: number[]): number {
  let s = 0;
  const l: number = arr.length;
  let i: number = l;
  while (i--) {
    s += 1.0 / arr[i];
  }
  return l / s;
}

/**
 * Generalized mean
 */
export function genmean(arr: number[], p: number): number {
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
  const l: number = arr.length;
  let i: number = l;
  while (i--) {
    s += Math.pow(arr[i], p);
  }
  return Math.pow(s / l, 1.0 / p);
}

export function variance(arr: number[]): number {
  let [s, s2]: number[] = [0, 0];
  const l: number = arr.length;
  let i: number = l;
  while (i--) {
    s += arr[i];
    s2 += arr[i] * arr[i];
  }
  return (s2 * l - s * s) / (l * l);
}

/**
 * Permutation
 */
export function nPm(n: number, m: number): number {
  if (n < 0) { throw new Error(`nPm(n = ${n}, m = ${m}): n must not < 0`); }
  m = m || 0;
  let a = 1;
  while (n - m > 0) { a *= n--; }
  return a;
}

/**
 * Combination
 */
export function nCm(n: number, m: number): number {
  return (n < m || m < 0) ? 0 :
    fact(n) / (fact(n - m) * fact(m));
}

/**
 * error function
 * erf(x) = 2/\sqrt{\pi} \int_{x}^{0} e^[-t^2} dt
 */
export function erf(x: number): number {
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
  protected _low: number;
  protected _high: number;
  protected _mode: number;

  public constructor(low = 0.0, high = 1.0, mode = .5) {
    this._low = low;
    this._high = high;
    this._mode = mode;
  }

  public toString(): string {
    return `Triangular(${this._low}, ${this._high}, ${this._mode})`;
  }

  public valueOf(): number {
    let u: number = Math.random();
    let l: number = this._low;
    let h: number = this._high;
    const m: number = this._mode;
    let c: number = (m - l) / (h - l);
    if (u > c) {
      u = 1.0 - u;
      c = 1.0 - c;
      h = this._low;
      l = this._high;
    }
    return l + (h - l) * Math.pow(u * c, .5);
  }

  public gen(n = 1): number[] {
    const arr: number[] = [];
    const m: number = this._mode;
    let l: number = this._low;
    let h: number = this._high;
    let c: number = (m - l) / (h - l);
    for (let i = 0; i < n; i++) {
      let u: number = Math.random();
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
  protected p: number;
  /**
   * @param p 0 <= p <= 1
   */
  public constructor(p: number) {
    this.p = (p > 1) ? 1 :
      (p > 0) ? p : 0;
  }

  public toString(): string {
    return `Be(${this.p})`;
  }

  public P(): number {
    return this.p;
  }

  public E(): number {
    return this.p;
  }

  public V(): number {
    return this.p * (1 - this.p);
  }

  public gen(n = 1): number[] {
    const arr: number[] = [];
    while (n--) {
      const r: number = Math.random();
      arr[n] = (r > this.p ? 0 : 1);
    }
    return arr;
  }
}

/**
 * Binomial distribution
 */
export class B {
  protected n: number;
  protected p: number;
  /**
   * @param n n > 0
   * @param p 0 <= p <= 1
   */
  public constructor(n: number, p: number) {
    n |= 0;
    this.n = n;
    this.p = (p > 1) ? 1 :
      (p > 0) ? p : 0;
  }

  public toString(): string {
    return `B(${this.n}, ${this.p})`;
  }

  public P(k: number): number {
    return nCm(this.n, k) * Math.pow(this.p, k) *
      Math.pow(1 - this.p, this.n - k);
  }

  public E(): number {
    return this.n * this.p;
  }

  public V(): number {
    return this.n * this.p * (1 - this.p);
  }

  public gen(n = 1): number[] {
    let i: number = n;
    const arr: number[] = [];
    while (i--) {
      let p = 0;
      let j: number = this.n;
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
  protected l: number;
  /**
   * @param l l > 0
   */
  public constructor(l: number) {
    this.l = (l > 0) ? l : 1;
  }

  public toString(): string {
    return `Exp(${this.l})`;
  }

  public P(x: number): number {
    return 1 - Math.pow(Math.E, -this.l * x);
  }

  public E(): number {
    return 1.0 / this.l;
  }

  public V(): number {
    return 1.0 / (this.l * this.l);
  }

  public gen(n = 1): number[] {
    let i: number = n;
    const arr: number[] = [];
    while (i--) {
      let r: number = Math.random();
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
  protected m: number;
  protected s: number;
  /**
   * Normal distribution
   */
  public constructor(m: number, s: number) {
    this.m = m;
    this.s = s;
  }

  public toString(): string {
    return `Norm(${this.m},${this.s})`;
  }

  public P(x: number): number {
    return 0.5 * (1 + erf((x - this.m) / (this.s * 1.4142135623730951)));
    // Math.sqrt(2) = 1.4142135623730951
  }

  public E(): number {
    return this.m;
  }

  public V(): number {
    return this.s * this.s;
  }

  public gen(n = 1): number[] {
    const arr: number[] = [];
    let i: number = n;
    while (i--) {
      let z: number;
      for (; ;) {
        const r1: number = Math.random();
        const r2: number = 1 - Math.random();
        z = 1.7155277699214135 * (r1 - 0.5) / r2;
        // 4 * exp(-0.5)/sqrt(2.0) = 1.7155277699214135
        const zz: number = z * z / 4.0;
        if (zz <= -Math.log(r2)) {
          break;
        }
      }
      arr[i] = this.m + z * this.s;
    }
    return arr;
  }
}
