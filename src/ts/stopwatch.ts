/**
 * Stopwatch
 * @class Stopwatch
 * @property {int} Stopwatch#_t0 when start
 * @property {int} Stopwatch#_ts Timespan
 * @property {boolean} Stopwatch#isRun true means running
 */
export class Stopwatch {
  protected _t0: int;
  protected _ts: int;
  protected _isRun: boolean;

  /**
   * @return {int}
   */
  get elapsed(): int {
    return this._ts;
  }

  constructor() {
    this._ts = 0;
    this._isRun = false;
  }

  /**
   * @return {Stopwatch}
   */
  public static sw(): Stopwatch {
    return new Stopwatch();
  }

  /**
   * @return {Stopwatch}
   */
  public start(): Stopwatch {
    this._t0 = Date.now();
    this._isRun = true;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  public restart(): Stopwatch {
    this._t0 = Date.now();
    this._ts = 0;
    this._isRun = true;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  public stop(): Stopwatch {
    this._ts += Date.now() - this._t0;
    this._isRun = false;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  public reset(): Stopwatch {
    this._ts = 0;
    this._t0 = Date.now();
    return this;
  }
}
