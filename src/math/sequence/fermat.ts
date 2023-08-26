export function* fermat(): Generator<bigint> {
  let i = 1n;
  for (;;) {
    yield (1n << (1n << i)) + 1n;
    i++;
  }
}
