'use strict';

const range = require('./range').range;
const fib = require('./fib');

let testFib = () => {
    console.log(`_fib() arg [0..9]`);
    for (let n of range(10)) {
        console.log(fib._fib(n));
    }
    console.log(`fib() arg [0..9]`);
    for (let n of range(10)) {
        console.log(fib.fib(n));
    }
    console.log(`fibTop(10)`);
    for (let f of fib.fibTop(10)) {
        console.log(f);
    }
    console.log(`fibMax(10)`);
    for (let f of fib.fibMax(10)) {
        console.log(f);
    }
}

let testFib2 = () => {
    const cnt = 50;
    for (let n of range(cnt)) {
        let a = fib._fib(n);
        let b = fib._fib2(n);
        if (a !== b) {
            console.log(`diff ${n}: ${a} ${b}`);
        }
    }
    console.log(`_fib() arg [0..${cnt - 1}]`);
    const t0 = Date.now();
    for (let n of range(cnt)) {
        //console.log(fib._fib(n));
        fib._fib(n);
    }
    const t1 = Date.now();
    console.log(`${t1 - t0}ms`);

    console.log(`_fib2() arg [0..${cnt - 1}]`);
    for (let n of range(cnt)) {
        //console.log(fib._fib2(n));
        fib._fib2(n);
    }
    const t2 = Date.now();
    console.log(`${t2 - t1}ms`);
}

testFib();
testFib2();
