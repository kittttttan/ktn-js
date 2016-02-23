'use strict';

import Iter from '../../src/ts/iter';
import Fibonacci from '../../src/ts/fib';

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
