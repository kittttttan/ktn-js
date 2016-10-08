type Scanner = any;
declare module '@ktn/math/tokenizer'{
  export class Tokenizer {
    protected _scanner: Scanner;
    protected _buffer: any[];

    constructor(src: string);

    public next(): string;
  }
}