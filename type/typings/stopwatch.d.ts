/// <reference path="./ktn.d.ts" />
declare module '@ktn/bench/stopwatch'{
  export default class Stopwatch {
    protected _t0: int;
    protected _ts: int;
    protected _isRun: boolean;

    elapsed: int;

    constructor();

    public static sw(): Stopwatch;
    public start(): Stopwatch;
    public restart(): Stopwatch;
    public stop(): Stopwatch;
    public reset(): Stopwatch;
  }
}