/// <reference path="./ktn.d.ts" />
declare module '@ktn/complex'{
  export default class Complex {
    protected _r: double;
    protected _i: double;

    constructor(r: double, i: double);

    static zero: Complex;
    static one: Complex;

    real: double;
    imag: double;

    public toString(): string;
    public clone(): Complex;
    public scale(a: double): Complex;
    public conj(): Complex;
    public add(a: Complex): Complex;
    public sub(a: Complex): Complex;
    public mul(a: Complex): Complex;
    public eq(a: any): boolean;
    public equal(a: any): boolean;
  }
}
