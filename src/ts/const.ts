/**
 * Constant
 */
'use strict';

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
      calc: (): number => Math.PI,
      toString: (): string => 'pi',
    };
  }

  /**
   * @static
   * @return {?}
   */
  static get E(): ConstItem {
    return {
      calc: (): number => Math.E,
      toString: (): string => 'e',
    };
  }
}
