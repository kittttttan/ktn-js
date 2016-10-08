/// <reference path="./ktn.d.ts"/>
declare module '@ktn/math/parser' {
  export interface Ast {
    type: string;
    name?: string;
    value?: string;
    operator?: string;
    left?: Ast;
    right?: Ast;
    argument?: Ast;
    arguments?: Ast[];
  }

  export default class Parser {
    protected _tokens: string[];
    protected _index: int;

    tokens: string[];

    constructor(tokens: string[]);

    public parse(): Ast;
    private number(): Ast;
    private factor(): Ast;
    private term(): Ast;
    private expression(): Ast;
  }
}