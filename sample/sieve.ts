/**
 * $ node --expose-gc sieve.js
 * 
 * node --prof sieve.js
 * node --prof-process isolate-xxxxx-xxxx-v8.log > isolate.txt
 */
import {timeit} from "../src/utils";
import {Primality} from '../src/math';
// import {memoryUsage} from '../node/memory';

const n = 1 << 22;
console.log(`sieveA(${n})`);
timeit(() => {
    const ps = Primality.sieveA(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    // memoryUsage();
});

// try {
//     global.gc();
// } catch (e) {
//     console.error(e);
// }

console.log(`\nsieveE(${n})`);
timeit(() => {
    const ps = Primality.sieveE(n);
    let c = 0;
    for (const p of ps) {
        // console.log(p);
        c++;
    }
    console.log(c);
    // memoryUsage();
});

{
    console.log(`\ngenerate`);
    let c = 0;
    timeit(() => {
        for (const p of Primality.generate()) {
            if (p > n) {
                break;
            }
            c++;
        }
        console.log(c);
    });
}
