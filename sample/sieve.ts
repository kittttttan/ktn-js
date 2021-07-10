/**
 * $ node --expose-gc sieve.js
 * 
 * node --prof sieve.js
 * node --prof-process isolate-xxxxx-xxxx-v8.log > isolate.txt
 */
import {timeit} from "../src/utils";
import {memoryUsage} from '../node/memory';
import {Primality} from '../src/math';

const n = 1 << 22;
timeit(() => {
    console.log(`sieveMax(${n})`);
    const ps = Primality.sieveMax(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    memoryUsage();
});

try {
    global.gc();
} catch (e) {
    // console.error(e);
}

timeit(() => {
    console.log(`sieveMax_(${n})`);
    const ps = Primality.sieveMax_(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    memoryUsage();
});
