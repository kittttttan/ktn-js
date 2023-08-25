import type {uint} from '../types';

export function* collatz(n: uint): Generator<uint> {
    for (; ;) {
        yield n;
        if ((n & 1) === 0) {
            n >>= 1;
        } else {
            n = 3 * n + 1;
        }
    }
}

export function* bigCollatz(n: bigint): Generator<bigint> {
    for (; ;) {
        yield n;
        if ((n & 1n) === 0n) {
            n >>= 1n;
        } else {
            n = 3n * n + 1n;
        }
    }
}
