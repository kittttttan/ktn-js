/// <reference path="./ktn.d.ts"/>
declare module '@ktn/matrix'{
  export default class Matrix {
    protected _m: int;
    protected _n: int;
    public _mn: number[][];

    constructor(m?: int, n?: int);

    public static mx(m: any, n: any): Matrix;
    public static array(arr: number[][]): Matrix;
    public static E(n?: int, k?: number): Matrix;
    public static U(n?: int, k?: number): Matrix;
    public static D(n?: int, k?: number): Matrix;
    public static diag(arr: number[]): Matrix;
    public static circ(arr: number[]): Matrix;
    public static toep(arr: number[]): Matrix;
    public static T(a: Matrix): Matrix;
    public static aug(a: Matrix, b: Matrix): Matrix;

    public length: int;

    public clone(): Matrix;
    public toString(): string;
    public row(n: int): Matrix;
    public col(n: int): Matrix;
    public add(n: Matrix): Matrix;
    public sub(n: Matrix): Matrix;
    public mul(n: Matrix): Matrix;
    public cf(i: int, j: int): Matrix;
    public det(): double;
    public tr(): double;
    public inv(): Matrix;
    public isReg(): boolean;
    public isSym(): boolean;
    public isDiag(): boolean;
    public isE(): boolean;
    public isNonZero(): boolean;
    public isOrt(): boolean;
    public isToep(): boolean;
    public html(): string;
    public tex(type: int): string;
    public eq(n: Matrix): boolean;
    public equal(n: Matrix): boolean;
    public rowSwap(i: int, j: int): Matrix;
    public colSwap(i: int, j: int): Matrix;
    public rowAdd(i: int, j: int, n?: number): Matrix;
    public colAdd(i: int, j: int, n?: number): Matrix;
    public rowSub(i: int, j: int, n?: number): Matrix;
    public colSub(i: int, j: int, n?: number): Matrix;
    public rowMul(i: int, n: number): Matrix;
    public colMul(i: int, n: number): Matrix;
    public rowDiv(i: int, n: number): Matrix;
    public colDiv(i: int, n: number): Matrix;
  }
}