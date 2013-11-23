(function(exports){
'use strict';

/**
 * @param {boolean} b
 * @param {string} s
 */
var assert;
if (typeof console !== 'undefined' && typeof console.assert !== 'undefined') {
  assert = function(b, s) {
    console.assert(b, s);
  };
} else {
  assert = function(b, s) {
    if (!b) {
      var err = new Error(s);
      err.name = 'AssertionFailed';
      throw err;
    }
  };
}

/**
 * Count function called time in a while
 * @param {function} f
 * @param {number=} [opt_ms=1000] Interval
 * @return {number} loops/sec
 */
function bench(f, opt_ms) {
  var b = Date.now(),
      i = 0;
  if (!opt_ms) { opt_ms = 1000; }
  for (; Date.now() - b < opt_ms; ++i) {
    f();
  }
  return i * 1000 / opt_ms;
}

/**
 * 
 * @param {function} f
 * @param {number=} [opt_ms=10000] times
 * @return {number} loops
 */
function timeit(f, opt_times) {
  var t = Date.now(),
      i = 0;
  if (!opt_times) { opt_times = 10000; }
  for (; i < opt_times; ++i) {
    f();
  }
  return Date.now() - t;
}

var Util = {
  assert: assert,
  bench: bench,
  timeit: timeit
};

// exports
exports.Util = Util;

}(typeof exports !== 'undefined' ? exports : this));
