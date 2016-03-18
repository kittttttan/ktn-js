/// <reference path="typings/ktn.d.ts"/>
/**
 * Constant
 */
'use strict';

/**
 * @typedef {Object} ConstItem
 */
interface ConstItem {
  toString: () => string;
  calc: () => number;
}

/**
 * Const
 * @class Const
 */
export default class Const {
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
