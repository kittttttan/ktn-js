'use strict';

import {double} from '@ktn/type';

/**
 * @private
 * @const
 * @type function(number): number
 */
const _sqrt: (x: number) => number = Math.sqrt;

/**
 * Vector
 *
 * @class Vector
 * @property {!double} Vector#x
 * @property {!double} Vector#y
 * @property {!double} Vector#z
 */
export class Vector {
  public x: double;
  public y: double;
  public z: double;

  /**
   * Initialize
   * @param {double} x
   * @param {double} y
   * @param {double} z
   */
  constructor(x: double, y: double, z: double) {
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  /**
   * @method Vector#toString
   * @return {!string}
   */
  public toString(): string {
    return `(${this.x},${this.y},${this.z})`;
  }

  /**
   * @method Vector#clone
   * @return {!Vector}
   */
  public clone(): Vector {
    const v: Vector = new Vector(this.x, this.y, this.z);
    return v;
  }

  /**
   * @method Vector#norm
   * @return {!double}
   */
  public norm(): double {
    return _sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * @method Vector#add
   * @param {!Vector} v
   * @return {!Vector}
   */
  public add(v: Vector): Vector {
    const w: Vector = new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    return w;
  }

  /**
   * @method Vector#sub
   * @param {!Vector} v
   * @return {!Vector}
   */
  public sub(v: Vector): Vector {
    const w: Vector = new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    return w;
  }

  /**
   * @method Vector#mul
   * @param {!double} n
   * @return {!Vector}
   */
  public mul(n: double): Vector {
    const v: Vector = new Vector(n * this.x, n * this.y, n * this.z);
    return v;
  }

  /**
   * @method Vector#cross
   * @param {!Vector} v
   * @return {!Matrix}
   */
  // public cross(n) {
  //   var m = new Matrix(this.x, this.y, this.z);
  //   return m;
  // },

  /**
   * @method Vector#dot
   * @param {!Vector} v
   * @return {!double}
   */
  public dot(v: Vector): double {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * @method Vector#toArray
   * @return {!Array<double>}
   */
  public toArray(): double[] {
    return [this.x, this.y, this.z];
  }
}
