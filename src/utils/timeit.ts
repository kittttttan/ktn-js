export function timeit(f: () => unknown, tag = 'timeit'): void {
    console.time(tag);
    f();
    console.timeEnd(tag);
}

export async function timeitAsync(f: () => unknown, tag = 'timeit'): Promise<void> {
    console.time(tag);
    await f();
    console.timeEnd(tag);
}
