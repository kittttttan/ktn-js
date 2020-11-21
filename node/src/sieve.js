/**
 * $ node --expose-gc sieve.js
 * 
 * node --prof sieve.js
 * node --prof-process isolate-xxxxx-xxxx-v8.log > isolate.txt
 */

const timeit = require('./timeit');
const math = require('ktn/math');

const n = 1 << 22;
timeit.timeit(() => {
    console.log(`sieveMax(${n})`);
    const ps = math.Primality.sieveMax(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    timeit.memoryUsage();
});

try {
    global.gc();
} catch (e) {
    // console.error(e);
}

timeit.timeit(() => {
    console.log(`sieveMax_(${n})`);
    const ps = math.Primality.sieveMax_(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    timeit.memoryUsage();
});
