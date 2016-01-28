/**
 * Trigonometric function
 */
'use strict';

/**
 * Sin
 * @class Sin
 */
export class Sin {
  protected _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  public toString(): string {
    return `sin(${this._a})`;
  }

  public calc(): number {
    let v = 0;
    const a = this._a;
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
  protected _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  public toString(): string {
    return `cos(${this._a})`;
  }

  public calc(): number {
    let v = 0;
    const a = this._a;
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
  protected _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  public toString(): string {
    return `tan(${this._a})`;
  }

  public calc(): number {
    let v = 0;
    const a = this._a;
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
   * @param {?} a
   * @return {Sin}
   */
  public static sin(a): Sin {
    return new Sin(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Cos}
   */
  public static cos(a): Cos {
    return new Cos(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Tan}
   */
  public static tan(a): Tan {
    return new Tan(a);
  }
}
