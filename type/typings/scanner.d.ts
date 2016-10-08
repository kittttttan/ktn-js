/// <reference path="./ktn.d.ts"/>
declare module '@ktn/math/scanner'{
  export default class Scanner {
    protected _src: string;
    protected _index: int;

    constructor(src: string);

    public eof(): boolean;
    public comment(): string;
    public lex(): string;
    public num(): string;
    public punctuator(): string;
  }
}