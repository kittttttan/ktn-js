/// <reference path="./integer.d.ts" />
//import Integer from '@ktn/integer';
type Integer = any;

declare module '@ktn/rational'{
  export default class Rational implements ktn.Field {
    protected _n: Integer;
    protected _d: Integer;

    constructor(n: Integer, d: Integer, f?: boolean);

    static one: Rational;
    static zero: Rational;

    public static num(a: int, b?: int, c?: boolean): Rational;
    public static str(a: string): Rational;
    public static any(a: any, b?: any): Rational;
    public static cancel(a: Integer, b: Integer): Integer[];
    public clone(): Rational;
    public toString(): string;
    public html(): string;
    public tex(): string;

    sign: boolean;

    public abs(): Rational;
    public neg(): Rational;
    public eq(b: any): boolean;
    public equal(b: Rational): boolean;
    public cmp(b: Rational): int;
    public inv(): Rational;
    public add(b: Rational): Rational;
    public sub(b: Rational): Rational;
    public mul(b: Rational): Rational;
    public div(b: Rational): Rational;
    public pow(b: int): Rational;
  }
}