/**
 * statistics
 */

function sortNum(arr) {
  return arr.sort((a, b) => a - b);
}

function median(arr) {
  return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[(arr.length - 1) / 2 | 0];
}

function midrange(arr) {
  const a = Reflect.apply(Array.prototype.concat, undefined, arr);
  return (a[0] + a[a.length - 1]) / 2;
}

//Arithmetic mean
function amean(arr) {
  let s = 0;
  const l = arr.length;
  let i = l;
  while (i--) {
    s += arr[i];
  }
  return s / l;
}

//Geometric mean
function gmean(arr) {
  let s = 1;
  const l = arr.length;
  let i = l;
  while (i--) {
    s *= arr[i];
  }
  return Math.pow(s, 1.0 / l);
}

//Harmonic mean
function hmean(arr) {
  let s = 0;
  let i = arr.length;
  while (i--) {
    s += 1.0 / arr[i];
  }
  return l / s;
}

//Generalized mean
function genmean(arr, p) {
  if (!p) { return gmean(arr); }
  if (p === -Infinity) {
    return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[0];
  }
  if (p === Infinity) {
    return sortNum(Reflect.apply(Array.prototype.concat, undefined, arr))[arr.length - 1];
  }
  let s = 0;
  let i = arr.length;
  while (i--) {
    s += Math.pow(arr[i], p);
  }
  return Math.pow(s / l, 1.0 / p);
}

function variance(arr) {
  let [s, s2] = [0, 0];
  let i = arr.length;
  while (i--) {
    s += arr[i];
    s2 += arr[i] * arr[i];
  }
  return (s2 * l - s * s) / (l * l);
}

/**
 * Permutation
 * @param {number} n
 * @param {number} m
 * @param {boolean} mode if true then use Long
 * @param {number|Long}
 */
function nPm(n, m, mode) {
  if (n < 0) { return undefined; }
  m = m || 0;
  let a;
  if (mode) {
    a = new Long(1);
    while (n - m > 0) { a = mul(a, n--); }
    return a;
  }
  a = 1;
  while (n - m > 0) { a *= n--; }
  return a;
}

/**
 * Combination
 * @param {number} n
 * @param {number} m
 * @param {boolean} mode if true then use Long
 * @param {number|Long}
 */
function nCm(n, m, mode) {
  if (mode) {
    return (n < m || m < 0) ? 0 :
      div(fact(n), mul(fact(n - m), fact(m)));
  }
  return (n < m || m < 0) ? 0 :
    fact(n) / (fact(n - m) * fact(m));
}

/**
 * @class Triangular
 */
export class Triangular {
  constructor(low, high, mode) {
    this._low = low || 0.0;
    this._high = high || 1.0;
    this._mode = mode || .5;
  }

  toString() {
    return `Triangular(${this._low}, ${this._high}, ${this._mode})`;
  }

  valueOf() {
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

  gen(n) {
    n = n || 1;
    let u;
    const arr = [];
    const m = this._mode;
    let l = this._low;
    let h = this._high;
    let c = (m - l) / (h - l);
    for (let i = 0; i < n; i++) {
      u = Math.random();
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
 * @class Be
 */
export class Be {
  /**
   * @param {number} p 0 <= p <= 1
   */
  constructor(p) {
    this.p = (p > 1) ? 1 :
             (p > 0) ? p : 0;
  }

  toString() {
    return `Be(${this.p})`;
  }

  P() {
    return this.p;
  }

  E() {
    return this.p;
  }

  V() {
    return this.p * (1 - this.p);
  }

  gen(n) {
    n = n || 1;
    const arr = [];
    while (n--) {
      const r = Math.random();
      arr[i] = (r > this.p ? 0 : 1);
    }
    return arr;
  }
}

/**
 * Binomial distribution
 * @class B
 */
export class B {
  /**
   * @param {number} n n > 0
   * @param {number} p 0 <= p <= 1
   */
  constructor(n, p) {
    n |= 0;
    this.n = n;
    this.p = (p > 1) ? 1 :
             (p > 0) ? p : 0;
  }

  toString() {
    return `B(${this.n}, ${this.p})`;
  }

  P(k) {
    return nCm(this.n, k) * Math.pow(this.p, k) *
           Math.pow(1 - this.p, this.n - k);
  }

  E() {
    return this.n * this.p;
  }

  V() {
    return this.n * this.p * (1 - this.p);
  }

  gen(n) {
    n = n || 1;
    let i = n;
    const arr = [];
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
 * @class Exp
 */
export class Exp {
  /**
   * @param {number} l l > 0
   */
  constructor(l) {
    this.l = (l > 0) ? l : 1;
  }

  toString() {
    return `Exp(${this.l})`;
  }

  P(x) {
    return 1 - Math.pow(Math.E, -this.l * x);
  }

  E() {
    return 1.0 / this.l;
  }

  V() {
    return 1.0 / (this.l * this.l);
  }

  gen(n) {
    n = n || 1;
    let i = n;
    const arr = [];
    while (i--) {
      let r = Math.random();
      while (r <= 1e-7) { r = Math.random(); }
      arr[i] = -Math.log(r) / this.l;
    }
    return arr;
  }
}

/**
 * error function
 * erf(x) = 2/\sqrt{\pi} \int_{x}^{0} e^[-t^2} dt
 */
function erf(x) {
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
 * Normal distribution
 * @class Norm
 */
export class Norm {
  /**
   * Normal distribution
   * @param {number} m
   * @param {number} s
   */
  constructor(m, s) {
    this.m = m;
    this.s = s;
  }

  /**
   * @override
   * @return {string}
   */
  toString() {
    return `Norm(${this.m},${this.s})`;
  }

  P(x) {
    return 0.5 * (1 + erf((x - this.m) / (this.s * 1.4142135623730951)));
    // Math.sqrt(2) = 1.4142135623730951
  }

  E() {
    return this.m;
  }

  V() {
    return this.s * this.s;
  }

  gen(n) {
    n = n || 1;
    const arr = [];
    let i = n;
    let z;
    while (i--) {
      while (true) {
        const r1 = Math.random();
        const r2 = 1 - Math.random();
        z = 1.7155277699214135 * (r1 - 0.5) / r2;
        // 4 * exp(-0.5)/sqrt(2.0) = 1.7155277699214135
        const zz = z * z / 4.0;
        if (zz <= -Math.log(r2)) {break;}
      }
      arr[i] = this.m + z * this.s;
    }
    return arr;
  }
}
