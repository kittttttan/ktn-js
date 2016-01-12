/**
 * Constant
 */

/**
 * Const
 * @class Const
 */
export class Const {
  /**
   * @static
   * @return {?}
   */
  static get PI() {
    return {
      toString: () => 'pi',
      calc: () => Math.PI
    };
  }

  /**
   * @static
   * @return {?}
   */
  static get E() {
    return {
      toString: () => 'e',
      calc: () => Math.E
    };
  }
}
