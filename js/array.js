/**
 * ArrayUtil
 * @class ArrayUtil
 */
var ArrayUtil = {
  /**
   * @method ArrayUtil.isArray
   * @param {Object} o
   * @return {boolean}
   */
  isArray: function(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  },

  /**
   * @method ArrayUtil.some
   * @param {Array} a
   * @param {function} f
   * @return {boolean}
   */
  some: function(a, f) {
    var i = a.length;
    while (i) {
      if (f(a[--i])) {
        return true;
      }
    }
    return false;
  },

  /**
   * @method ArrayUtil.every
   * @param {Array} a
   * @param {function} f
   * @return {boolean}
   */
  every: function(a, f) {
    var i = a.length;
    while (i) {
      if (!f(a[--i])) {
        return false;
      }
    }
    return true;
  },

  /**
   * @method ArrayUtil.filter
   * @param {Array} a
   * @param {function} f
   * @return {function}
   */
  filter: function(a, f) {
    var aNew = [];
    for (var i = 0, l = a.length; i < l; ++i) {
      if (f(aNew[i])) {
        aNew.push(a[i]);
      }
    }
    return aNew;
  },

  /**
   * @method ArrayUtil.forEach
   * @param {Array} a
   * @param {function} f
   */
  forEach: function(a, f) {
    for (var i = 0, l = a.length; i < l; ++i) {
      f(a[i]);
    }
  },

  /**
   * @method ArrayUtil.map
   * @param {Array} a
   * @param {function} f
   * @return {Array}
   */
  map: function(a, f) {
    var n = [], i = a.length;
    while (--i) {
      n[i] = f(a[i]);
    }
    return n;
  },

  /**
   * @method ArrayUtil.reduce
   * @param {Array} a
   * @param {function} f
   * @return {Array}
   */
  reduce: function(a, f) {
    var out = a[0];
    for (var i = 1, l = a.length; i < l; ++i) {
      out = f(out, a[i]);
    }
    return out;
  },

  /**
   * @method ArrayUtil.reduceRight
   * @param {Array} a
   * @param {function} f
   * @return {Array}
   */
  reduceRight: function(a, f) {
    var i = a.length - 1, out = a[i];
    while (i) {
      out = f(out, a[--i]);
    }
    return out;
  },

  /**
   * @method ArrayUtil.sum
   * @param {Array.<number>} a
   * @return {number}
   */
  sum: function(a) {
    var s = 0;
    for (var i = 0, l = a.length; i < l; ++i) {
      s += a[i];
    }
    return s;
  },

  /**
   * @method ArrayUtil.average
   * @param {Array.<number>} a
   * @return {number}
   */
  average: function(a) {
    var s = 0, l = a.length;
    for (var i = 0; i < l; ++i) {
      s += a[i];
    }
    return s / parseFloat(l);
  },

  /**
   * @method ArrayUtil.unique
   * @param {Array} a
   * @return {Array}
   */
  unique: function(a) {
    var b = [];
    for (var i = 0, l = a.length; i < l; ++i) {
      if (b.indexOf(a[i]) < 0) { b.push(a[i]); }
    }
    return b;
  },

  /**
   * @method ArrayUtil.range
   * @param {number} start
   * @param {number} opt_last
   * @param {number} opt_step
   */
  range: function(start, opt_last, opt_step) {
    var a = [], i;
    if (arguments.length === 1) {
      opt_last = start;
      start = 0;
    }
    if (start > opt_last) {
      if (opt_step > 0) { return a; }
      if (!opt_step) { opt_step = -1; }
      for (i = start; i > opt_last; i += opt_step) {
        a.push(i);
      }
    } else {
      if (opt_step < 0) { return a; }
      if (!opt_step) { opt_step = 1; }
      for (i = start; i < opt_last; i += opt_step) {
        a.push(i);
      }
    }
    
    return a;
  }
};

// exports
exports.ArrayUtil = ArrayUtil;
