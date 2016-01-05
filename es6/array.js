/**
 * ArrayUtil
 * @class ArrayUtil
 */
export class ArrayUtil {
  /**
   * @method ArrayUtil.some
   * @param {!Array<?>} a
   * @param {!function(?)} f
   * @return {!boolean}
   */
  static some(a, f) {
    var i = a.length;
    while (i) {
      if (f(a[--i])) {
        return true;
      }
    }
    return false;
  }

  /**
   * @method ArrayUtil.every
   * @param {!Array<?>} a
   * @param {!function(?)} f
   * @return {!boolean}
   */
  static every(a, f) {
    var i = a.length;
    while (i) {
      if (!f(a[--i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * @method ArrayUtil.filter
   * @param {!Array<?>} a
   * @param {!function(?)} f
   * @return {Array<?>}
   */
  static filter(a, f) {
    var aNew = [];
    for (let ai of a) {
      if (f(ai)) {
        aNew.push(ai);
      }
    }
    return aNew;
  }

  /**
   * @method ArrayUtil.forEach
   * @param {!Array<?>} a
   * @param {!function(?)} f
   */
  static forEach(a, f) {
    for (let ai of a) {
      f(ai);
    }
  }

  /**
   * @method ArrayUtil.map
   * @param {!Array<?>} a
   * @param {!function(?)} f
   * @return {!Array<?>}
   */
  static map(a, f) {
    var n = [];
    var i = a.length;
    if (i < 1) { return n; }
    while (i--) {
      n[i] = f(a[i]);
    }
    return n;
  }

  /**
   * @method ArrayUtil.reduce
   * @param {!Array<?>} a
   * @param {!function(?,?)} f
   * @return {?}
   */
  static reduce(a, f) {
    var out = a[0];
    for (var i = 1, l = a.length; i < l; ++i) {
      out = f(out, a[i]);
    }
    return out;
  }

  /**
   * @method ArrayUtil.reduceRight
   * @param {!Array<?>} a
   * @param {!function(?, ?)} f
   * @return {?}
   */
  static reduceRight(a, f) {
    var i = a.length - 1, out = a[i];
    while (i) {
      out = f(out, a[--i]);
    }
    return out;
  }

  /**
   * @method ArrayUtil.sum
   * @param {!Array<number>} a
   * @return {!number}
   */
  static sum(a) {
    var s = 0;
    for (let ai of a) {
      s += ai;
    }
    return s;
  }

  /**
   * @method ArrayUtil.average
   * @param {!Array<number>} a
   * @return {!number}
   */
  static average(a) {
    var s = 0, l = a.length;
    for (var i = 0; i < l; ++i) {
      s += a[i];
    }
    return s / parseFloat(l);
  }

  /**
   * @method ArrayUtil.unique
   * @param {!Array<?>} a
   * @return {!Array<?>}
   */
  static unique(a) {
    var b = [];
    for (var i = 0, l = a.length; i < l; ++i) {
      if (b.indexOf(a[i]) < 0) { b.push(a[i]); }
    }
    return b;
  }

  /**
   * @method ArrayUtil.range
   * @param {number} start
   * @param {number=} opt_last
   * @param {number=} opt_step
   * @return {!Array<number>}
   */
  static range(start, opt_last, opt_step) {
    var a = [], i;
    if (arguments.length === 1) {
      opt_last = start;
      start = 0;
    }
    if (start > opt_last) {
      if (opt_step > 0) { return a; }
      if (!opt_step) { opt_step = -1; }
      for (i = start; i > opt_last; i += opt_step) {
        a.push(i);
      }
    } else {
      if (opt_step < 0) { return a; }
      if (!opt_step) { opt_step = 1; }
      for (i = start; i < opt_last; i += opt_step) {
        a.push(i);
      }
    }

    return a;
  }
};
