function timeit(f, tag = 'timeit') {
    console.time(tag);
    f();
    console.timeEnd(tag);
}
exports.timeit = timeit;
