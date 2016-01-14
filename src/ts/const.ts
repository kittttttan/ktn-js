/**
 * Constant
 */

interface ConstItem {
  toString: () => string;
  calc: () => number;
}

/**
 * Const
 * @class Const
 */
export class Const {
  /**
   * @static
   * @return {?}
   */
  static get PI(): ConstItem {
    return {
      toString: (): string => 'pi',
      calc: (): number => Math.PI
    };
  }

  /**
   * @static
   * @return {?}
   */
  static get E(): ConstItem {
    return {
      toString: (): string => 'e',
      calc: (): number => Math.E
    };
  }
}
