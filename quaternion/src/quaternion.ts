'use strict';

import {double} from '@ktn/type';

/**
 * @private
 * @const
 * @type function(number): number
 */
const _sqrt: (x: number) => number = Math.sqrt;
/**
 * @private
 * @const
 * @type function(number): number
 */
const _cos: (x: number) => number = Math.cos;
/**
 * @private
 * @const
 * @type function(number): number
 */
const _sin: (x: number) => number = Math.sin;

/**
 * Quaternion
 *
 * @class Quaternion
 * @property {double} Quaternion#w
 * @property {double} Quaternion#x
 * @property {double} Quaternion#y
 * @property {double} Quaternion#z
 */
export class Quaternion {
  public w: double;
  public x: double;
  public y: double;
  public z: double;

  /**
   * @param {double} w
   * @param {double} x
   * @param {double} y
   * @param {double} z
   */
  constructor(w: double, x: double, y: double, z: double) {
    this.w = +w;
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  /**
   * @static
   * @method Quaternion.create
   * @param {double} x
   * @param {double} y
   * @param {double} z
   * @return {Quaternion}
   */
  public static create(x: double, y: double, z: double): Quaternion {
    return new Quaternion(0, +x, +y, +z);
  }

  /**
   * @method Quaternion#toString
   * @return {string}
   */
  public toString(): string {
    return `(${this.w};${this.x},${this.y},${this.z})`;
  }

  /**
   * @method Quaternion#clone
   * @return {Quaternion}
   */
  public clone(): Quaternion {
    const q: Quaternion = new Quaternion(this.w, this.x, this.y, this.z);
    return q;
  }

  /**
   * @method Quaternion#conjugate
   * @return {Quaternion}
   */
  public conjugate(): Quaternion {
    const q: Quaternion = new Quaternion(this.w, -this.x, -this.y, -this.z);
    return q;
  }

  /**
   * @method Quaternion#mul
   * @param {Quaternion} q
   * @return {Quaternion}
   */
  public mul(q: Quaternion): Quaternion {
    const r: Quaternion = new Quaternion(
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w);
    return r;
  }

  /**
   * @method Quaternion#rotate
   * @param {double} r
   * @param {double} x
   * @param {double} y
   * @param {double} z
   * @return {Quaternion}
   */
  public rotate(r: double, x: double, y: double, z: double): Quaternion {
    const n: double = _sqrt(x * x + y * y + z * z);
    if (!n) {
      throw new Error(`Invalid arguments: ${arguments}`);
    }

    x /= n;
    y /= n;
    z /= n;

    const ph: double = r / 2;
    const cos: double = _cos(ph);
    const sin: double = _sin(ph);
    const rq: Quaternion = new Quaternion(cos, x * sin, y * sin, z * sin);
    const qq: Quaternion = new Quaternion(cos, -x * sin, -y * sin, -z * sin);

    return rq.mul(this).mul(qq);
  }

  /**
   * @method Quaternion#norm
   * @return {double}
   */
  public norm(): double {
    const n: double = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    return _sqrt(n);
  }

  /**
   * @method Quaternion#normalize
   * @return {Quaternion|undefined}
   */
  public normalize(): Quaternion|undefined {
    const n: double = this.norm();
    if (!n) { return undefined; }
    return new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
  }

  /**
   * @method Quaternion#inverse
   * @return {Quaternion|undefined}
   */
  public inverse(): Quaternion|undefined {
    const n: double = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    if (!n) { return undefined; }

    const q: Quaternion = new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
    return q;
  }
}
