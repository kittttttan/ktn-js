import type {float} from '../types';

const _sqrt: (x: number) => number = Math.sqrt;
const _cos: (x: number) => number = Math.cos;
const _sin: (x: number) => number = Math.sin;

/**
 * Quaternion
 */
export class Quaternion {
  public w: float;
  public x: float;
  public y: float;
  public z: float;

  constructor(w: float, x: float, y: float, z: float) {
    this.w = +w;
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  public static create(x: float, y: float, z: float): Quaternion {
    return new Quaternion(0, +x, +y, +z);
  }

  public toString(): string {
    return `(${this.w};${this.x},${this.y},${this.z})`;
  }

  public clone(): Quaternion {
    const q = new Quaternion(this.w, this.x, this.y, this.z);
    return q;
  }

  public conjugate(): Quaternion {
    const q = new Quaternion(this.w, -this.x, -this.y, -this.z);
    return q;
  }

  public mul(q: Quaternion): Quaternion {
    const r = new Quaternion(
      this.w * q.w - this.x * q.x - this.y * q.y - this.z * q.z,
      this.w * q.x + this.x * q.w + this.y * q.z - this.z * q.y,
      this.w * q.y - this.x * q.z + this.y * q.w + this.z * q.x,
      this.w * q.z + this.x * q.y - this.y * q.x + this.z * q.w);
    return r;
  }

  public rotate(r: float, x: float, y: float, z: float): Quaternion {
    const n = _sqrt(x * x + y * y + z * z);
    if (!n) {
      throw new RangeError(`Invalid arguments: (x, y, z)=(${x}, ${y}, ${z})`);
    }

    x /= n;
    y /= n;
    z /= n;

    const ph = r / 2;
    const cos = _cos(ph);
    const sin = _sin(ph);
    const rq: Quaternion = new Quaternion(cos, x * sin, y * sin, z * sin);
    const qq: Quaternion = new Quaternion(cos, -x * sin, -y * sin, -z * sin);

    return rq.mul(this).mul(qq);
  }

  public norm(): float {
    const n = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    return _sqrt(n);
  }

  public normalize(): Quaternion|undefined {
    const n = this.norm();
    if (!n) { return undefined; }
    return new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
  }

  public inverse(): Quaternion|undefined {
    const n = this.w * this.w +
        this.x * this.x + this.y * this.y + this.z * this.z;
    if (!n) { return undefined; }

    const q = new Quaternion(this.w / n,
        this.x / n, this.y / n, this.z / n);
    return q;
  }
}
