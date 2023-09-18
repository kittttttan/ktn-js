export function shakerSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    let first = 0;
    let last = a.length - 1;
    let last_swap = 0;
    for (; ;) {
        last_swap = first;
        for (let i = first; i < last; i++) {
            if (compare(a[i], a[i + 1]) > 0) {
                [a[i], a[i + 1]] = [a[i + 1], a[i]];
                last_swap = i;
            }
        }

        last = last_swap;
        if (first === last) { break; }

        last_swap = last;
        for (let i = last; i > first; i--) {
            if (compare(a[i], a[i - 1]) < 0) {
                [a[i], a[i - 1]] = [a[i - 1], a[i]];
                last_swap = i;
            }
        }

        first = last_swap;
        if (first === last) { break; }
    }
}