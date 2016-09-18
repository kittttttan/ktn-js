'use strict';

import Iter from 'ktn-js/ts/iter';
import Primality from 'ktn-js/ts/primality';

function test() {
  const n: number = 10;
  console.log(`primeTop(${n})`);
  for (let p of Primality.top(n)) {
    console.log(p);
  }
  console.log(`primeMax(${n})`);
  for (let p of Primality.max(n)) {
    console.log(p);
  }
  console.log(`sieveMax(${n})`);
  for (let p of Primality.sieveMax(n)) {
    console.log(p);
  }
  console.log(`mrpt() arg [0..${2*n-1}]`);
  for (let i of Iter.range(2*n)) {
    if (Primality.mrpt(i)) {
      console.log(i);
    }
  }
}

function testSieve() {
  const n: number = 10000;
  console.log(`primeMax(${n})`);
  const t0: number = Date.now();
  let a = [];
  for (let p of Primality.max(n)) {
    a.push(p);
  }
  const t1: number = Date.now();
  console.log(`${t1 - t0}ms`);

  console.log(`sieveMax(${n})`);
  let b: number[] = [];
  for (let p of Primality.sieveMax(n)) {
    b.push(p);
  }
  const t2: number = Date.now();
  console.log(`${t2 - t1}ms`);

  const al: number = a.length;
  console.log(`al = ${al}`);
  if (al !== b.length) {
    console.log(`a !== b`);
    return;
  }
  for (let i: number = 0; i < al; ++i) {
    if (a[i] !== b[i]) {
      console.log(`a !== b: a[i]=${a[i]}, b[i]=${b[i]}`);
    }
  }
}

test();
testSieve();
