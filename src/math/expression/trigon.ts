/**
 * Trigonometric function
 */

/**
 * Sin
 */
export class Sin {
  protected _a: any;

  constructor(a: any) {
    this._a = a;
  }

  public toString(): string {
    return `sin(${this._a})`;
  }

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
 */
export class Cos {
  protected _a: any;

  constructor(a: any) {
    this._a = a;
  }

  public toString(): string {
    return `cos(${this._a})`;
  }

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
 */
export class Tan {
  protected _a: any;

  constructor(a: any) {
    this._a = a;
  }

  public toString(): string {
    return `tan(${this._a})`;
  }

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
 */
export class Trigon {
  public static sin(a: any): Sin {
    return new Sin(a);
  }

  public static cos(a: any): Cos {
    return new Cos(a);
  }

  public static tan(a: any): Tan {
    return new Tan(a);
  }
}
