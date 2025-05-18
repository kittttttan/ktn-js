const NUM_CHARAS = '0123456789.';
const OPE_CHARAS = '+-*/^()';

export class Scanner {
  protected _src: string;
  protected _index: number;

  constructor(src: string) {
    this._src = src;
    this._index = 0;
  }

  public eof(): boolean {
    return this._index >= this._src.length;
  }

  /**
   * parse comments, spaces, linebrakes, etc.
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
   */
  public lex(): string | null {
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
   */
  public punctuator(): string {
    const s: string = this._src[this._index];
    // console.log(`punctuator ${s}`);
    if (OPE_CHARAS.includes(s)) {
      ++this._index;
      return s;
    }

    const ss: string = this._src.substring(this._index, this._index + 2);
    if (ss === '**') {
      this._index += 2;
      return '^';
    }

    let s3 = '';
    let ch = this._src[this._index];
    while (
      (ch >= 'A' && ch <= 'z')
      || (ch >= '0' && ch <= '9')
    ) {
      s3 += ch;
      ch = this._src[++this._index];
    }

    if (s3.length < 1) {
      ++this._index;
      return s;
    }

    return s3;
  }
}
