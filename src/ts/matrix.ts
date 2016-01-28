/**
 * Matrix
 */
'use strict';

/**
 * @private
 * @requires Vector
 */
import {Vector} from './vector';

// TODO:
/**
 * @private
 */
const add = (a, b) => a + b;
/**
 * @private
 */
const sub = (a, b) => a - b;
/**
 * @private
 */
const mul = (a, b) => a * b;
/**
 * @private
 */
const div = (a, b) => a / b;
/**
 * @private
 */
const eq = (a, b) => a == b;
/**
 * @private
 */
const equal = (a, b) => a === b;
/**
 * @private
 */
const abs = a => Math.abs(a);
/**
 * @private
 */
const neg = a => -a;

/**
 * Matrix mxn
 * @class Matrix
 * @property {int} _m rows
 * @property {int} _n cols
 * @property {Array<?>} _mn
 */
export class Matrix {
  protected _m: int;
  protected _n: int;
  protected _mn: any[];

  /**
   * @param {number} m
   * @param {number} n
   */
  constructor(m: number, n: number) {
    this._m = m;
    this._n = n;
    this._mn = [];

    const arr = [];
    while (n--) {
      arr[n] = 0;
    }
    while (m--) {
      this._mn[m] = Reflect.apply(Array.prototype.concat, undefined, arr);
    }
  }

  /**
   * @return {int}
   */
  get length(): int {
    return this._m * this._n;
  }

  /**
   * @return {Matrix}
   */
  public clone(): Matrix {
    const m: Matrix = this;
    const mxx: Matrix = new Matrix(m._m, m._n);
    const mxm = mxx._mn;
    const mm = m._mn;
    let i: int = m._n;
    while (i--) {
      mxm[i] = Reflect.apply(Array.prototype.concat, undefined, mm[i]);
    }
    return mxx;
  }

  /**
   * @return int
   */
  public rows(): int {
    return this._m;
  }

  /**
   * @return int
   */
  public cols(): int {
    return this._n;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    const m = this;
    const mn = m._mn;
    const s = ['[\n[', mn[0][0]];
    const r = m._m;
    const c = m._n;
    for (let y = 1; y < c; ++y) {
      s[s.length] = ',';
      s[s.length] = mn[0][y];
    }
    s[s.length] = ']';
    for (let x = 1; x < r; ++x) {
      s[s.length] = ',\n[';
      s[s.length] = mn[x][0];
      for (let y = 1; y < c; ++y) {
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
  public row(n) {
    const mxx = this;
    let y = mxx._n;
    const m = new Matrix(1, y);
    const mm = m._mn;
    const mxm = mxx._mn;
    while (y--) { mm[0][y] = mxm[n][y]; }
    return m;
  }

  /**
   * @param {int} n
   * @return {Matrix}
   */
  public col(n) {
    const mxx = this;
    let x = mxx._m;
    const m = new Matrix(x, 1);
    const mm = m._mn;
    const mxm = mxx._mn;
    while (x--) { mm[x][0] = mxm[x][n]; }
    return m;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public add(n) {
    const m = this;
    if (m._m !== n._m || m._n !== n._n) { return undefined; }
    const mxx = m.clone();
    const mxm = mxx._mn;
    const mm = m._mn;
    const nm = n._mn;
    let x = m._m;
    while (x--) {
      let y = m._n;
      while (y--) { mxm[x][y] = add(mm[x][y], nm[x][y]); }
    }
    return mxx;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public sub(n) {
    const m = this;
    if (m._m !== n._m || m._n !== n._n) { return undefined; }
    const mxx = m.clone();
    const mxm = mxx._mn;
    const mm = m._mn;
    const nm = n._mn;
    let x = m._m;
    while (x--) {
      let y = m._n;
      while (y--) { mxm[x][y] = sub(mm[x][y], nm[x][y]); }
    }
    return mxx;
  }

  /**
   * @param {Matrix} n
   * @return {Matrix}
   */
  public mul(n: Matrix): Matrix {
    const m = this;
    if (m._n !== n._m) {
      throw new Error(`mismatch cols and rows: ${m._n} ${n._m}`);
    }

    const mx = new Matrix(m._m, n._n);
    const mxm = mx._mn;
    const mm = m._mn;
    const nm = n._mn;
    for (let x = 0; x < m._m; ++x) {
      for (let y = 0; y < n._n; ++y) {
        for (let z = 0; z < m._n; ++z) {
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
    const m = this;
    const cfm = m._m - 1;
    const cfn = m._n - 1;
    const mxx = new Matrix(cfm, cfn);
    const mxm = mxx._mn;
    const mm = m._mn;
    let a = 0;
    for (let x = 0; x < m._m; x++) {
      if (x !== i) {
        let b = 0;
        for (let y = 0; y < m._n; y++) {
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
  public det() {
    const m = this;
    if (m._m !== m._n) { return undefined; }
    const mxx = this.clone();
    const mm = mxx._mn;
    let d = 0;
    let x = m._m;
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
  public tr() {
    const m = this;
    const mm = m._mn;
    let tr = 0;
    let i = m._m < m._n ? m._m : m._n;
    while (i--) { tr = add(tr, mm[i][i]); }
    return tr;
  }

  /**
   * @return {Matrix}
   */
  public inv(): Matrix {
    const mxx = this;
    if (mxx._m !== mxx._n) { return undefined; }

    const m = Matrix.aug(mxx, Matrix.E(mxx._m));
    const mm = m._mn;
    for (let y = 0; y < m._m - 1; y++) {
      let x = y;
      while (!mm[x][y] && x < m._m - 1) { x += 1; }
      if (x === m._m - 1 && !mm[x][y]) { return undefined; }

      if (x !== y) {
        const tmp = mm[y];
        mm[y] = mm[x];
        mm[x] = tmp;
      }
      for (let k = y + 1; k < m._m; k++) {
        const c = div(mm[k][y], mm[y][y]);
        for (let z = y; z < m._n; z++) {
          mm[k][z] = sub(mm[k][z], mul(c, mm[y][z]));
        }
      }
    }
    for (let y = m._m - 1; y >= 0; y--) {
      let c = mm[y][y];
      for (let z = y; z < m._n; z++) {
        mm[y][z] = div(mm[y][z], c);
      }
      for (let k = y - 1; k >= 0; k--) {
        c = mm[k][y];
        for (let z = y; z < m._n; z++) {
          mm[k][z] = sub(mm[k][z], mul(c, mm[y][z]));
        }
      }
    }
    const n = new Matrix(mxx._m, mxx._n);
    const nm = n._mn;
    for (let x = 0; x < mxx._m; x++) {
      for (let y = 0; y < mxx._n; y++) { nm[x][y] = mm[x][y + mxx._m]; }
    }
    return n;    
  }

  /**
   * @return {boolean}
   */
  public isReg(): boolean {
    const d = this.det();
    return d > 0 || d < 0;
  }

  /**
   * @return {boolean}
   */
  public isSym(): boolean {
    const m = this;
    if (m._m !== m._n) { return false; }
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      for (let y = x + 1; y < m._m; y++) {
        if (!eq(mm[x][y], mm[y][x])) { return false; }
      }
    }
    return true;
  }

  /**
   * @return {boolean}
   */
  public isDiag(): boolean {
    const m = this;
    if (m._m !== m._n) { return false; }
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      for (let y = 0; y < m._n; y++) {
        if (mm[x][y] && x !== y) { return false; }
      }
    }
    return true;
  }

  /**
   * @return {boolean}
   */
  public isE(): boolean {
    const m = this;
    if (m._m !== m._n) { return false; }
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      for (let y = 0; y < m._m; y++) {
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
    const m = this;
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      for (let y = 0; y < m._n; y++) {
        if (mm[x][y]) { return true; }
      }
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  public isOrt(): boolean {
    const m = this;
    if (m._m !== m._n) { return false; }
    return m.mul(Matrix.T(m)).isE();
  }

  /**
   * @return {boolean}
   */
  public isToep(): boolean {
    const m: Matrix = this;
    if (m._m !== m._n) { return false; }
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      const c = mm[0][m._m - 1 - x];
      for (let y = 0; y <= x; y++) {
        if (mm[y][m._m - 1 - x + y] !== c) { return false; }
      }
    }
    for (let y = 0; y < m._n; y++) {
      const c = mm[y][0];
      for (let x = 0; x < m._n - y; x++) {
        if (mm[y + x][x] !== c) { return false; }
      }
    }
    return true;
  }

  /**
   * Convert anything to Matrix.
   * @param {number} m
   * @param {number} n
   * @return {Matrix}
   */
  public static mx(m, n) {
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
  public static array(arr) {
    const m = arr.length;
    const n = arr[0].length;
    const mxx = new Matrix(m, n);
    const mm = mxx._mn;
    for (let i = 0; i < m; ++i) {
      for (let j = 0; j < n; ++j) {
        mm[i][j] = arr[i][j];
      }
    }
    return mxx;
  }

  /**
   * @param {int} n
   * @param {int} k
   * @return {Matrix}
   */
  public static E(n = 2, k = 1) {
    const e = new Matrix(n, n);
    const em = e._mn;
    for (let x = 0; x < n; x++) { em[x][x] = k; }
    return e;
  }

  /**
   * @param {number} n
   * @param {number} k
   * @return {Matrix}
   */
  public static U(n, k) {
    n = n || 2;
    k = k === 0 ? 0 : k || 1;
    const e = new Matrix(n, n);
    const em = e._mn;
    for (let x = 0; x < n; x++) {
      for (let y = x; y < n; y++) { em[x][y] = k; }
    }
    return e;
  }

  /**
   * @param {number} n
   * @param {number} k
   * @return {Matrix}
   */
  public static D(n, k) {
    n = n || 2;
    k = k === 0 ? 0 : k || 1;
    const e = new Matrix(n, n);
    const em = e._mn;
    for (let x = 0; x < n; x++) {
      for (let y = x; y >= 0; y--) { em[x][y] = k; }
    }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static diag(arr) {
    if (arr instanceof Vector) {
      arr = arr._v;
    } else {
      arr = arr || [0];
    }
    let i = arr.length;
    const e = new Matrix(i, i);
    const em = e._mn;
    while (i--) { em[i][i] = arr[i]; }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static circ(arr) {
    if (arr instanceof Vector) {
      arr = arr._v;
    } else {
      arr = arr || [0];
    }
    const l = arr.length;
    const e = new Matrix(l, l);
    const em = e._mn;
    for (let x = 0; x < l; ++x) {
      for (let y = 0; y < l; ++y) { em[x][y] = arr[(x - y < 0 ? l + x - y : x - y)]; }
    }
    return e;
  }

  /**
   * @param {Array} arr
   * @return {Matrix}
   */
  public static toep(arr) {
    if (arr instanceof Vector) {
      arr = arr._v;
    } else {
      arr = arr || [0];
    }
    let l = arr.length;
    if (!(l & 1)) { return undefined; }
    l = (l + 1) >>> 1;
    const m = new Matrix(l, l);
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      for (let y = 0; y <= x; y++) { mm[y][m._m - 1 - x + y] = arr[x]; }
    }
    for (let y = 0; y < m._n; y++) {
      for (let x = 0; x < m._n - y; x++) { mm[y + x][x] = arr[y + l - 1]; }
    }
    return m;
  }

  /**
   * @param {Matrix} a
   * @return {Matrix}
   */
  public static T(a) {
    const m = new Matrix(a._n, a._m);
    const mm = m._mn;
    for (let x = 0; x < m._m; x++) {
      mm[x] = [];
      for (let y = 0; y < m._n; y++) {mm[x][y] = a[y][x];}
    }
    return m;
  }

  /**
   * @param {Matrix} a
   * @param {Matrix} b
   * @return {Matrix}
   */
  public static aug(a, b) {
    if (a._m !== b._m) { return undefined; }
    a = a.clone();
    const am = a._mn;
    const bm = b._mn;
    for (let x = 0; x < a._m; x++) {
      for (let y = 0; y < b._n; y++) { am[x][y + a._n] = bm[x][y]; }
    }
    a._n += b._n;
    return a;
  }

  /**
   * @return {string}
   */
  public html() {
    const m = this;
    const mn = m._mn;
    const s = ['<table>\n<tr><td>', mn[0][0]];
    const r = m._m;
    const c = m._n;
    for (let y = 1; y < c; ++y) {
      s[s.length] = ',';
      s[s.length] = mn[0][y];
    }
    s[s.length] = '</td><td>';
    for (let x = 1; x < r; ++x) {
      s[s.length] = '</td></tr>\n<tr><td>';
      s[s.length] = mn[x][0];
      for (let y = 1; y < c; ++y) {
        s[s.length] = '</td><td>';
        s[s.length] = mn[x][y];
      }
      s[s.length] = '</td></tr>';
    }
    s[s.length] = '\n</table>';
    return s.join('');
  }

  /**
   * @param {number} type
   * @return {string}
   */
  public tex(type) {
    const m = this;
    const types = ['matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix'];
    const mn = m._mn;
    const s = ['\\begin{', (types[type] || 'bmatrix'), '}\n', mn[0][0]];
    const r = m._m;
    const c = m._n;
    for (let y = 1; y < c; ++y) {
      s[s.length] = '&';
      s[s.length] = mn[0][y];
    }
    for (let x = 1; x < r; ++x) {
      s[s.length] = '\\\\\n';
      s[s.length] = mn[x][0];
      for (let y = 1; y < c; y++) {
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
  public eq(n) {
    const m = this;
    if (m._m !== n._m || m._n !== n._n) { return false; }
    const mm = m._mn;
    const nm = n._mn;
    let x = m._m;
    while (x--) {
      let y = m._n;
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
  public equal(n) {
    const m = this;
    if (m._m !== n._m || m._n !== n._n) { return false; }
    const mm = m._mn;
    const nm = n._mn;
    let x = m._m;
    while (x--) {
      let y = m._n;
      while (y--) {
        if (!equal(mm[x][y], nm[x][y])) { return false; }
      }
    }
    return true;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @return {Matrix}
   */
  public rowSwap(i, j) {
    const mxx = this;
    const mm = mxx._mn;
    for (let y = 0; y < mxx._n; y++) {
      const v = mm[j][y];
      mm[j][y] = mm[i][y];
      mm[i][y] = v;
    }
    return mm;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @return {Matrix}
   */
  public colSwap(i, j) {
    const mxx = this;
    const mm = mxx._mn;
    for (let x = 0; x < mxx._m; x++) {
      const v = mm[x][j];
      mm[x][j] = mm[x][i];
      mm[x][i] = v;
    }
    return mm;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @param {number} n
   * @return {Matrix}
   */
  public rowAdd(i, j, n) {
    const mxx = this;
    n = n === 0 ? 0 : n || 1;
    const m = mxx.clone();
    const mm = m._mn;
    let x = m._n;
    while (x--) { mm[i][x] = add(mm[i][x], mul(mm[j][x], n)); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @param {number} n
   * @return {Matrix}
   */
  public colAdd(i, j, n) {
    const mxx = this;
    n = n === 0 ? 0 : n || 1;
    const m = mxx.clone();
    const mm = m._mn;
    for (let x = 0; x < m._n; x++) { mm[x][i] = add(mm[x][i], mul(mm[x][j], n)); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @param {number} n
   * @return {Matrix}
   */
  public rowSub(i, j, n) {
    const mxx = this;
    n = n === 0 ? 0 : n || 1;
    const m = mxx.clone();
    const mm = m._mn;
    let x = m._n;
    while (x--) { mm[i][x] = sub(mm[i][x], mul(mm[j][x], n)); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} j
   * @param {number} n
   * @return {Matrix}
   */
  public colSub(i, j, n) {
    const mxx = this;
    n = n === 0 ? 0 : n || 1;
    const m = mxx.clone();
    const mm = m._mn;
    for (let x = 0; x < m._n; x++) { mm[x][i] = sub(mm[x][i], mul(mm[x][j], n)); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public rowMul(i, n) {
    const mxx = this;
    const m = mxx.clone();
    let x = m._n;
    while (x--) { m[i][x] = mul(m[i][x], n); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public colMul(i, n) {
    const mxx = this;
    const m = mxx.clone();
    const mm = m._mn;
    let x = m._n;
    while (x--) { mm[x][i] = mul(mm[x][i], n); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public rowDiv(i, n) {
    const mxx = this;
    const m = mxx.clone();
    let x = m._n;
    while (x--) { m[i][x] = div(m[i][x], n); }
    return m;
  }

  /**
   * @param {number} i
   * @param {number} n
   * @return {Matrix}
   */
  public colDiv(i, n) {
    const mxx = this;
    const m = mxx.clone();
    const mm = m._mn;
    let x = m._n;
    while (x--) { mm[x][i] = div(mm[x][i], n); }
    return m;
  }

}
