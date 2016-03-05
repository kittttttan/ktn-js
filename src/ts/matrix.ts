/**
 * Matrix
 */
'use strict';

// TODO:
/**
 * @private
 */
const add: (a: number, b: number) => number = (a: number, b: number): number => a + b;
/**
 * @private
 */
const sub: (a: number, b: number) => number = (a: number, b: number): number => a - b;
/**
 * @private
 */
const mul: (a: number, b: number) => number = (a: number, b: number): number => a * b;
/**
 * @private
 */
const div: (a: number, b: number) => number = (a: number, b: number): number => a / b;
/**
 * @private
 */
const eq: (a: number, b: number) => boolean = (a: number, b: number): boolean => a == b;
/**
 * @private
 */
const equal: (a: number, b: number) => boolean = (a: number, b: number): boolean => a === b;
/**
 * @private
 */
const abs: (a: number) => number = (a: number): number => Math.abs(a);
/**
 * @private
 */
const neg: (a: number) => number = (a: number): number => -a;

/**
 * Matrix mxn
 * @class Matrix
 * @property {int} _m rows
 * @property {int} _n cols
 * @property {Array<Array<?>>} _mn
 */
export default class Matrix {
  protected _m: int;
  protected _n: int;
  protected _mn: number[][];

  /**
   * @param {int} m
   * @param {int} n
   */
  constructor(m: int, n: int) {
    this._m = m;
    this._n = n;
    this._mn = [];

    const arr: number[] = [];
    while (n--) {
      arr[n] = 0;
    }
    while (m--) {
      // this._mn[m] = Reflect.apply(Array.prototype.concat, undefined, arr);
      this._mn[m] = Array.prototype.concat.apply(arr);
    }
  }

  /**
   * Convert anything to Matrix.
   * @param {Object} m
   * @param {Object} n
   * @return {Matrix}
   */
  public static mx(m: any, n: any): Matrix {
    if (!arguments.length) { return new Matrix(0, 0); }
    if (arguments.length === 1) {
      if (m instanceof Matrix) { return m.clone(); }
      if (m instanceof Array) { return Matrix.array(m); }
      m |= 0;
      if (m < 0) { m = 1; }
      return new Matrix(m, m);
    }
    m |= 0;
    n |= 0;
    if (m < 0) { m = 1; }
    if (n < 0) { n = 1; }
    return new Matrix(m, n);
  }

  /**
   * Convert Array to Matrix.
   * @param {Array} arr
   * @return {Matrix}
   */
  public static array(arr: number[][]): Matrix {
    const m: int = arr.length;
    const n: int = arr[0].length;
    const mxx: Matrix = new Matrix(m, n);
    const mm: number[][] = mxx._mn;
    for (let i: int = 0; i < m; ++i) {
      for (let j: int = 0; j < n; ++j) {
        mm[i][j] = arr[i][j];
      }
    }
    return mxx;
  }

  /**
   * @param {int} n
   * @param {number} k
   * @return {Matrix}
   */
  public static E(n: int = 2, k: number = 1): Matrix {
    const e: Matrix = new Matrix(n, n);
    const em: number[][] = e._mn;
    for (let x: int = 0; x < n; x++) { em[x][x] = k; }
    return e;
  }

  /**
   * @param {int} n
   * @param {number} k
   * @return {Matrix}
   */
  public static U(n: int = 2, k: number = 1): Matrix {
    const e: Matrix = new Matrix(n, n);
    const em: number[][] = e._mn;
    for (let x: int = 0; x < n; x++) {
      for (let y: int = x; y < n; y++) { em[x][y] = k; }
    }
    return e;
  }

  /**
   * @param {int} n
   * @param {number} k
   * @return {Matrix}
   */
  public static D(n: int = 2, k: number = 1): Matrix {
    const e: Matrix = new Matrix(n, n);
    const em: number[][] = e._mn;
    for (let x: int = 0; x < n; x++) {
      for (let y: int = x; y >= 0; y--) { em[x][y] = k; }
    }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static diag(arr: number[]): Matrix {
    arr = arr || [0];

    let i: int = arr.length;
    const e: Matrix = new Matrix(i, i);
    const em: number[][] = e._mn;
    while (i--) { em[i][i] = arr[i]; }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static circ(arr: number[]): Matrix {
    arr = arr || [0];

    const l: int = arr.length;
    const e: Matrix = new Matrix(l, l);
    const em: number[][] = e._mn;
    for (let x: int = 0; x < l; ++x) {
      for (let y: int = 0; y < l; ++y) { em[x][y] = arr[(x - y < 0 ? l + x - y : x - y)]; }
    }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static toep(arr: number[]): Matrix {
    arr = arr || [0];

    let l: int = arr.length;
    if (!(l & 1)) { return undefined; }
    l = (l + 1) >>> 1;
    const m: Matrix = new Matrix(l, l);
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      for (let y: int = 0; y <= x; y++) { mm[y][m._m - 1 - x + y] = arr[x]; }
    }
    for (let y: int = 0; y < m._n; y++) {
      for (let x: int = 0; x < m._n - y; x++) { mm[y + x][x] = arr[y + l - 1]; }
    }
    return m;
  }

  /**
   * @param {Matrix} a
   * @return {Matrix}
   */
  public static T(a: Matrix): Matrix {
    const m: Matrix = new Matrix(a._n, a._m);
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      mm[x] = [];
      for (let y: int = 0; y < m._n; y++) { mm[x][y] = a[y][x]; }
    }
    return m;
  }

  /**
   * @param {Matrix} a
   * @param {Matrix} b
   * @return {Matrix}
   */
  public static aug(a: Matrix, b: Matrix): Matrix {
    if (a._m !== b._m) { return undefined; }
    a = a.clone();
    const am: number[][] = a._mn;
    const bm: number[][] = b._mn;
    for (let x: int = 0; x < a._m; x++) {
      for (let y: int = 0; y < b._n; y++) { am[x][y + a._n] = bm[x][y]; }
    }
    a._n += b._n;
    return a;
  }

  /**
   * @return {int}
   */
  public get length(): int {
    return this._m * this._n;
  }

  /**
   * @return {Matrix}
   */
  public clone(): Matrix {
    const m: Matrix = this;
    const mxx: Matrix = new Matrix(m._m, m._n);
    const mxm: number[][] = mxx._mn;
    const mm: number[][] = m._mn;
    let i: int = m._n;
    while (i--) {
      // mxm[i] = Reflect.apply(Array.prototype.concat, undefined, mm[i]);
      mxm[i] = Array.prototype.concat.apply(mm[i]);
    }
    return mxx;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    const m: Matrix = this;
    const mn: number[][] = m._mn;
    const s: (string|number)[] = ['[\n[', mn[0][0]];
    const r: int = m._m;
    const c: int = m._n;
    for (let y: int = 1; y < c; ++y) {
      s[s.length] = ',';
      s[s.length] = mn[0][y];
    }
    s[s.length] = ']';
    for (let x: int = 1; x < r; ++x) {
      s[s.length] = ',\n[';
      s[s.length] = mn[x][0];
      for (let y: int = 1; y < c; ++y) {
        s[s.length] = ',';
        s[s.length] = mn[x][y];
      }
      s[s.length] = ']';
    }
    s[s.length] = '\n]';
    return s.join('');
  }

  /**
   * @param {int} n
   * @return {Matrix}
   */
  public row(n: int): Matrix {
    const mxx: Matrix = this;
    let y: int = mxx._n;
    const m: Matrix = new Matrix(1, y);
    const mm: number[][] = m._mn;
    const mxm: number[][] = mxx._mn;
    while (y--) { mm[0][y] = mxm[n][y]; }
    return m;
  }

  /**
   * @param {int} n
   * @return {Matrix}
   */
  public col(n: int): Matrix {
    const mxx: Matrix = this;
    let x: int = mxx._m;
    const m: Matrix = new Matrix(x, 1);
    const mm: number[][] = m._mn;
    const mxm: number[][] = mxx._mn;
    while (x--) { mm[x][0] = mxm[x][n]; }
    return m;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public add(n: Matrix): Matrix {
    const m: Matrix = this;
    if (m._m !== n._m || m._n !== n._n) { return undefined; }
    const mxx: Matrix = m.clone();
    const mxm: number[][] = mxx._mn;
    const mm: number[][] = m._mn;
    const nm: number[][] = n._mn;
    let x: int = m._m;
    while (x--) {
      let y: int = m._n;
      while (y--) { mxm[x][y] = add(mm[x][y], nm[x][y]); }
    }
    return mxx;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public sub(n: Matrix): Matrix {
    const m: Matrix = this;
    if (m._m !== n._m || m._n !== n._n) { return undefined; }
    const mxx: Matrix = m.clone();
    const mxm: number[][] = mxx._mn;
    const mm: number[][] = m._mn;
    const nm: number[][] = n._mn;
    let x: int = m._m;
    while (x--) {
      let y: int = m._n;
      while (y--) { mxm[x][y] = sub(mm[x][y], nm[x][y]); }
    }
    return mxx;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public mul(n: Matrix): Matrix {
    const m: Matrix = this;
    if (m._n !== n._m) {
      throw new Error(`mismatch cols and rows: ${m._n} ${n._m}`);
    }

    const mx: Matrix = new Matrix(m._m, n._n);
    const mxm: number[][] = mx._mn;
    const mm: number[][] = m._mn;
    const nm: number[][] = n._mn;
    for (let x: int = 0; x < m._m; ++x) {
      for (let y: int = 0; y < n._n; ++y) {
        for (let z: int = 0; z < m._n; ++z) {
          mxm[x][y] = add(mxm[x][y], mul(mm[x][z], nm[z][y]));
        }
      }
    }

    return mx;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @return {Matrix}
   */
  public cf(i: int, j: int): Matrix {
    const m: Matrix = this;
    const cfm: int = m._m - 1;
    const cfn: int = m._n - 1;
    const mxx: Matrix = new Matrix(cfm, cfn);
    const mxm: number[][] = mxx._mn;
    const mm: number[][] = m._mn;
    let a: int = 0;
    for (let x: int = 0; x < m._m; x++) {
      if (x !== i) {
        let b: int = 0;
        for (let y: int = 0; y < m._n; y++) {
          if (y !== j) {
            mxm[a][b] = mm[x][y];
            b++;
          }
        }
        a++;
      }
    }
    return mxx;
  }

  /**
   * @return {double}
   */
  public det(): double {
    const m: Matrix = this;
    if (m._m !== m._n) { return undefined; }
    const mxx: Matrix = this.clone();
    const mm: number[][] = mxx._mn;
    let d: int = 0;
    let x: int = m._m;
    if (x === 2) {
      return abs(sub(mul(mm[0][0], mm[1][1]), mul(mm[1][0], mm[0][1])));
    }
    while (x--) {
      if (mm[x][0]) {
        d = !(x & 1) ?
          add(d, mul(mm[x][0], mxx.cf(x, 0).det())) :
          add(d, mul(neg(mm[x][0]), mxx.cf(x, 0).det()));
      }
    }
    return d;
  }

  /**
   * @return {double}
   */
  public tr(): double {
    const m: Matrix = this;
    const mm: number[][] = m._mn;
    let tr: int = 0;
    let i: int = m._m < m._n ? m._m : m._n;
    while (i--) { tr = add(tr, mm[i][i]); }
    return tr;
  }

  /**
   * @return {Matrix}
   */
  public inv(): Matrix {
    const mxx: Matrix = this;
    if (mxx._m !== mxx._n) { return undefined; }

    const m: Matrix = Matrix.aug(mxx, Matrix.E(mxx._m));
    const mm: number[][] = m._mn;
    for (let y: int = 0; y < m._m - 1; y++) {
      let x: int = y;
      while (!mm[x][y] && x < m._m - 1) { x += 1; }
      if (x === m._m - 1 && !mm[x][y]) { return undefined; }

      if (x !== y) {
        const tmp: number[] = mm[y];
        mm[y] = mm[x];
        mm[x] = tmp;
      }
      for (let k: int = y + 1; k < m._m; k++) {
        const c: number = div(mm[k][y], mm[y][y]);
        for (let z: int = y; z < m._n; z++) {
          mm[k][z] = sub(mm[k][z], mul(c, mm[y][z]));
        }
      }
    }
    for (let y: int = m._m - 1; y >= 0; y--) {
      let c: number = mm[y][y];
      for (let z: int = y; z < m._n; z++) {
        mm[y][z] = div(mm[y][z], c);
      }
      for (let k: int = y - 1; k >= 0; k--) {
        c = mm[k][y];
        for (let z: int = y; z < m._n; z++) {
          mm[k][z] = sub(mm[k][z], mul(c, mm[y][z]));
        }
      }
    }
    const n: Matrix = new Matrix(mxx._m, mxx._n);
    const nm: number[][] = n._mn;
    for (let x: int = 0; x < mxx._m; x++) {
      for (let y: int = 0; y < mxx._n; y++) { nm[x][y] = mm[x][y + mxx._m]; }
    }
    return n;
  }

  /**
   * @return {boolean}
   */
  public isReg(): boolean {
    const d: double = this.det();
    return d > 0 || d < 0;
  }

  /**
   * @return {boolean}
   */
  public isSym(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      for (let y: int = x + 1; y < m._m; y++) {
        if (!eq(mm[x][y], mm[y][x])) { return false; }
      }
    }
    return true;
  }

  /**
   * @return {boolean}
   */
  public isDiag(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      for (let y: int = 0; y < m._n; y++) {
        if (mm[x][y] && x !== y) { return false; }
      }
    }
    return true;
  }

  /**
   * @return {boolean}
   */
  public isE(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      for (let y: int = 0; y < m._m; y++) {
        if (x !== y) {
          if (mm[x][y]) { return false; }
        } else {
          if (mm[x][y] !== 1) { return false; }
        }
      }
    }
    return true;
  }

  /**
   * @return {boolean}
   */
  public isNonZero(): boolean {
    const m: Matrix = this;
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      for (let y: int = 0; y < m._n; y++) {
        if (mm[x][y]) { return true; }
      }
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  public isOrt(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    return m.mul(Matrix.T(m)).isE();
  }

  /**
   * @return {boolean}
   */
  public isToep(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._m; x++) {
      const c: number = mm[0][m._m - 1 - x];
      for (let y: int = 0; y <= x; y++) {
        if (mm[y][m._m - 1 - x + y] !== c) { return false; }
      }
    }
    for (let y: int = 0; y < m._n; y++) {
      const c: number = mm[y][0];
      for (let x: int = 0; x < m._n - y; x++) {
        if (mm[y + x][x] !== c) { return false; }
      }
    }
    return true;
  }

  /**
   * @return {string}
   */
  public html(): string {
    const m: Matrix = this;
    const mn: number[][] = m._mn;
    const s: (string|number)[] = ['<table>\n<tr><td>', mn[0][0]];
    const r: int = m._m;
    const c: int = m._n;
    for (let y: int = 1; y < c; ++y) {
      s[s.length] = ',';
      s[s.length] = mn[0][y];
    }
    s[s.length] = '</td><td>';
    for (let x: int = 1; x < r; ++x) {
      s[s.length] = '</td></tr>\n<tr><td>';
      s[s.length] = mn[x][0];
      for (let y: int = 1; y < c; ++y) {
        s[s.length] = '</td><td>';
        s[s.length] = mn[x][y];
      }
      s[s.length] = '</td></tr>';
    }
    s[s.length] = '\n</table>';
    return s.join('');
  }

  /**
   * @param {int} type
   * @return {string}
   */
  public tex(type: int): string {
    const m: Matrix = this;
    const types: string[] = ['matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix'];
    const mn: number[][] = m._mn;
    const s: (string|number)[] = ['\\begin{', (types[type] || 'bmatrix'), '}\n', mn[0][0]];
    const r: int = m._m;
    const c: int = m._n;
    for (let y: int = 1; y < c; ++y) {
      s[s.length] = '&';
      s[s.length] = mn[0][y];
    }
    for (let x: int = 1; x < r; ++x) {
      s[s.length] = '\\\\\n';
      s[s.length] = mn[x][0];
      for (let y: int = 1; y < c; y++) {
        s[s.length] = '&';
        s[s.length] = mn[x][y];
      }
    }
    s[s.length] = '\n\\end{';
    s[s.length] = types[type] || 'bmatrix';
    s[s.length] = '}';
    return s.join('');
  }

  /**
   * @param {Matrix} n
   * @return {boolean}
   */
  public eq(n: Matrix): boolean {
    const m: Matrix = this;
    if (m._m !== n._m || m._n !== n._n) { return false; }
    const mm: number[][] = m._mn;
    const nm: number[][] = n._mn;
    let x: int = m._m;
    while (x--) {
      let y: int = m._n;
      while (y--) {
        if (!eq(mm[x][y], nm[x][y])) { return false; }
      }
    }
    return true;
  }

  /**
   * @param {Matrix} n
   * @return {boolean}
   */
  public equal(n: Matrix): boolean {
    const m: Matrix = this;
    if (m._m !== n._m || m._n !== n._n) { return false; }
    const mm: number[][] = m._mn;
    const nm: number[][] = n._mn;
    let x: int = m._m;
    while (x--) {
      let y: int = m._n;
      while (y--) {
        if (!equal(mm[x][y], nm[x][y])) { return false; }
      }
    }
    return true;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @return {Matrix}
   */
  public rowSwap(i: int, j: int): Matrix {
    const mxx: Matrix = this;
    const mm: number[][] = mxx._mn;
    for (let y: int = 0; y < mxx._n; y++) {
      const v: number = mm[j][y];
      mm[j][y] = mm[i][y];
      mm[i][y] = v;
    }
    return mxx;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @return {Matrix}
   */
  public colSwap(i: int, j: int): Matrix {
    const mxx: Matrix = this;
    const mm: number[][] = mxx._mn;
    for (let x: int = 0; x < mxx._m; x++) {
      const v: number = mm[x][j];
      mm[x][j] = mm[x][i];
      mm[x][i] = v;
    }
    return mxx;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @param {number} n multiple
   * @return {Matrix}
   */
  public rowAdd(i: int, j: int, n: number = 1): Matrix {
    const mxx: Matrix = this;

    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    let x: int = m._n;
    while (x--) { mm[i][x] = add(mm[i][x], mul(mm[j][x], n)); }
    return m;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @param {number} n multiple
   * @return {Matrix}
   */
  public colAdd(i: int, j: int, n: number = 1): Matrix {
    const mxx: Matrix = this;

    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._n; x++) { mm[x][i] = add(mm[x][i], mul(mm[x][j], n)); }
    return m;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @param {number} n
   * @return {Matrix}
   */
  public rowSub(i: int, j: int, n: number = 1): Matrix {
    const mxx: Matrix = this;

    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    let x: int = m._n;
    while (x--) { mm[i][x] = sub(mm[i][x], mul(mm[j][x], n)); }
    return m;
  }

  /**
   * @param {int} i
   * @param {int} j
   * @param {number} n
   * @return {Matrix}
   */
  public colSub(i: int, j: int, n: number = 1): Matrix {
    const mxx: Matrix = this;

    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    for (let x: int = 0; x < m._n; x++) { mm[x][i] = sub(mm[x][i], mul(mm[x][j], n)); }
    return m;
  }

  /**
   * @param {int} i
   * @param {number} n
   * @return {Matrix}
   */
  public rowMul(i: int, n: number): Matrix {
    const mxx: Matrix = this;
    const m: Matrix = mxx.clone();
    let x: int = m._n;
    while (x--) { m[i][x] = mul(m[i][x], n); }
    return m;
  }

  /**
   * @param {int} i
   * @param {number} n
   * @return {Matrix}
   */
  public colMul(i: int, n: number): Matrix {
    const mxx: Matrix = this;
    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    let x: int = m._n;
    while (x--) { mm[x][i] = mul(mm[x][i], n); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public rowDiv(i: int, n: number): Matrix {
    const mxx: Matrix = this;
    const m: Matrix = mxx.clone();
    let x: int = m._n;
    while (x--) { m[i][x] = div(m[i][x], n); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public colDiv(i: int, n: number): Matrix {
    const mxx: Matrix = this;
    const m: Matrix = mxx.clone();
    const mm: number[][] = m._mn;
    let x: int = m._n;
    while (x--) { mm[x][i] = div(mm[x][i], n); }
    return m;
  }

}
