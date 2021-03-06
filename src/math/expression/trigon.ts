/**
 * Trigonometric function
 */
'use strict';

/**
 * Sin
 * @class Sin
 */
export class Sin {
  protected _a: any;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a: any) {
    this._a = a;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return `sin(${this._a})`;
  }

  /**
   * @return {number}
   */
  public calc(): number {
    let v = 0;
    const a: any = this._a;
    if (typeof (a.calc) === 'function') {
      v = a.calc();
    } else {
      v = parseFloat(a);
    }
    return Math.sin(v);
  }
}

/**
 * Cos
 * @class Cos
 */
export class Cos {
  protected _a: any;
  /**
   * @property {any} _a
   * @param {any} a
   */
  constructor(a: any) {
    this._a = a;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return `cos(${this._a})`;
  }

  /**
   * @return {number}
   */
  public calc(): number {
    let v = 0;
    const a: any = this._a;
    if (typeof (a.calc) === 'function') {
      v = a.calc();
    } else {
      v = parseFloat(a);
    }
    return Math.cos(v);
  }
}

/**
 * Tan
 * @class Tan
 */
export class Tan {
  protected _a: any;
  /**
   * @property {any} _a
   * @param {any} a
   */
  constructor(a: any) {
    this._a = a;
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return `tan(${this._a})`;
  }

  /**
   * @return {number}
   */
  public calc(): number {
    let v = 0;
    const a: any = this._a;
    if (typeof (a.calc) === 'function') {
      v = a.calc();
    } else {
      v = parseFloat(a);
    }
    return Math.tan(v);
  }
}

/**
 * Trigon
 * @class Trigon
 */
export class Trigon {
  /**
   * @static
   * @param {any} a
   * @return {Sin}
   */
  public static sin(a: any): Sin {
    return new Sin(a);
  }

  /**
   * @static
   * @param {any} a
   * @return {Cos}
   */
  public static cos(a: any): Cos {
    return new Cos(a);
  }

  /**
   * @static
   * @param {any} a
   * @return {Tan}
   */
  public static tan(a: any): Tan {
    return new Tan(a);
  }
}
