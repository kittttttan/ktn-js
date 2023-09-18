export function shellSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    for (let i = a.length >> 1; i >= 1; i >>= 1) {
        for (let j = i, l = a.length; j < l; j++) {
            for (let k = j; k >= i; k -= i) {
                if (compare(a[k - i], a[k]) <= 0) { break; }
                [a[k - i], a[k]] = [a[k], a[k - i]];
            }
        }
    }
}