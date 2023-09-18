import { expect, test } from 'vitest'
import {
    bubbleSort,
    shakerSort,
    comSort,
    selectSort,
    insertSort,
    shellSort,
    quickSort,
    bucketSort,
    mergeSort,
} from '../../src/sort'

const as = [
    [],
    [0],
    [0, 1],
    [1, 0],
    [3, 5, 1, 6, 2, 4, 7, 0],
    [3, 1, 7, 7, 2, 0, 7, 0],
];
const es = [
    [],
    [0],
    [0, 1],
    [0, 1],
    [0, 1, 2, 3, 4, 5, 6, 7],
    [0, 0, 1, 2, 3, 7, 7, 7],
];

const fs = [
    bubbleSort,
    shakerSort,
    comSort,
    selectSort,
    insertSort,
    shellSort,
    quickSort,
    // bucketSort,
    // mergeSort,
];

for (const f of fs) {
    test(f.name, () => {
        for (let i = 0, l = as.length; i < l; i++) {
            const a = [...as[i]];
            f(a);

            expect(a.length).toBe(es[i].length);
            a.forEach((v, j) => {
                expect(v).toBe(es[i][j]);
            });
        }
    });
}

test('bucketSort', () => {
    for (let i = 0, l = as.length; i < l; i++) {
        let a = [...as[i]];
        bucketSort(a, 0, a.length - 1);

        expect(a.length).toBe(es[i].length);
        a.forEach((v, j) => {
            expect(v).toBe(es[i][j]);
        });
    }
});

test('mergeSort', () => {
    for (let i = 0, l = as.length; i < l; i++) {
        let a = [...as[i]];
        a = mergeSort(a);

        expect(a.length).toBe(es[i].length);
        a.forEach((v, j) => {
            expect(v).toBe(es[i][j]);
        });
    }
});
