'use strict';

/**
 * @private
 * @requires Stopwatch
 */
import Stopwatch from './stopwatch';

/**
 * Result
 * @class Result
 * @property {Array<int>} Result#_r
 */
export class Result {
  protected _r: int[];

  /**
   * @type {Array<int>}
   */
  get records(): int[] {
    return this._r;
  }

  constructor() {
    this._r = [];
  }

  /**
   * @method Result#add
   * @param {int}
   * @return {Result}
   */
  public add(t: int): Result {
    this._r.push(t);
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
  protected _name: string;
  protected _func: () => any;
  protected _result: Result;

  /**
   * @type {string}
   */
  get name(): string {
    return this._name;
  }

  /**
   * @type {function}
   */
  get func(): () => any {
    return this._func;
  }

  /**
   * @type {Result}
   */
  get result(): Result {
    return this._result;
  }

  set result(result: Result) {
    this._result = result;
  }

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
 * @property {int} BenchMark#_loop
 * @property {int} BenchMark#_intime
 */
export default class BenchMark {
  protected _items: Unit[];
  protected _loop: int;
  protected _intime: int;

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
   * @method BenchMark.bm
   * @return {BenchMark}
   */
  public static bm(): BenchMark {
    return new BenchMark();
  }

  /**
   * @method BenchMark#add
   * @param {string} s
   * @param {function} f
   * @return {BenchMark}
   */
  public add(s: string, f: () => any): BenchMark {
    this._items.push(new Unit(s, f));
    return this;
  }

  /**
   * @method BenchMark#addItem
   * @param {Unit} u
   * @return {BenchMark}
   */
  public addItem(u: Unit): BenchMark {
    this._items.push(u);
    return this;
  }

  /**
   * @method BenchMark#run
   * @param {boolean?} quiet
   */
  public run(quiet?: boolean): void {
    const sw: Stopwatch = Stopwatch.sw();
    const isLoop: boolean = this._loop > 0;
    for (const u of this._items) {
      if (!quiet) { console.log(`${u.name} is running ...`); }
      const r: Result = new Result();
      if (isLoop) {
        for (let i: int = 0; i < this._loop; ++i) {
          sw.restart();
          u.func();
          sw.stop();
          r.add(sw.elapsed);
        }
      } else {
        const t0: int = Date.now();
        while (Date.now() - t0 < this._intime) {
          sw.restart();
          u.func();
          sw.stop();
          r.add(sw.elapsed);
        }
      }
      u.result = r;
    }
    if (!quiet) { this.show(); }
  }

  /**
   * @method BenchMark#show
   */
  public show(): void {
    for (const u of this._items) {
      console.log(`${u.name}`);
      for (const record of u.result.records) {
        console.log(`  ${record} ms`);
      }
    }
  }
}
