/**
 * Trigonometric function
 */

/**
 * Sin
 * @class Sin
 */
export class Sin {
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString() {
    return `sin(${this._a})`;
  }

  calc() {
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
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString() {
    return `cos(${this._a})`;
  }

  calc() {
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
  /**
   * @property {?} _a
   * @param {?} a
   */
  constructor(a) {
    this._a = a;
  }

  toString() {
    return `tan(${this._a})`;
  }

  calc() {
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
  static sin(a) {
    return new Sin(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Cos}
   */
  static cos(a) {
    return new Cos(a);
  }

  /**
   * @static
   * @param {?} a
   * @return {Tan}
   */
  static tan(a) {
    return new Tan(a);
  }
}
