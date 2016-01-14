/**
 * Stopwatch
 * @class Stopwatch
 * @property {number} Stopwatch#_t0 when start
 * @property {number} Stopwatch#_ts Timespan
 * @property {number} Stopwatch#isRun true means running
 */
export class Stopwatch {
  _t0: number;
  _ts: number;
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
  static sw(): Stopwatch {
    return new Stopwatch();
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
