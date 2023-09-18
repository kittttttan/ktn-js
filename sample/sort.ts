import {timeit} from '../src/utils/timeit.ts';
import {range} from '../src/utils/iter.ts';
import {shuffleArray} from '../src/utils/shuffle.ts';
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
} from '../src/sort/index.ts';

const n = 64;
const a0 = [...range(n)];
const seq = [...a0];
shuffleArray(a0);
console.log(a0);
console.log();

function checkArray(a: number[], s = 'sort') {
    let res = true;
    if (a.length === seq.length) {
        for (let i = 0, l = a.length; i < l; i++) {
            if (a[i] !== seq[i]) {
                res = false;
                break;
            }
        }
    }
    if (res) {
        console.log(s);
    } else {
        throw new Error(`${s} error`);
    }
    console.log();
}

let i = 0;
function initArray() {
    i = 0;
    const a = [...a0];
    return a;
}

const compare = (a: number, b: number) => {
    i++;
    return a - b;
};

let a = initArray();
timeit(() => {
    a.sort(compare);
});
checkArray(a, `array.sort compare: ${i}`);

a = initArray();
timeit(() => {
    bubbleSort(a, compare);
});
checkArray(a, `bubble compare: ${i}`);

a = initArray();
timeit(() => {
    shakerSort(a, compare);
});
checkArray(a, `shaker compare: ${i}`);

a = initArray();
timeit(() => {
    comSort(a, compare);
});
checkArray(a, `com compare: ${i}`);

a = initArray();
timeit(() => {
    selectSort(a, compare);
});
checkArray(a, `select compare: ${i}`);

a = initArray();
timeit(() => {
    insertSort(a, compare);
});
checkArray(a, `insert compare: ${i}`);

a = initArray();
timeit(() => {
    shellSort(a, compare);
});
checkArray(a, `shell compare: ${i}`);

a = initArray();
timeit(() => {
    quickSort(a);
});
checkArray(a, 'quick');

a = initArray();
timeit(() => {
    bucketSort(a, 0, n - 1);
});
checkArray(a, 'bucket');

a = initArray();
timeit(() => {
    a = mergeSort(a, compare);
});
checkArray(a, `merge compare: ${i}`);
