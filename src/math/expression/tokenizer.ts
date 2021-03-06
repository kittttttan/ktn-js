'use strict';

/**
 * @private
 * @requires Scanner
 */
import {Scanner} from './scanner';

/**
 * @class Tokenizer
 * @property {Scanner} _scanner
 * @property {any[]} _buffer
 */
export class Tokenizer {
  protected _scanner: Scanner;
  protected _buffer: any[];

  /**
   * @param {string} src
   */
  constructor(src: string) {
    this._scanner = new Scanner(src);
    this._buffer = [];
  }

  /**
   * @return {string}
   */
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
