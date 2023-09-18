export function bubbleSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    for (let i = 0, li = a.length - 1; i < li; i++) {
        for (let j = 0, lj = a.length - 1 - i; j < lj; j++) {
            if (compare(a[j], a[j + 1]) > 0) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
            }
        }
    }
}