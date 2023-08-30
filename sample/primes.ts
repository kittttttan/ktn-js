import {timeit} from "../src/utils";
import {primes, bmrpt, pollardsRho, sieveA, pi, mersennePrimes, fermat} from "../src/math";
import {take} from "../src/utils/iter";
import primeLists from "../json/prime-static-1e7.json";

timeit(() => {
    console.log('first 10th prime numbers');
    console.log([...take(primes(), 10)]);
});
console.log();

timeit(() => {
    const n = 1e5;
    console.log(`prime numbers <= ${n}`);
    let i = 0;
    for (const p of sieveA(n)) {
        if (p !== primeLists[i]) {
            console.error(`${i} ${p} ${primeLists[i]}`);
            break;
        }
        i++;
    }

    const p = pi(n);
    console.log(`estimate: ${p}, count: ${i}`);
});
console.log();

timeit(() => {
    console.log('メルセンヌ数 Mn = 2^n - 1');
    console.log('n Mn');
    for (const [p, mp] of take(mersennePrimes(), 10)) {
        console.log(`${p} ${mp}`);
    }
});
console.log();

timeit(() => {
    console.log('フェルマー数 Fn = 2^{2^n} + 1');
    let i = 0;
    for (const f of take(fermat(), 6)) {
        if (bmrpt(f)) {
            console.log(`${i} ${f}`);
        }
        i++;
    }
});
console.log();

timeit(() => {
    console.log('ρ(ロー)法');
    const n = (1n << (1n << 6n)) + 1n;
    const max = BigInt(Number.MAX_SAFE_INTEGER) > n - 2n ?
        Number(n - 2n) : Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 3; i++) {
        const r = BigInt((Math.random() * max | 0) + 1);
        console.log(`${pollardsRho(n, r)} | ${n.toString()}`);
    }
});
