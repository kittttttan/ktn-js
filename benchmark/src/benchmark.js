'use strict';
/**
 * @private
 * @requires Stopwatch
 */
var stopwatch_1 = require('./stopwatch');
/**
 * Result
 * @class Result
 * @property {Array<int>} Result#_r
 */
var Result = (function () {
    function Result() {
        this._r = [];
    }
    Object.defineProperty(Result.prototype, "records", {
        /**
         * @type {Array<int>}
         */
        get: function () {
            return this._r;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @method Result#add
     * @param {int}
     * @return {Result}
     */
    Result.prototype.add = function (t) {
        this._r.push(t);
        return this;
    };
    return Result;
}());
exports.Result = Result;
/**
 * BenchMark
 * @class BenchMark
 * @property {string} Unit#_name
 * @property {function} Unit#_func
 * @property {Result} Unit#_result
 */
var Unit = (function () {
    /**
     * @param {string} name
     * @param {function} func
     */
    function Unit(name, func) {
        this._name = name;
        this._func = func;
        this._result = new Result();
    }
    Object.defineProperty(Unit.prototype, "name", {
        /**
         * @type {string}
         */
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Unit.prototype, "func", {
        /**
         * @type {function}
         */
        get: function () {
            return this._func;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Unit.prototype, "result", {
        /**
         * @type {Result}
         */
        get: function () {
            return this._result;
        },
        set: function (result) {
            this._result = result;
        },
        enumerable: true,
        configurable: true
    });
    return Unit;
}());
exports.Unit = Unit;
/**
 * BenchMark
 * @class BenchMark
 * @property {Array<Unit>} BenchMark#_items
 * @property {int} BenchMark#_loop
 * @property {int} BenchMark#_intime
 */
var BenchMark = (function () {
    /**
     * @param {?} opt
     */
    function BenchMark(opt) {
        opt = opt || {};
        this._items = [];
        if (opt.loop) {
            this._loop = opt.loop | 0;
            if (this._loop < 1) {
                throw new Error("invalid loop: " + this._loop);
            }
            return;
        }
        if (opt.intime) {
            this._intime = opt.intime | 0;
            if (this._intime < 1) {
                throw new Error("invalid intime: " + this._intime);
            }
            return;
        }
        this._loop = 3;
    }
    /**
     * @method BenchMark.bm
     * @return {BenchMark}
     */
    BenchMark.bm = function () {
        return new BenchMark();
    };
    /**
     * @method BenchMark#add
     * @param {string} s
     * @param {function} f
     * @return {BenchMark}
     */
    BenchMark.prototype.add = function (s, f) {
        this._items.push(new Unit(s, f));
        return this;
    };
    /**
     * @method BenchMark#addItem
     * @param {Unit} u
     * @return {BenchMark}
     */
    BenchMark.prototype.addItem = function (u) {
        this._items.push(u);
        return this;
    };
    /**
     * @method BenchMark#run
     * @param {boolean?} quiet
     */
    BenchMark.prototype.run = function (quiet) {
        var sw = stopwatch_1.default.sw();
        var isLoop = this._loop > 0;
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var u = _a[_i];
            if (!quiet) {
                console.log(u.name + " is running ...");
            }
            var r = new Result();
            if (isLoop) {
                for (var i = 0; i < this._loop; ++i) {
                    sw.restart();
                    u.func();
                    sw.stop();
                    r.add(sw.elapsed);
                }
            }
            else {
                var t0 = Date.now();
                while (Date.now() - t0 < this._intime) {
                    sw.restart();
                    u.func();
                    sw.stop();
                    r.add(sw.elapsed);
                }
            }
            u.result = r;
        }
        if (!quiet) {
            this.show();
        }
    };
    /**
     * @method BenchMark#show
     */
    BenchMark.prototype.show = function () {
        for (var _i = 0, _a = this._items; _i < _a.length; _i++) {
            var u = _a[_i];
            console.log("" + u.name);
            for (var _b = 0, _c = u.result.records; _b < _c.length; _b++) {
                var record = _c[_b];
                console.log("  " + record + " ms");
            }
        }
    };
    return BenchMark;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BenchMark;
//# sourceMappingURL=benchmark.js.map