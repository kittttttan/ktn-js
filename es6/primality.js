/**
 * Generate Prime Number List in JavaScript
 */

/**
 * Primality
 * @class Primality
 */
export class Primality {
  /**
   * @return {!Iterator}
   */
  static generate() {
    return (function*() {
      let list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      for (let n of list) {
        yield n;
      }

      let len = list.length;
      let init = list[len - 1] + 2;
      for (let i = init, f;; i += 2) {
        for (let j = 1, lj; (lj = list[j]) * lj <= i; ++j) {
          f = true;
          if (!(i % lj)) {
            f = false;
            break;
          }
        }
        if (f) {
          list[len++] = i;
          yield i;
        }
      }
    }());
  }

  /**
   * @param {!number} n
   * @return {!Iterator}
   */
  static top(n) {
    const generate = this.generate;
    return (function*() {
      if (n < 1) {
        throw new Error('argument[0] must > 0');
      }
      let g = generate();
      while (n--) {
        yield g.next().value;
      }
    }());
  }

  /**
   * @param {!number} n
   * @return {!Iterator}
   */
  static max(n) {
    const generate = this.generate;
    return (function*() {
      let g = generate();
      let f = g.next().value;
      while (f < n) {
        yield f;
        f = g.next().value;
      }
    }());
  }

  /**
   * @param {!number} n
   * @return {!Iterator}
   */
  static sieveMax(n) {
    return (function*() {
      let s = [false, false];
      let sqrtn = Math.sqrt(n) | 0;
      for (let i = 2; i < n + 1; ++i) {
        s[i] = true;
      }
      for (let i = 2; i < sqrtn + 1; ++i) {
        if (s[i]) {
          for (let j = i * i; j < n + 1; j += i) {
            s[j] = false;
          }
        }
      }
      for (let i = 0; i < n + 1; ++i) {
        if (s[i]) {
          yield i;
        }
      }
    }());
  }

  /**
   * @param {!number} base
   * @param {!number} power
   * @param {!number} mod
   * @return {!number}
   */
  static modMathPow(base, power, mod) {
    var result = 1;
    while (power > 0) {
      if (power & 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      power >>= 1;
    }
    return result;
  }

  /**
   * Miller–Rabin primality test
   * @param {!number} n
   * @return {!boolean} true if probably prime
   */
  static mrpt(n) {
    if (isNaN(n) || n < 2) {
      return false;
    }
    if (n === 2) {
      return true;
    }
    if (!(n & 1)) {
      return false;
    }

    const random = Math.random;
    const modMathPow = this.modMathPow;

    var d = n - 1;
    while (!(d & 1)) {
      d >>= 1;
    }
    var i = 20, a, t, y;
    while (i--) {
      a = (random() * (n - 2) | 0) + 1;
      t = d;
      y = modMathPow(a, t, n);
      while (t !== n - 1 && y !== 1 && y !== n - 1) {
        y = (y * y) % n;
        t <<= 1;
      }
      if (y !== n - 1 && !(t & 1)) {
        return false;
      }
    }
    return true;
  }
};
