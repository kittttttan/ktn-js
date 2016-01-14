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
    return (function *() {
      const list: number[] = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
      for (const n of list) {
        yield n;
      }

      let len: number = list.length;
      const init: number = list[len - 1] + 2;
      for (let i: number = init; ; i += 2) {
        let f: boolean;
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
  static top(n: number) {
    const generate = this.generate;
    return (function *() {
      if (n < 1) {
        throw new Error('argument[0] must > 0');
      }
      const g = generate();
      while (n--) {
        yield g.next().value;
      }
    }());
  }

  /**
   * @param {!number} n
   * @return {!Iterator}
   */
  static max(n: number) {
    const generate = this.generate;
    return (function *() {
      const g = generate();
      let f: number = g.next().value;
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
  static sieveMax(n: number) {
    return (function *() {
      const s: boolean[] = [false, false];
      const sqrtn: number = Math.sqrt(n) | 0;
      for (let i: number = 2; i < n + 1; ++i) {
        s[i] = true;
      }
      for (let i: number = 2; i < sqrtn + 1; ++i) {
        if (s[i]) {
          for (let j: number = i * i; j < n + 1; j += i) {
            s[j] = false;
          }
        }
      }
      for (let i: number = 0; i < n + 1; ++i) {
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
  static modMathPow(base: number, power: number, mod: number): number {
    let result = 1;
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
  static mrpt(n: number): boolean {
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

    let d = n - 1;
    while (!(d & 1)) {
      d >>= 1;
    }
    let i = 20, a, t, y;
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
}
