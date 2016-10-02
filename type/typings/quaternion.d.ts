/// <reference path="./ktn.d.ts" />
declare module '@ktn/quaternion'{
  export default class Quaternion {
    public w: double;
    public x: double;
    public y: double;
    public z: double;

    constructor(w: double, x: double, y: double, z: double);

    public static create(x: double, y: double, z: double): Quaternion;
    public toString(): string;
    public clone(): Quaternion;
    public conjugate(): Quaternion;
    public mul(q: Quaternion): Quaternion;
    public rotate(r: double, x: double, y: double, z: double): Quaternion;
    public norm(): double;
    public normalize(): Quaternion;
    public inverse(): Quaternion;
  }
}
