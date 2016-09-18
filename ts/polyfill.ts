/// <reference path="typings/polyfill.d.ts"/>
'use strict';

// string
if (!''.repeat) {
  String.prototype.repeat = function(count: number): string {
    count = count | 0;
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }

    let [res, s]: string[] = ['', this];
    for (; count > 0; count >>= 1, s += s) {
      if (count & 1) {
        res += s;
      }
    }

    return res;
  };
}

if (!''.includes) {
  String.prototype.includes = function(searchString: string, position: number = 0): boolean {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

// array
if (![].includes) {
  Array.prototype.includes = function(searchElement: any, fromIndex: number = 0): boolean {
    const arr: any[] = this;
    const len: number = arr.length;
    if (len === 0) {
      return false;
    }
    let n: number = fromIndex;
    if (fromIndex < 0) {
      n = len + fromIndex;
      if (n < 0) {
        n = 0;
      }
    }
    for (; n < len; ++n) {
      const e: any = arr[n];
      if (e === searchElement
          // for NaN
          // || e !== e && searchElement !== searchElement
          ) {
        return true;
      }
    }
    return false;
  };
}
