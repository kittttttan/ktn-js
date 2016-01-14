/**
 * Trigonometric function
 */

/**
 * Sin
 * @class Sin
 */
export class Sin {
  _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString(): string {
    return `sin(${this._a})`;
  }

  calc(): number {
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
  _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString(): string {
    return `cos(${this._a})`;
  }

  calc(): number {
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
  _a;
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString(): string {
    return `tan(${this._a})`;
  }

  calc(): number {
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
  static sin(a): Sin {
    return new Sin(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Cos}
   */
  static cos(a): Cos {
    return new Cos(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Tan}
   */
  static tan(a): Tan {
    return new Tan(a);
  }
}
