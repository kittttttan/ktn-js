import { permutations } from "../src/utils/perm.ts";

const a = [1, 2, 3];
for (const p of permutations(a)) {
    console.log(p);
}
console.log();

const b = [1, 1, 2];
for (const p of permutations(b)) {
    console.log(p);
}
console.log();

const c = [1, 2, 2, 3];
for (const p of permutations(c)) {
    console.log(p);
}
console.log();
