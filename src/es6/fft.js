import {Complex} from './complex';

/**
 * @private
 * @const
 * @type function(number): number
 */
const cos = Math.cos;
/**
 * @private
 * @const
 * @type function(number): number
 */
const sin = Math.sin;
/**
 * @private
 * @const
 * @type number
 */
const PI = Math.PI;
/**
 * @private
 * @const
 * @type number
 */
const PI2 = -2 * PI;

/**
 * Fft
 * @class Fft
 */
export class Fft {
  /**
   * convert Array<number> to Array<Complex>.
   * @param {!Array<!number>} x
   * @return {!Array<!Complex>}
   */
  static fl2Comp(x) {
    const c = [];
    for (let i = 0, l = x.length; i < l; ++i) {
      c[i] = new Complex(x[i], 0.0);
    }
    return c;
  }

  /**
   * transform 2
   * @param {!Array<!Complex>} x x.length === 2
   * @return {!Array<!Complex>}
   */
  static fft2_(x) {
    return [x[0].add(x[1]), x[0].sub(x[1])];
  }

  /**
   * transform 4
   * @param {!Array<!Complex>} x x.length === 4
   * @return {!Array<!Complex>}
   */
  static fft4_(x) {
    const q = [x[0].add(x[2]), x[0].sub(x[2])];
    const r = [x[1].add(x[3]), x[1].sub(x[3])];
    const wk = new Complex(r[1].i_, -r[1].r_);

    return [
      q[0].add(r[0]),
      q[1].add(wk),
      q[0].sub(r[0]),
      q[1].sub(wk)
    ];
  }

  /**
   * transform
   * @param {!Array<!Complex>} x
   * @return {!Array<!Complex>}
   */
  static fft_(x) {
    const N = x.length;
    if (N === 4) { return this.fft4_(x); }

    const N2 = N >> 1;
    const even = [];
    // const odd = [];
    for (let k = 0; k < N2; ++k) {
      even[k] = x[k << 1];
      // odd[k] = x[(k << 1) + 1];
    }
    const q = this.fft_(even);
    // const r = this.fft_(odd);

    // reuse the array
    const odd = even;
    for (let k = 0; k < N2; ++k) {
      odd[k] = x[(k << 1) + 1];
    }
    const r = this.fft_(odd);

    const th = PI2 / N;
    const y = [];
    let kth = 0.0;
    let wk = r[0].mul(new Complex(1, 0));
    y[0] = q[0].add(wk);
    y[N2] = q[0].sub(wk);

    for (let k = 1; k < N2; ++k) {
      kth = k * th;
      wk = r[k].mul(new Complex(cos(kth), sin(kth)));
      y[k] = q[k].add(wk);
      y[k + N2] = q[k].sub(wk);
    }

    return y;
  }

  /**
   * Fast Fourier transform
   * @method Fft.fft
   * @param {!Array<!Complex>} x
   * @return {!Array<!Complex>}
   */
  static fft(x) {
    const N = x.length;
    if (N < 1 || (N & (N - 1))) {
      throw new Error('length of data must be a power of 2.');
    }
    if (N === 2) { return this.fft2_(x); }
    if (N === 1) { return [x[0]]; }
    return this.fft_(x);
  }

  /**
   * inverse
   * @method Fft.ifft
   * @param {!Array<!Complex>} x
   * @return {!Array<!Complex>}
   */
  static ifft(x) {
    const N = x.length;
    let y = [];
    for (let i = 0; i < N; ++i) {
      y[i] = x[i].conj();
    }

    y = this.fft(y);

    const div = 1.0 / N;
    for (const yi of y) {
      yi.r_ *= div;
      yi.i_ *= -div;
    }

    return y;
  }

  /**
   * transform from numbers
   * @method Fft.fftFloat
   * @param {!Array<!number>} x
   * @return {!Array<!Complex>}
   */
  static fftFloat(x) {
    return this.fft(this.fl2Comp(x));
  }

  /**
   * inverse from numbers
   * @method Fft.ifftFloat
   * @param {!Array<!number>} x
   * @return {!Array<!Complex>}
   */
  static ifftFloat(x) {
    return this.ifft(this.fl2Comp(x));
  }
}
