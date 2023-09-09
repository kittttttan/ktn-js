import {divisors, isPerfect, perfects, evenPerfects} from "../src/math/perfect.ts";
import {take} from "../src/utils/iter.ts";

for (const n of [1,2,3,4,5,6,60]) {
    console.log(n, divisors(n), isPerfect(n));
}

const m = 3;
console.log(`first ${m}th perfect number`, [...take(perfects(), 3)]);

const n = 7;
console.log(`first ${n}th even perfect number`, [...take(evenPerfects(), n)]);
