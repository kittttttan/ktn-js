/// <reference path="./ktn.d.ts" />
declare module '@ktn/integer'{
  export default class Integer {
    protected _d: Uint32Array;
    protected _s: boolean;
    protected _l: int;

    constructor();

    static SHIFT: int;
    static BASE: int;
    static MASK: int;
    static one: Integer;
    static zero: Integer;

    public static num(n: int): Integer;
    public static str(str: string, base?: int): Integer;
    public static exp(a: string): Integer;
    public static any(a: any): Integer;
    public static factorial(n: int): Integer;
    public static factOdd(n: int): Integer;
    public static factEven(n: int): Integer;
    protected static alloc(length: int, sign: boolean): Integer;

    public toString(b?: int): string;

    digits: Uint32Array;
    capacity: int;
    arrayLength: int;
    sign: boolean;

    public clone(): Integer;

    public addZero(b: int): Integer;
    public leftShift(b: int): Integer;
    public rightShift(b: int): Integer;
    public isOdd(): boolean;
    public isEven(): boolean;
    public isNonZero(): boolean;
    public square(): Integer;
    public sqrt(): Integer;
    public pow(b: int): Integer;
    public gcd(b: Integer): Integer;
    public gcdBin(b: Integer): Integer;
    public addAbs(b: Integer, sign: boolean): Integer;
    public subAbs(b: Integer, sign: boolean): Integer;
    public add(b: Integer): Integer;
    public sub(b: Integer): Integer;
    public mul(b: Integer): Integer;
    public kmul(y: Integer): Integer;
    public divmod(b: Integer, modulus: boolean): Integer;
    public div(b: Integer): Integer;
    public mod(b: Integer): Integer;
    public cmpAbs(b: Integer): int;
    public cmp(b: Integer): int;
    public eq(b: Integer): boolean;
    public equal(b: Integer): boolean;
    public abs(): Integer;
    public neg(): Integer;
    public bitLength(): int;
    public half(): Integer;
    public double(): Integer;
    protected norm(): Integer;
    protected fillZero(n: int): Integer;
  }
}