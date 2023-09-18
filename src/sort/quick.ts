export function quickSort(a: number[]) {
    quickImpl(a, 0, a.length - 1);
}

function quickImpl(a: number[], first: number, last: number) {
    let i = first;
    let j = last;
    let filter = (a[i] + a[j]) / 2;
    while (i < j) {
        while (a[i] < filter) { i++; }
        while (a[j] > filter) { j--; }
        if (i < j) {
            [a[i], a[j]] = [a[j], a[i]];
            i++;
            j--;
        }
    }
    if (i === j) {
        if (a[i] < filter) {
            i++;
        } else if (a[j] > filter) {
            j--;
        }
    }
    if (i >= first + 2) { quickImpl(a, first, i - 1); }
    if (j <= last - 2) { quickImpl(a, j + 1, last); }
}