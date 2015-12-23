'use strict';

const range = require('./range').range;
const prim = require('./primality');

let test = () => {
  const n = 10;
  console.log(`primeTop(${n})`);
  for (let p of prim.primeTop(n)) {
    console.log(p);
  }
  console.log(`primeMax(${n})`);
  for (let p of prim.primeMax(n)) {
    console.log(p);
  }
  console.log(`sieveMax(${n})`);
  for (let p of prim.sieveMax(n)) {
    console.log(p);
  }
  console.log(`mrpt() arg [0..${2*n-1}]`);
  for (let i of range(2*n)) {
    if (prim.mrpt(i)) {
      console.log(i);
    }
  }
}

let testSieve = () => {
  const n = 10000;
  console.log(`primeMax(${n})`);
  const t0 = Date.now();
  let a = [];
  for (let p of prim.primeMax(n)) {
    a.push(p);
  }
  const t1 = Date.now();
  console.log(`${t1 - t0}ms`);

  console.log(`sieveMax(${n})`);
  let b = [];
  for (let p of prim.sieveMax(n)) {
    b.push(p);
  }
  const t2 = Date.now();
  console.log(`${t2 - t1}ms`);

  let al = a.length;
  console.log(`al = ${al}`);
  if (al !== b.length) {
    console.log(`a !== b`);
    return;
  }
  for (let i = 0; i < al; ++i) {
    if (a[i] !== b[i]) {
      console.log(`a !== b: a[i]=${a[i]}, b[i]=${b[i]}`);
    }
  }
}

test();
testSieve();
