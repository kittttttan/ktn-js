'use strict';

/**
 * @private
 * @type string
 */
const NUM_CHARAS = '0123456789.';
/**
 * @private
 * @type string
 */
const OPE_CHARAS = '+-*/^()';

/**
 * @class Scanner
 * @property {string} _src
 * @property {number} _index
 */
export class Scanner {
  protected _src: string;
  protected _index: number;

  /**
   * @param {string} src
   */
  constructor(src: string) {
    this._src = src;
    this._index = 0;
  }

  /**
   * @return {boolean}
   */
  public eof(): boolean {
    return this._index >= this._src.length;
  }

  /**
   * parse comments, spaces, linebrakes, etc.
   * @return {string}
   */
  public comment(): string {
    while (!this.eof()) {
      const ch: string = this._src[this._index];
      // console.log(`comment ${ch}`);
      if (ch === ' ') {
        ++this._index;
      } else if ('\r\n'.includes(ch)) {
        ++this._index;
      } else {
        break;
      }
    }

    return '';
  }

  /**
   * tokenize top
   * @return {string}
   */
  public lex(): string|null {
    if (this.eof()) {
      return null;
    }

    const ch: string = this._src[this._index];
    if (NUM_CHARAS.includes(ch)) {
      return this.num();
    }
    return this.punctuator();
  }

  /**
   * tokenize number
   * @return {string}
   */
  public num(): string {
    let n: string = this._src[this._index++];
    let ch: string = this._src[this._index];
    // console.log(`num ${n} ${ch}`);
    while (NUM_CHARAS.includes(ch)) {
      n += ch;
      ch = this._src[++this._index];
      // console.log(ch);
    }

    return n;
  }

  /**
   * tokenize punctuator
   * @return {string}
   */
  public punctuator(): string {
    const s: string = this._src[this._index];
    // console.log(`punctuator ${s}`);
    if (OPE_CHARAS.includes(s)) {
      ++this._index;
      return s;
    }

    const ss: string = this._src.substr(this._index, 2);
    if (ss === '**') {
      this._index += 2;
      return '^';
    }

    return s;
  }
}
