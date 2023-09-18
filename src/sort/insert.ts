export function insertSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    for (let i = 1, l = a.length; i < l; i++) {
        for (let j = i; j > 0; j--) {
            if (compare(a[j - 1], a[j]) <= 0) { break; }
            [a[j - 1], a[j]] = [a[j], a[j - 1]];
        }
    }
}