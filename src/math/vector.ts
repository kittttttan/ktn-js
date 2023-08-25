import type {float} from '../types';
const _sqrt: (x: number) => number = Math.sqrt;

/**
 * Vector
 */
export class Vector {
  public x: float;
  public y: float;
  public z: float;

  constructor(x: float, y: float, z: float) {
    this.x = +x;
    this.y = +y;
    this.z = +z;
  }

  public toString(): string {
    return `(${this.x},${this.y},${this.z})`;
  }

  public clone(): Vector {
    const v: Vector = new Vector(this.x, this.y, this.z);
    return v;
  }

  public norm(): float {
    return _sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public add(v: Vector): Vector {
    const w: Vector = new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
    return w;
  }

  public sub(v: Vector): Vector {
    const w: Vector = new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
    return w;
  }

  public mul(n: float): Vector {
    const v: Vector = new Vector(n * this.x, n * this.y, n * this.z);
    return v;
  }

  // public cross(n) {
  //   var m = new Matrix(this.x, this.y, this.z);
  //   return m;
  // },

  public dot(v: Vector): float {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public toArray(): float[] {
    return [this.x, this.y, this.z];
  }
}
