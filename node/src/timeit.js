function timeit(f, tag = 'timeit') {
    console.time(tag);
    f();
    console.timeEnd(tag);
}
exports.timeit = timeit;

function memoryUsage() {
    const used = process.memoryUsage()
    const messages = []
    for (let key in used) {
        messages.push(`${key}: ${Math.round(used[key] / 1024 * 100) / 100} KB`)
    }
    console.log(messages.join(', '))
}
exports.memoryUsage = memoryUsage;
