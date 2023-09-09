import type {float} from '../../types.ts';

export function* geometric(r: float, a = 1): Generator<float> {
  let n = a;
  for (;;) {
    yield n;
    n *= r;
  }
}

export function* bigGeometric(r: bigint, a = 1n): Generator<bigint> {
  let n = a;
  for (;;) {
    yield n;
    n *= r;
  }
}
