export function timeit(f: (...args: any[]) => any): void {
  const t0 = Date.now();
  f();
  const t1 = Date.now();
  console.log(`${f.name} takes ${t1 - t0}ms`);
}
