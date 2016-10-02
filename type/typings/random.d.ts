/// <reference path="./ktn.d.ts" />
declare module '@ktn/random'{
  export default class Random {
    protected _mt: Uint32Array;
    protected _mti: int;

    constructor();

    public initByArray(initKey: int[]): void;
    public int32(): int;
    public int31(): int;
    public real1(): double;
    public real2(): double;
    public real3(): double;
  }
}
