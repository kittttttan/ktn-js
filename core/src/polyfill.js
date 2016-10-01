'use strict';
// string
var key = 'repeat';
if (!''[key]) {
    String.prototype[key] = function (count) {
        count = count | 0;
        if (count < 0) {
            throw new RangeError('repeat count must be non-negative');
        }
        var _a = ['', this], res = _a[0], s = _a[1];
        for (; count > 0; count >>= 1, s += s) {
            if (count & 1) {
                res += s;
            }
        }
        return res;
    };
}
key = 'includes';
if (!''[key]) {
    String.prototype[key] = function (searchString, position) {
        if (position === void 0) { position = 0; }
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}
// array
key = 'includes';
if (![][key]) {
    Array.prototype[key] = function (searchElement, fromIndex) {
        if (fromIndex === void 0) { fromIndex = 0; }
        var arr = this;
        var len = arr.length;
        if (len === 0) {
            return false;
        }
        var n = fromIndex;
        if (fromIndex < 0) {
            n = len + fromIndex;
            if (n < 0) {
                n = 0;
            }
        }
        for (; n < len; ++n) {
            var e = arr[n];
            if (e === searchElement) {
                return true;
            }
        }
        return false;
    };
}
//# sourceMappingURL=polyfill.js.map