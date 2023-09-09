import { primes } from '../src/math/primality.ts';
import { args } from '../src/utils/args.ts'

const argv = args();
const n = parseInt(argv[0] ?? (1 << 20));
console.log(`${n}th primes`);

let c = 0;
for (const p of primes()) {
    if (p > n) {
        break;
    }
    c = p;
}
console.log(c);
