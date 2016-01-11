/**
 * ArrayUtil
 * @class ArrayUtil
 */
export class ArrayUtil {
  /**
   * @method ArrayUtil.sum
   * @param {!Array<number>} a
   * @return {!number}
   */
  static sum(a) {
    let s = 0;
    for (const ai of a) {
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
    let s = 0;
    const l = a.length;
    for (const v of a) {
      s += v;
    }
    return s / parseFloat(l);
  }

  /**
   * @method ArrayUtil.unique
   * @param {!Array<?>} a
   * @return {!Array<?>}
   */
  static unique(a) {
    const b = [];
    for (const v of a) {
      if (!b.includes(v)) { b.push(v); }
    }
    return b;
  }

  /**
   * @method ArrayUtil.range
   * @param {number} start
   * @param {number=} optLast
   * @param {number=} optStep
   * @return {!Array<number>}
   */
  static range(start, optLast, optStep) {
    const a = [];
    if (arguments.length === 1) {
      optLast = start;
      start = 0;
    }
    if (start > optLast) {
      if (optStep > 0) { return a; }
      if (!optStep) { optStep = -1; }
      for (let i = start; i > optLast; i += optStep) {
        a.push(i);
      }
    } else {
      if (optStep < 0) { return a; }
      if (!optStep) { optStep = 1; }
      for (let i = start; i < optLast; i += optStep) {
        a.push(i);
      }
    }

    return a;
  }
}
