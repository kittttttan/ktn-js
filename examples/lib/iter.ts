'use strict';

import Iter from 'ktn-js/ts/iter';

const range = Iter.range;
const zip = Iter.zip;

export default class TestIter {
  public static main(): string {
    return `
range
${this.range()}

zip
${this.zip()}
`;
  }

  public static range(): string {
    let res = '';

    console.log('range(3)');
    for (let n of range(3)) {
      console.log(n);
    }
    console.log('range(1, 3)');
    for (let n of range(1, 3)) {
      console.log(n);
    }
    console.log('range(1, 10, 3)');
    for (let n of range(1, 10, 3)) {
      console.log(n);
    }
    console.log('range(10, 0, -2)');
    for (let n of range(10, 0, -2)) {
      console.log(n);
    }
    console.log('range(-1)');
    for (let n of range(-1)) {
      console.log(n);
    }
    console.log('range(1, 0)');
    for (let n of range(1, 0)) {
      console.log(n);
    }
    console.log('range(1, 2, -1)');
    for (let n of range(1, 2, -1)) {
      console.log(n);
    }

    return res;
  }

  public static zip(): string {
    let res: string = '';

    console.log('zip()');
    for (let n of zip()) {
      console.log(n);
    }
    console.log('zip([1, 2])');
    for (let n of zip([1, 2])) {
      console.log(n);
    }
    console.log('zip([1, 2], "abc")');
    for (let n of zip([1, 2], "abc")) {
      console.log(n);
    }
    console.log('zip("ABC", "abc")');
    for (let [a, b] of zip("ABC", "abc")) {
      console.log(a, b);
    }

    return res;
  }
}
