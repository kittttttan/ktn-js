/// <reference path="./ktn.d.ts" />
declare module '@ktn/statistics'{
  export default class StatUtil {
    public static fact(a: int): int;
    public static sortNum(arr: number[]): number[];
    public static median(arr: number[]): number;
    public static midrange(arr: number[]): number;
    public static amean(arr: number[]): number;
    public static gmean(arr: number[]): number;
    public static hmean(arr: number[]): number;
    public static genmean(arr: number[], p: number): number;
    public static variance(arr: number[]): number;
    public static nPm(n: int, m: int): int;
    public static nCm(n: int, m: int): int;
    public static erf(x: double): double;
  }

  export class Triangular {
    protected _low: double;
    protected _high: double;
    protected _mode: double;

    public constructor(low?: double, high?: double, mode?: double);

    public toString(): string;
    public valueOf(): double;
    public gen(n?: int): double[];
  }

  export class Be {
    protected p: double;

    public constructor(p: double);

    public toString(): string;
    public P(): double;
    public E(): double;
    public V(): double;
    public gen(n?: int): int[];
  }

  export class B {
    protected n: int;
    protected p: double;

    public constructor(n: int, p: double);

    public toString(): string;
    public P(k: int): double;
    public E(): double;
    public V(): double;
    public gen(n?: int): int[];
  }

  export class Exp {
    protected l: double;

    public constructor(l: double);

    public toString(): string;
    public P(x: double): double;
    public E(): double;
    public V(): double;
    public gen(n?: int): double[];
  }

  export class Norm {
    protected m: double;
    protected s: double;

    public constructor(m: double, s: double);

    public toString(): string;
    public P(x: double): double;
    public E(): double;
    public V(): double;
    public gen(n?: int): double[];
  }
}
