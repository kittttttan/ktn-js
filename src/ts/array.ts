/// <reference path="typings/polyfill.d.ts"/>
import './polyfill';

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
  static sum(a: number[]): number {
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
  static average(a: number[]): number {
    let s = 0;
    const l = a.length;
    for (const v of a) {
      s += v;
    }
    return 1.0 * s / l;
  }

  /**
   * @method ArrayUtil.unique
   * @param {!Array<?>} a
   * @return {!Array<?>}
   */
  static unique(a: any): any[] {
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
  static range(start: number, optLast?: number, optStep?: number): number[] {
    const a: number[] = [];
    if (arguments.length === 1) {
      optLast = start;
      start = 0;
    }
    if (start > optLast) {
      if (optStep > 0) { return a; }
      if (!optStep) { optStep = -1; }
      for (let i: number = start; i > optLast; i += optStep) {
        a.push(i);
      }
    } else {
      if (optStep < 0) { return a; }
      if (!optStep) { optStep = 1; }
      for (let i: number = start; i < optLast; i += optStep) {
        a.push(i);
      }
    }

    return a;
  }
}
