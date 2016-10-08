type Ast = any;
type Parser = any;
type Tokenizer = any;
declare module '@ktn/math'{
  export default class MathExpression {
    protected _ast: Ast;
    protected _tokens: string[];
    protected _p: Parser;
    protected _t: Tokenizer;

    public static create(str: string): MathExpression;

    tokens: string[];
    ast: Ast;

    constructor(src: string);

    public parse(): Ast;
    public eval(): any;
    private _parseAst(ast: Ast): any;
    private tokenize(): string[];
  }
}