export function comSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0) {
    let h = a.length / 1.3 | 0;
    let swaps = 0;
    for (; ;) {
        swaps = 0;
        for (let i = 0, l = a.length; i + h < l; i++) {
            if (compare(a[i + h], a[i]) < 0) {
                [a[i + h], a[i]] = [a[i], a[i + h]];
                swaps++;
            }
        }
        if (h <= 1) {
            if (swaps === 0) { break; }
        } else {
            h = h / 1.3 | 0;
        }
    }
}