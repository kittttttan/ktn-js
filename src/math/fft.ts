import type {float} from '../types.ts';
import {Complex} from './complex.ts';

const cos: (x: number) => number = Math.cos;
const sin: (x: number) => number = Math.sin;
const PI: number = Math.PI;
const PI2: number = -2 * PI;

/**
 * Fft
 */
export class Fft {
  /**
   * convert Array<number> to Array<Complex>.
   */
  public static fl2Comp(x: float[]): Complex[] {
    const c: Complex[] = [];
    const l = x.length;
    for (let i = 0; i < l; ++i) {
      c[i] = new Complex(x[i], 0.0);
    }
    return c;
  }

  /**
   * transform 2
   */
  protected static _fft2(x: Complex[]): Complex[] {
    return [x[0].add(x[1]), x[0].sub(x[1])];
  }

  /**
   * transform 4
   */
  protected static _fft4(x: Complex[]): Complex[] {
    const q: Complex[] = [x[0].add(x[2]), x[0].sub(x[2])];
    const r: Complex[] = [x[1].add(x[3]), x[1].sub(x[3])];
    const wk: Complex = new Complex(r[1].imag, -r[1].real);

    return [
      q[0].add(r[0]),
      q[1].add(wk),
      q[0].sub(r[0]),
      q[1].sub(wk),
    ];
  }

  /**
   * transform
   */
  protected static _fft(x: Complex[]): Complex[] {
    const N = x.length;
    if (N === 4) { return this._fft4(x); }

    const N2 = N >> 1;
    const even: Complex[] = [];
    // const odd = [];
    for (let k = 0; k < N2; ++k) {
      even[k] = x[k << 1];
      // odd[k] = x[(k << 1) + 1];
    }
    const q: Complex[] = this._fft(even);
    // const r = this.fft_(odd);

    // reuse the array
    const odd: Complex[] = even;
    for (let k = 0; k < N2; ++k) {
      odd[k] = x[(k << 1) + 1];
    }
    const r: Complex[] = this._fft(odd);

    const th = PI2 / N;
    const y: Complex[] = [];
    let kth = 0.0;
    let wk: Complex = r[0].mul(new Complex(1, 0));
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
   */
  public static fft(x: Complex[]): Complex[] {
    const N = x.length;
    if (N < 1 || (N & (N - 1))) {
      throw new Error('length of data must be a power of 2.');
    }
    if (N === 2) { return this._fft2(x); }
    if (N === 1) { return [x[0]]; }
    return this._fft(x);
  }

  /**
   * inverse
   */
  public static ifft(x: Complex[]): Complex[] {
    const N = x.length;
    let y: Complex[] = [];
    for (let i = 0; i < N; ++i) {
      y[i] = x[i].conj();
    }

    y = this.fft(y);

    const div = 1.0 / N;
    for (const yi of y) {
      yi.real *= div;
      yi.imag *= -div;
    }

    return y;
  }

  public static fftFloat(x: float[]): Complex[] {
    return this.fft(this.fl2Comp(x));
  }

  public static ifftFloat(x: float[]): Complex[] {
    return this.ifft(this.fl2Comp(x));
  }
}
