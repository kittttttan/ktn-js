/**
 * Constant
 */
'use strict';

/**
 * @typedef {Object} ConstItem
 */
export interface ConstItem {
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
   * @type {ConstItem}
   */
  static get PI(): ConstItem {
    return {
      calc: (): number => Math.PI,
      toString: (): string => 'pi',
    };
  }

  /**
   * @static
   * @type {ConstItem}
   */
  static get E(): ConstItem {
    return {
      calc: (): number => Math.E,
      toString: (): string => 'e',
    };
  }
}
