'use strict';

// string
let key: string = 'repeat';
if (!''[key]) {
  String.prototype[key] = function(count: number): string {
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

key = 'includes';
if (!''[key]) {
  String.prototype[key] = function(searchString: string, position: number = 0): boolean {
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}

// array
key = 'includes';
if (![][key]) {
  Array.prototype[key] = function(searchElement: any, fromIndex: number = 0): boolean {
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
