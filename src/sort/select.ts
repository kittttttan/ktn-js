export function selectSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    let min_i = 0;
    let min: T;
    for (let i = 0, li = a.length - 1; i < li; i++) {
        min_i = i;
        min = a[i];
        for (let j = i + 1, lj = a.length; j < lj; j++) {
            if (compare(a[j], min) < 0) {
                min_i = j;
                min = a[j];
            }
        }
        [a[min_i], a[i]] = [a[i], a[min_i]];
    }
}