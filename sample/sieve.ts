import {timeit} from "../src/utils";
import {sieveA, sieveE, primes} from '../src/math';

const n = 1 << 20;
let c = 0;

console.log(`sieveA(${n})`);
timeit(() => {
    for (const p of sieveA(n)) {
        c = p;
    }
    console.log(c);
});

console.log(`\nsieveE(${n})`);
timeit(() => {
    for (const p of sieveE(n)) {
        c = p;
    }
    console.log(c);
});

{
    console.log(`\ngenerate`);
    timeit(() => {
        for (const p of primes()) {
            if (p > n) {
                break;
            }
            c = p;
        }
        console.log(c);
    });
}
