export function* mersenne(): Generator<bigint> {
  let i = 1n;
  for (;;) {
    yield (1n << i) - 1n;
    i++;
  }
}
