/// <reference path="../node_modules/@ktn/type/typings/iter.d.ts" />
/// <reference path="../node_modules/@ktn/type/typings/fib.d.ts" />
'use strict';

import Iter from '@ktn/iter';
import Fibonacci from '@ktn/iter/fib';

export class TestFib {
  public static fib() {
    console.log(`_fib() arg [0..9]`);
    for (let n of Iter.range(10)) {
      console.log(Fibonacci._fib(n));
    }
    console.log(`fib() arg [0..9]`);
    for (let n of Iter.range(10)) {
      console.log(Fibonacci.fib(n));
    }
    console.log(`top(10)`);
    for (let f of Fibonacci.top(10)) {
      console.log(f);
    }
    console.log(`max(10)`);
    for (let f of Fibonacci.max(10)) {
      console.log(f);
    }
  }
}

TestFib.fib();
