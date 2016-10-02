/// <reference path="./ktn.d.ts" />
declare module '@ktn/uuid'{
  export default class Uuid {
    protected _timeLow: int;
    protected _timeMid: int;
    protected _version: int;
    protected _timeHi: int;
    protected _variant: int;
    protected _clockSeq: int;
    protected _node: int;

    constructor(ver?: int);

    public static uuid(ver?: int): Uuid;
    public toString(): string;
    public fromString(id: string): Uuid;
    public generate(): string;
    public clone(): Uuid;
    public equals(u: Uuid): boolean;

    version: int;
    variant: int;
  }

  function hex(n: int, len: int): string;
  function rand(n: int): int;
}
