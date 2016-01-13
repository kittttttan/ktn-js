/**
 * Stopwatch
 * @class Stopwatch
 */
export class Stopwatch {
  /**
   * @return {Stopwatch}
   */
  static sw(): Stopwatch {
    return new Stopwatch();
  }

  /**
   * when start
   * @property {number} Stopwatch#_t0
   */
  _t0: number;

  /**
   * Timespan
   * @property {number} Stopwatch#_ts
   */
  _ts: number;

  /**
   * true means running
   * @property {number} Stopwatch#isRun
   */
  _isRun: boolean;

  /**
   * @return {number}
   */
  get elapsed(): number {
    return this._ts;
  }

  constructor() {
    this._ts = 0;
    this._isRun = false;
  }

  /**
   * @return {Stopwatch}
   */
  start(): Stopwatch {
    this._t0 = Date.now();
    this._isRun = true;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  restart(): Stopwatch {
    this._t0 = Date.now();
    this._ts = 0;
    this._isRun = true;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  stop(): Stopwatch {
    this._ts += Date.now() - this._t0;
    this._isRun = false;
    return this;
  }

  /**
   * @return {Stopwatch}
   */
  reset(): Stopwatch {
    this._ts = 0;
    this._t0 = Date.now();
    return this;
  }
}
