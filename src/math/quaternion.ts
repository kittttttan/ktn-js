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
 * @property {number} Quaternion#w
 * @property {number} Quaternion#x
 * @property {number} Quaternion#y
 * @property {number} Quaternion#z
 */
export class Quaternion {
  public w: number;
  public x: number;
  public y: number;
  public z: number;

  /**
   * @param {number} w
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(w: number, x: number, y: number, z: number) {
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
  public static create(x: number, y: number, z: number): Quaternion {
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
   * @param {number} r
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Quaternion}
   */
  public rotate(r: number, x: number, y: number, z: number): Quaternion {
    const n: number = _sqrt(x * x + y * y + z * z);
    if (!n) {
      throw new RangeError(`Invalid arguments: (x, y, z)=(${x}, ${y}, ${z})`);
    }

    x /= n;
    y /= n;
    z /= n;

    const ph: number = r / 2;
    const cos: number = _cos(ph);
    const sin: number = _sin(ph);
    const rq: Quaternion = new Quaternion(cos, x * sin, y * sin, z * sin);
    const qq: Quaternion = new Quaternion(cos, -x * sin, -y * sin, -z * sin);

    return rq.mul(this).mul(qq);
  }

  /**
   * @method Quaternion#norm
   * @return {number}
   */
  public norm(): number {
    const n: number = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    return _sqrt(n);
  }

  /**
   * @method Quaternion#normalize
   * @return {Quaternion|undefined}
   */
  public normalize(): Quaternion|undefined {
    const n: number = this.norm();
    if (!n) { return undefined; }
    return new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
  }

  /**
   * @method Quaternion#inverse
   * @return {Quaternion|undefined}
   */
  public inverse(): Quaternion|undefined {
    const n: number = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    if (!n) { return undefined; }

    const q: Quaternion = new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
    return q;
  }
}
