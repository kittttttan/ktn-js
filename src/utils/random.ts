/**
 * MT19937
 * @see ported from http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
 * @example
 *   var r = new Random();
 *   r.int32(); // for integer
 *   r.real2(); // for real number
 *   (r.real2() * 7 | 0) + 1; // 1 to 7
 */

const N = 624;
const M = 397;
const MATRIX_A = 0x9908b0df;

/**
 * most significant w-r bits
 */
const UPPER_MASK = 0x80000000;

/**
 * least significant r bits
 */
const LOWER_MASK = 0x7fffffff;

/**
 * 2^32
 */
const REV32 = 1.0 / 4294967296.0;

/**
 * 2^32-1
 */
const REV32_1 = 1.0 / 4294967295.0;

/**
 * Random
 */
export class Random {
  protected _mt: Uint32Array;
  protected _mti: number;

  /**
   * Initialize
   */
  constructor() {
    this._mt = new Uint32Array(N);

    /**
     * mti==N+1 means mt[N] is not initialized
     */
    this._mti = N + 1;

    const seed: number = Date.now() | 0;
    this.init(seed);
    // this.initByArray([seed], 1);
  }

  /**
   * initializes mt[N] with a seed
   */
  public init(seed: number): void {
    seed = seed | 0;

    const mt: Uint32Array = this._mt;
    mt[0] = seed;

    let s = 0;
    for (let i = 1; i < N; i = i + 1 | 0) {
      s = mt[i - 1] ^ (mt[i - 1] >>> 30);
      mt[i] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
          (s & 0x0000ffff) * 1812433253) + i;
      mt[i] >>>= 0;
    }

    this._mti = N;
  }

  /**
   * initialize by an array with array-length
   * @param initKey the array for initializing keys
   */
  public initByArray(initKey: number[]): void {
    this.init(19650218);

    let i = 1;
    let j = 0;
    const l: number = initKey.length;
    let k: number = N > l ? N : l;
    let s = 0;
    const mt: Uint32Array = this._mt;
    for (; k; --k) {
      s = mt[i - 1] ^ (mt[i - 1] >>> 30);
      mt[i] = (mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
          ((s & 0x0000ffff) * 1664525))) + initKey[j] + j; // non linear
      mt[i] >>>= 0; // for WORDSIZE > 32 machines
      ++i;
      ++j;
      if (i >= N) {
        mt[0] = mt[N - 1];
        i = 1;
      }
      if (j >= l) { j = 0; }
    }

    for (k = N - 1; k; --k) {
      s = mt[i - 1] ^ (mt[i - 1] >>> 30);
      mt[i] = (mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
          (s & 0x0000ffff) * 1566083941)) - i; // non linear
      mt[i] >>>= 0; // for WORDSIZE > 32 machines
      ++i;
      if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
    }

    mt[0] = 0x80000000; // MSB is 1; assuring non-zero initial array
  }

  /**
   * @return a random number on [0,0xffffffff]-interval
   */
  public int32(): number {
    const mag01: number[] = [];
    // const mag01 = new Uint32Array(2);
    mag01[0] = 0;
    mag01[1] = MATRIX_A;

    let y = 0;
    const mt: Uint32Array = this._mt;
    if (this._mti >= N) {
      /* generate N words at one time */
      // if (this.mti === N + 1) {   /* if init() has not been called, */
      //   this.init(5489); /* a default initial seed is used */
      // }

      let kk = 0;
      for (kk = 0; kk < N - M; kk = kk + 1 | 0) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (; kk < N - 1; kk = kk + 1 | 0) {
        y = (mt[kk] & UPPER_MASK) | (mt[kk + 1] & LOWER_MASK);
        mt[kk] = mt[kk + (M - N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (mt[N - 1] & UPPER_MASK) | (mt[0] & LOWER_MASK);
      mt[N - 1] = mt[M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

      this._mti = 0;
    }

    y = mt[this._mti];
    this._mti = this._mti + 1;

    // tempering
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  /**
   * @return a random number on [0,0x7fffffff]-interval
   */
  public int31(): number {
    return (this.int32() >>> 1);
  }

  /**
   * @return a random number on [0,1]-real-interval
   */
  public real1(): number {
    return this.int32() * REV32_1;
  }

  /**
   * @return a random number on [0,1)-real-interval
   */
  public real2(): number {
    return this.int32() * REV32;
  }

  /**
   * @return a random number on (0,1)-real-interval
   */
  public real3(): number {
    return (this.int32() + 0.5) * REV32;
  }
}
