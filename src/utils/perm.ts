import { reversePartArray } from './array.ts';

export function nextPerm(a: number[]): number[] | null {
    const al = a.length;
    if (al < 2) {
        return null;
    }

    let i: number;
    for (i = al - 2; i >= 0; i--) {
        if (a[i] < a[i + 1]) { break; }
    }

    if (i < 0) { return null; }

    let j = al;
    do {
        j--;
    } while (a[i] >= a[j]);

    // console.log({i,j});
    const c = a.slice();
    if (c[i] < c[j]) {
        // swap
        [c[i], c[j]] = [c[j], c[i]];
        // console.log({c});
        return reversePartArray(c, i + 1, al - i - 1);
    }

    return null;
}

export function* permutations(a: number[]) {
    let t: number[] | null = a;
    do {
        yield t;
        t = nextPerm(t);
    } while (t);
}
