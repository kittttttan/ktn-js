const _sqrt: (x: number) => number = Math.sqrt;

/**
 * Vector
 */
export class Vector {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
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

  public norm(): number {
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

  public mul(n: number): Vector {
    const v: Vector = new Vector(n * this.x, n * this.y, n * this.z);
    return v;
  }

  // public cross(n) {
  //   var m = new Matrix(this.x, this.y, this.z);
  //   return m;
  // },

  public dot(v: Vector): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  public toArray(): number[] {
    return [this.x, this.y, this.z];
  }
}
