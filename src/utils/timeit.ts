export function timeit(f: () => unknown, tag = 'timeit') {
    console.time(tag);
    f();
    console.timeEnd(tag);
}
