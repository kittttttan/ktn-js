'use strict';
require('@ktn/core');
/**
 * Stopwatch
 * @class Stopwatch
 * @property {int} Stopwatch#_t0 when start
 * @property {int} Stopwatch#_ts Timespan
 * @property {boolean} Stopwatch#isRun true means running
 */
var Stopwatch = (function () {
    function Stopwatch() {
        this._ts = 0;
        this._isRun = false;
    }
    Object.defineProperty(Stopwatch.prototype, "elapsed", {
        /**
         * @return {int}
         */
        get: function () {
            return this._ts;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {Stopwatch}
     */
    Stopwatch.sw = function () {
        return new Stopwatch();
    };
    /**
     * @return {Stopwatch}
     */
    Stopwatch.prototype.start = function () {
        this._t0 = Date.now();
        this._isRun = true;
        return this;
    };
    /**
     * @return {Stopwatch}
     */
    Stopwatch.prototype.restart = function () {
        this._t0 = Date.now();
        this._ts = 0;
        this._isRun = true;
        return this;
    };
    /**
     * @return {Stopwatch}
     */
    Stopwatch.prototype.stop = function () {
        this._ts += Date.now() - this._t0;
        this._isRun = false;
        return this;
    };
    /**
     * @return {Stopwatch}
     */
    Stopwatch.prototype.reset = function () {
        this._ts = 0;
        this._t0 = Date.now();
        return this;
    };
    return Stopwatch;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Stopwatch;
//# sourceMappingURL=stopwatch.js.map