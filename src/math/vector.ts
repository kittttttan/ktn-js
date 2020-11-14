'use strict';

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
 * @property {!number} Vector#x
 * @property {!number} Vector#y
 * @property {!number} Vector#z
 */
export class Vector {
  public x: number;
  public y: number;
  public z: number;

  /**
   * Initialize
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x: number, y: number, z: number) {
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
   * @return {!number}
   */
  public norm(): number {
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
   * @param {!number} n
   * @return {!Vector}
   */
  public mul(n: number): Vector {
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
   * @return {!number}
   */
  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  /**
   * @method Vector#toArray
   * @return {!Array<number>}
   */
  public toArray(): number[] {
    return [this.x, this.y, this.z];
  }
}
