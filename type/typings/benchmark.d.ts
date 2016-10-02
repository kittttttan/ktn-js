/// <reference path="./stopwatch.d.ts" />
declare module '@ktn/bench'{
  export class Result {
    protected _r: int[];

    records: int[];

    constructor();

    public add(t: int): Result;
  }

  export class Unit {
    protected _name: string;
    protected _func: () => any;
    protected _result: Result;

    name: string;
    func: () => any;

    result: Result;

    constructor(name: string, func: () => any);
  }

  export default class BenchMark {
    protected _items: Unit[];
    protected _loop: int;
    protected _intime: int;

    constructor(opt?: {loop?: number, intime?: number});

    public static bm(): BenchMark;
    public add(s: string, f: () => any): BenchMark;
    public addItem(u: Unit): BenchMark;
    public run(quiet?: boolean): void;
    public show(): void;
  }
}