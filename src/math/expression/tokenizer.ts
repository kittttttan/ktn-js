import {Scanner} from './scanner.ts';

export class Tokenizer {
  protected _scanner: Scanner;
  protected _buffer: any[];

  constructor(src: string) {
    this._scanner = new Scanner(src);
    this._buffer = [];
  }

  public next(): string {
    if (this._buffer.length === 0) {
      this._scanner.comment();
      if (!this._scanner.eof()) {
        const token: string|null = this._scanner.lex();
        // console.log(`next ${token}`);
        this._buffer.push(token);
      }
    }

    return this._buffer.shift();
  }
}
