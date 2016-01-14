/**
 * @private
 * @const
 * @type function(number): number
 */
const _sqrt = Math.sqrt;
/**
 * @private
 * @const
 * @type function(number): number
 */
const _cos = Math.cos;
/**
 * @private
 * @const
 * @type function(number): number
 */
const _sin = Math.sin;

/**
 * Quaternion
 *
 * @class Quaternion
 * @property {number} Quaternion#w
 * @property {number} Quaternion#x
 * @property {number} Quaternion#y
 * @property {number} Quaternion#z
 */
 export class Quaternion {
  w: number;
  x: number;
  y: number;
  z: number;

  /**
   * @param {number} w
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(w, x, y, z) {
    this.w = +w;
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  /**
   * @static
   * @method Quaternion.create
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Quaternion}
   */
  static create(x, y, z) {
    return new Quaternion(0, +x, +y, +z);
  }

  /**
   * @method Quaternion#toString
   * @return {string}
   */
  toString() {
    return `(${this.w};${this.x},${this.y},${this.z})`;
  }

  /**
   * @method Quaternion#clone
   * @return {Quaternion}
   */
  clone() {
    const q = new Quaternion(this.w, this.x, this.y, this.z);
    return q;
  }

  /**
   * @method Quaternion#conjugate
   * @return {Quaternion}
   */
  conjugate() {
    const q = new Quaternion(this.w, -this.x, -this.y, -this.z);
    return q;
  }

  /**
   * @method Quaternion#mul
   * @param {Quaternion} q
   * @return {Quaternion}
   */
  mul(q) {
    const r = new Quaternion(
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w);
    return r;
  }

  /**
   * @method Quaternion#rotate
   * @param {number} r
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Quaternion}
   */
  rotate(r, x, y, z) {
    const n = _sqrt(x * x + y * y + z * z);
    if (!n) {
      throw new Error(`Invalid arguments: ${arguments}`);
    }

    x /= n;
    y /= n;
    z /= n;

    const ph = r / 2;
    const cos = _cos(ph);
    const sin = _sin(ph);
    const rq = new Quaternion(cos, x * sin, y * sin, z * sin);
    const qq = new Quaternion(cos, -x * sin, -y * sin, -z * sin);

    return rq.mul(this).mul(qq);
  }

  /**
   * @method Quaternion#norm
   * @return {number}
   */
  norm() {
    const n = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    return _sqrt(n);
  }

  /**
   * @method Quaternion#normalize
   * @return {Quaternion|undefined}
   */
  normalize() {
    const n = this.norm();
    if (!n) { return undefined; }
    return new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
  }

  /**
   * @method Quaternion#inverse
   * @return {Quaternion|undefined}
   */
  inverse() {
    const n = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    if (!n) { return undefined; }

    const q = new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
    return q;
  }
}
