import type {int, Np} from '../types';
import {abs} from './bmath';

type Option = {precision?: Np};
let precision: Np = 20;

type BICParam = Parameters<BigIntConstructor>[0];

export function dec(n: BICParam = 0n, e: string|number = 0): Decimal {
  if (typeof n !== 'bigint') {
    n = BigInt(n);
  }
  if (typeof e === 'string') {
    e = parseInt(e);
  }
  return new Decimal(n, e | 0);
}

export class Decimal {
  protected d: bigint;
  protected e: int;

  constructor(d = 0n, e = 0) {
    this.d = d;
    this.e = e | 0;
  }

  /**
   * 0
   */
  static get zero(): Decimal {
    return new Decimal();
  }

  /**
   * 1
   */
  static get one(): Decimal {
    return new Decimal(1n);
  }

  static set(opt: Option): void {
    if (opt.precision) {
      precision = opt.precision | 0;
    }
  }

  get digit(): bigint {
    return this.d;
  }

  get exp(): number {
    return this.e;
  }

  toString(): string {
    if (this.e > 0) {
      return `${this.d}${'0'.repeat(this.e)}`;
    }
    if (this.e < 0) {
      let s = `${this.d}`;
      const zlen = -this.e - s.length;
      if (zlen >= 0) {
        s = '0'.repeat(zlen + 1) + s;
      }
      return `${s.slice(0, this.e)}.${s.slice(this.e)}`;
    }

    return `${this.d}`;
  }

  norm(): void {
    while (this.d % 10n === 0n) {
      this.d /= 10n;
      this.e++;
    }
  }

  scale(n: number): void {
    this.d *= 10n ** BigInt(n);
    this.e -= n;
  }

  neg(): Decimal {
    return new Decimal(-this.d, this.e);
  }

  add(a: Decimal): Decimal {
    if (this.e > a.exp) {
      const s = BigInt(this.e - a.exp);
      return new Decimal(this.d * (10n ** s) + a.digit, a.exp);
    }

    if (this.e < a.exp) {
      const s = BigInt(a.exp - this.e);
      return new Decimal(this.d + a.digit * (10n ** s), this.e);
    }

    return new Decimal(this.d + a.digit, this.e);
  }

  sub(a: Decimal): Decimal {
    return this.add(a.neg());
  }

  mul(a: Decimal): Decimal {
    return new Decimal(this.d * a.digit, this.e + a.exp);
  }

  div(a: Decimal): Decimal {
    let d = this.d;
    let e = this.e;
    const tl = this.d.toString().length;
    const al = a.digit.toString().length;
    if (tl - precision < al) {
      const diff = al - tl + precision;
      d *= 10n ** BigInt(diff);
      e -= diff;
    }

    const dec = new Decimal(d / a.digit, e - a.exp);
    // d.norm();
    return dec;
  }

  pow(a: int): Decimal {
    let d = abs(this.d) ** BigInt(a);
    if (this.d < 0) {
      d = -d;
    }

    let e = Math.abs(this.e) ** a;
    if (this.e < 0) {
      e = -e;
    }

    return new Decimal(d, e);
  }
}