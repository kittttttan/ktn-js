/// <reference path="./ktn.d.ts"/>
declare module '@ktn/vector'{
  export default class Vector {
    public x: double;
    public y: double;
    public z: double;

    constructor(x: double, y: double, z: double);

    public toString(): string;
    public clone(): Vector;
    public norm(): double;
    public add(v: Vector): Vector;
    public sub(v: Vector): Vector;
    public mul(n: double): Vector;
    public dot(v: Vector): double;
    public toArray(): double[];
  }
}
