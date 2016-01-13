import {range} from '../../src/ts/range';
import {Fibonacci as fib} from '../../src/ts/fib';

function testFib() {
    console.log(`_fib() arg [0..9]`);
    for (let n of range(10)) {
        console.log(fib._fib(n));
    }
    console.log(`fib() arg [0..9]`);
    for (let n of range(10)) {
        console.log(fib.fib(n));
    }
    console.log(`top(10)`);
    for (let f of fib.top(10)) {
        console.log(f);
    }
    console.log(`max(10)`);
    for (let f of fib.max(10)) {
        console.log(f);
    }
};

testFib();
