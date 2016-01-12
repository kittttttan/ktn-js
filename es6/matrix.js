/**
 * Matrix
 */

 /**
 * Matrix mxn
 * @class Matrix
 */
export class Matrix {
  /**
   * @property {number} _m rows
   * @property {number} _n cols
   * @property {Array<?>} _mn
   * @param {number} m
   * @param {number} n
   */
  constructor(m, n) {
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

  clone() {
    return mxClone(this);
  }

  rows() {
    return this._m;
  }

  cols() {
    return this._n;
  }

  toString() {
    return mxToString(this);
  }

  _co_() {
    return 11;
  }

  _len_() {
    return mxLength(this);
  }

  _html_() {
    return mxHtml(this);
  }

  _tex_(type) {
    return mxTex(this, type);
  }

  _eq_(m) {
    return mxEq(this, m);
  }

  _equal_(m) {
    return mxEqual(this, m);
  }

  row(n) {
    return mxRow(this, n);
  }

  col(n) {
    return mxCol(this, n);
  }

  add(m) {
    return mxAdd(this, m);
  }

  sub(m) {
    return mxSub(this, m);
  }

  mul(m) {
    return mxMul(this, m);
  }

  _add_(m) {
    return mxAdd(this, m);
  }

  _sub_(m) {
    return mxSub(this, m);
  }

  _mul_(m) {
    return mxMul(this, m);
  }

  rSwap(i, j) {
    return mxRowSwap(this, i, j);
  }

  cSwap(i, j) {
    return mxColSwap(this, i, j);
  }

  rAdd(i, j, n) {
    return mxRowAdd(this, i, j, n);
  }

  cAdd(i, j, n) {
    return mxColAdd(this, i, j, n);
  }

  rSub(i, j, n) {
    return mxRowSub(this, i, j, n);
  }

  cSub(i, j, n) {
    return mxColSub(this, i, j, n);
  }

  rMul(i, n) {
    return mxRowMul(this, i, n);
  }

  cMul(i, n) {
    return mxColMul(this, i, n);
  }

  rDiv(i, n) {
    return mxRowDiv(this, i, n);
  }

  cDiv(i, n) {
    return mxColDiv(this, i, n);
  }

  cf(i, j) {
    return mxCf(this, i, j);
  }

  det() {
    return mxDet(this);
  }

  tr() {
    return mxTr(this);
  }

  _inv_() {
    return mxInv(this);
  }

  isReg() {
    return mxIsReg(this);
  }

  isSym() {
    return mxIsSym(this);
  }

  isDiag() {
    return mxIsDiag(this);
  }

  isE() {
    return mxIsE(this);
  }

  isNonZero() {
    return mxIsNonZero(this);
  }

  isOrt() {
    return mxIsOrt(this);
  }

  isToep() {
    return mxIsToep(this);
  }
}

/**
 * Convert anything to Matrix.
 * @param {number} m
 * @param {number} n
 * @return {Matrix}
 */
function mx(m, n) {
  if (!arguments.length) { return new Matrix(0, 0); }
  if (arguments.length === 1) {
    if (m instanceof Matrix) { return m.clone(); }
    if (m instanceof Array) { return mxArray(m); }
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
function mxArray(arr) {
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
 * Convert Array to Matrix.
 * @param {Array} m
 * @return {Matrix}
 */
function mxClone(m) {
  const mxx = new Matrix(m._m, m._n);
  const mxm = mxx._mn;
  const mm = m._mn;
  let i = m._n;
  while (i--) { mxm[i] = Reflect.apply(Array.prototype.concat, undefined, mm[i]); }
  return mxx;
}

/**
 * @param {number} n
 * @param {number} k
 * @return {Matrix}
 */
function mxE(n, k) {
  n = n || 2;
  k = k === 0 ? 0 : k || 1;
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
function mxU(n, k) {
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
function mxD(n, k) {
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
function mxDiag(arr) {
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
function mxCirc(arr) {
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
function mxToep(arr) {
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
function mxT(a) {
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
function mxAug(a, b) {
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
 * @param {Matrix} m
 * @return {string}
 */
function mxToString(m) {
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
 * @param {Matrix} m
 * @return {string}
 */
function mxHtml(m) {
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
 * @param {Matrix} m
 * @param {number} type
 * @return {string}
 */
function mxTex(m, type) {
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
    for (y = 1; y < c; y++) {
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
 * @param {Matrix} m
 * @return {number}
 */
function mxLength(m) {
  return m._m * m._n;
}

/**
 * @param {Matrix} m
 * @param {Matrix} n
 * @return {boolean}
 */
function mxEq(m, n) {
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
 * @param {Matrix} m
 * @param {Matrix} n
 * @return {boolean}
 */
function mxEqual(m, n) {
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
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxRow(mxx, n) {
  let y = mxx._n;
  const m = new Matrix(1, y);
  const mm = m._mn;
  const mxm = mx._mn;
  while (y--) { mm[0][y] = mxm[n][y]; }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxCol(mxx, n) {
  let x = mxx._m;
  const m = new Matrix(x, 1);
  const mm = m._mn;
  const mxm = mxx._mn;
  while (x--) { mm[x][0] = mxm[x][n]; }
  return m;
}

/**
 * @param {Matrix} m
 * @param {Matrix} n
 * @return {Matrix}
 */
function mxAdd(m, n) {
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
  return mx;
}

/**
 * @param {Matrix} m
 * @param {Matrix} n
 * @return {Matrix}
 */
function mxSub(m, n) {
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
  return mx;
}

/**
 * @param {Matrix} m
 * @param {Matrix} n
 * @return {Matrix}
 */
function mxMul(m, n) {
  if (m._n !== n._m) { return undefined; }
  const mxx = new Matrix(m._m, n._n);
  const mxm = mxx._mn;
  const mm = m._mn;
  const nm = n._mn;
  for (let x = 0; x < m._m; x++) {
    for (let y = 0; y < n._n; y++) {
      for (let z = 0; z < m._n; z++) {
        mxm[x][y] = add(mxm[x][y], mul(mm[x][z], nm[z][y]));
      }
    }
  }
  return mx;
}

/**
 * @param {Matrix} m
 * @param {number} i
 * @param {number} j
 * @return {Matrix}
 */
function mxCf(m, i, j) {
  const cfm = this._m - 1;
  const cfn = this._n - 1;
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
  return mx;
}

/**
 * @param {Matrix} m
 * @return {number}
 */
function mxDet(m) {
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
        add(d, mul(mm[x][0], mxDet(mxCf(mm, x, 0)))) :
        add(d, mul(neg(mm[x][0]), mxDet(mxCf(mm, x, 0))));
    }
  }
  return d;
}

/**
 * @param {Matrix} m
 * @return {number}
 */
function mxTr(m) {
  const mm = m._mn;
  let tr = 0;
  let i = m._m < m._n ? m._m : m._n;
  while (i--) { tr = add(tr, mm[i][i]); }
  return tr;
}

/**
 * @param {Matrix} mxx
 * @return {number}
 */
function mxInv(mxx) {
  if (mxx._m !== mxx._n) { return undefined; }
  const m = mxAug(mxx, mxE(mxx._m));
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
      for (z = y; z < m._n; z++) {
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
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @return {Matrix}
 */
function mxRowSwap(mxx, i, j) {
  const mm = mxx._mn;
  for (let y = 0; y < mxx._n; y++) {
    const v = mm[j][y];
    mm[j][y] = mm[i][y];
    mm[i][y] = v;
  }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @return {Matrix}
 */
function mxColSwap(mxx, i, j) {
  const mm = mxx._mn;
  for (let x = 0; x < mxx._m; x++) {
    const v = mm[x][j];
    mm[x][j] = mm[x][i];
    mm[x][i] = v;
  }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @param {number} n
 * @return {Matrix}
 */
function mxRowAdd(mxx, i, j, n) {
  n = n === 0 ? 0 : n || 1;
  const m = mxx.clone();
  const mm = m._mn;
  let x = m._n;
  while (x--) { mm[i][x] = add(mm[i][x], mul(mm[j][x], n)); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @param {number} n
 * @return {Matrix}
 */
function mxColAdd(mxx, i, j, n) {
  n = n === 0 ? 0 : n || 1;
  const m = mxx.clone();
  const mm = m._mn;
  for (let x = 0; x < m._n; x++) { mm[x][i] = add(mm[x][i], mul(mm[x][j], n)); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @param {number} n
 * @return {Matrix}
 */
function mxRowSub(mxx, i, j, n) {
  n = n === 0 ? 0 : n || 1;
  const m = mxx.clone();
  const mm = m._mn;
  let x = m._n;
  while (x--) { mm[i][x] = sub(mm[i][x], mul(mm[j][x], n)); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} i
 * @param {number} j
 * @param {number} n
 * @return {Matrix}
 */
function mxColSub(mxx, i, j, n) {
  n = n === 0 ? 0 : n || 1;
  const m = mxx.clone();
  const mm = m._mn;
  for (let x = 0; x < m._n; x++) { mm[x][i] = sub(mm[x][i], mul(mm[x][j], n)); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxRowMul(mxx, n) {
  const m = mxx.clone();
  let x = m._n;
  while (x--) { m[i][x] = mul(m[i][x], n); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxColMul(mxx, n) {
  const m = mxx.clone();
  const mm = m._mn;
  let x = m._n;
  while (x--) { mm[x][i] = mul(mm[x][i], n); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxRowDiv(mxx, n) {
  const m = mxx.clone();
  let x = m._n;
  while (x--) { m[i][x] = div(m[i][x], n); }
  return m;
}

/**
 * @param {Matrix} mxx
 * @param {number} n
 * @return {Matrix}
 */
function mxColDiv(mxx, n) {
  const m = mxx.clone();
  const mm = m._mn;
  let x = m._n;
  while (x--) { mm[x][i] = div(mm[x][i], n); }
  return m;
}

/**
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsReg(m) {
  const d = mxDet(m);
  return (d > 0 || d < 0) ? true : false;
}

/**
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsSym(m) {
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
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsDiag(m) {
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
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsE(m) {
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
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsNonZero(m) {
  const mm = m._mn;
  for (let x = 0; x < m._m; x++) {
    for (let y = 0; y < m._n; y++) {
      if (mm[x][y]) { return true; }
    }
  }
  return false;
}

/**
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsOrt(m) {
  if (m._m !== m._n) { return false; }
  return mul(m, mxT(m)).isE();
}

/**
 * @param {Matrix} m
 * @return {boolean}
 */
function mxIsToep(m) {
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
