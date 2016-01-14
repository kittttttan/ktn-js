// string
if (!''.repeat) {
  String.prototype.repeat = function(count: number): string {
    count = count | 0;
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }

    let [res, s] = ['', this];
    for (; count > 0; count >>= 1, s += s) {
      if (count & 1) {
        res += s;
      }
    }

    return res;
  };
}

// array
if (![].includes) {
  Array.prototype.includes = function(searchElement: any, fromIndex: number = 0): boolean {
    const arr = this;
    const len = arr.length;
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
      const e = arr[n];
      if (e === searchElement
          // NaN
          //|| e !== e && searchElement !== searchElement
          ) {
        return true;
      }
    }
    return false;
  };
}