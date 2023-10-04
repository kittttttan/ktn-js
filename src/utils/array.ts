export function reversePartArray<T>(array: T[], begin: number, length: number): T[] {
    array = array.slice();
    if (length < 1) {
        return array;
    }

    array.splice(begin, length, ...array.slice(begin, begin + length).reverse());

    return array;
}
