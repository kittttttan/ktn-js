/**
 * @private
 * @requires Stopwatch
 */
import {Stopwatch} from './stopwatch';

/**
 * Result
 * @class Result
 * @property {Array<number>} Result#_t
 */
export class Result {
  _t: number[];

  constructor() {
    this._t = [];
  }

  /**
   * @param {number}
   * @return {Result}
   */
  add(t: number) {
    this._t.push(t);
    return this;
  }
}

/**
 * BenchMark
 * @class BenchMark
 * @property {string} Unit#_name
 * @property {function} Unit#_func
 * @property {Result} Unit#_result
 */
export class Unit {
  _name: string;
  _func: () => any;
  _result: Result;

  /**
   * @param {string} name
   * @param {function} func
   */
  constructor(name: string, func: () => any) {
    this._name = name;
    this._func = func;
    this._result = new Result();
  }
}

/**
 * BenchMark
 * @class BenchMark
 * @property {Array<Unit>} BenchMark#_items
 * @property {Array<Unit>} BenchMark#_loop
 * @property {Array<Unit>} BenchMark#_intime
 */
export class BenchMark {
  _items: Unit[];
  _loop: number;
  _intime: number;

  /**
   * @param {?} opt
   */
  constructor(opt?: {loop?: number, intime?: number}) {
    opt = opt || {};

    this._items = [];

    if (opt.loop) {
      this._loop = opt.loop | 0;
      if (this._loop < 1) {
        throw new Error(`invalid loop: ${this._loop}`);
      }
      return;
    }

    if (opt.intime) {
      this._intime = opt.intime | 0;
      if (this._intime < 1) {
        throw new Error(`invalid intime: ${this._intime}`);
      }
      return;
    }

    this._loop = 3;
  }

  /**
   * @return {BenchMark}
   */
  static bm(): BenchMark {
    return new BenchMark();
  }

  /**
   * @param {string} s
   * @param {function} f
   * @return {BenchMark}
   */
  add(s: string, f): BenchMark {
    this._items.push(new Unit(s, f));
    return this;
  }

  /**
   * @param {Unit} u
   * @return {BenchMark}
   */
  addItem(u: Unit): BenchMark {
    this._items.push(u);
    return this;
  }

  /**
   * @param {boolean?} quiet
   */
  run(quiet?: boolean): void {
    const sw: Stopwatch = Stopwatch.sw();
    const isLoop: boolean = this._loop > 0;
    for (const u of this._items) {
      if (!quiet) { console.log(`${u._name} is running ...`); }
      const r: Result = new Result();
      if (isLoop) {
        for (let i = 0; i < this._loop; ++i) {
          sw.restart();
          u._func();
          sw.stop();
          r.add(sw.elapsed);
        }
      } else {
        const t0 = Date.now();
        while (Date.now() - t0 < this._intime) {
          sw.restart();
          u._func();
          sw.stop();
          r.add(sw.elapsed);
        }
      }
      u._result = r;
    }
    if (!quiet) { this.show(); }
  }

  /**
   * 
   */
  show(): void {
    for (const u of this._items) {
      console.log(`${u._name}`);
      for (const t of u._result._t) {
        console.log(`  ${t} ms`);
      }
    }
  }
}
