export function timeit(f, tag = 'timeit') {
    console.time(tag);
    f();
    console.timeEnd(tag);
}
