import { sieveA } from '../src/math/primality.ts';
import { args } from '../src/utils/args.ts'

const argv = args();
const n = parseInt(argv[0] ?? (1 << 20));
console.log(`primes below ${n}`);

let c = 0;
for (const p of sieveA(n)) {
    c = p;
}
console.log(c);
