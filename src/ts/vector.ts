/**
 * @private
 * @const
 * @type function(number): number
 */
const _sqrt = Math.sqrt;

/**
 * Vector
 *
 * @class Vector
 */
export class Vector {
  /**
   * @property {!number} Vector#x
   */
  x: number;

  /**
   * @property {!number} Vector#y
   */
  y: number;

  /**
   * @property {!number} Vector#z
   */
  z: number;

  /**
   * Initialize
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(x, y, z) {
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  /**
   * @method Vector#toString
   * @return {!string}
   */
  toString() {
    return `(${this.x},${this.y},${this.z})`;
  }

  /**
   * @method Vector#clone
   * @return {!Vector}
   */
  clone() {
    const v = new Vector(this.x, this.y, this.z);
    return v;
  }

  /**
   * @method Vector#norm
   * @return {!number}
   */
  norm() {
    return _sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  /**
   * @method Vector#add
   * @param {!Vector} v
   * @return {!Vector}
   */
  add(v) {
    const w = new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    return w;
  }

  /**
   * @method Vector#sub
   * @param {!Vector} v
   * @return {!Vector}
   */
  sub(v) {
    const w = new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    return w;
  }

  /**
   * @method Vector#mul
   * @param {!number} n
   * @return {!Vector}
   */
  mul(n) {
    const v = new Vector(n * this.x, n * this.y, n * this.z);
    return v;
  }

  /**
   * @method Vector#cross
   * @param {!Vector} v
   * @return {!Matrix}
   */
  //cross(n) {
  //  var m = new Matrix(this.x, this.y, this.z);
  //  return m;
  //},

  /**
   * @method Vector#dot
   * @param {!Vector} v
   * @return {!number}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
}
