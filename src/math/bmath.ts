export function abs(a: bigint): bigint {
  return a < 0n ? -a : a;
}

export function gcd(...args: bigint[]): bigint {
  const f = (x: bigint, y: bigint) => y ? f(y, x % y) : x;

  return args.reduce(f);
}

export function isqrt(a: bigint): bigint {
  if (a < 0n) {
    throw new RangeError('a < 0');
  }
  if (a < 2n) {
    return a;
  }
  let shift = 2n;
  while ((a >> shift) != 0n) {
    shift += 2n;
  }

  let result = 0n;
  while (shift >= 0n) {
    result <<= 1n;
    const large_cand = result + 1n;
    if (large_cand * large_cand <= (a >> shift)) {
      result = large_cand;
    }
    shift -= 2n;
  }

  return result;
}

export function rootNth(value: bigint, k = 2n): bigint {
  if (value < 0n) {
    throw RangeError('value < 0');
  }

  let o = 0n;
  let x = value;
  let limit = 1000;

  while (x ** k != k && x != o) {
    o = x;
    x = ((k - 1n) * x + value / x ** (k - 1n)) / k;
    --limit;
    if (!limit) {
      throw new Error('loop limit');
    }
  }

  return x;
}

export function log(a: bigint): number {
  if (a < 0n) {
    throw new RangeError('a < 0');
  }
  const s = a.toString();
  const order = s.length;
  return order * Math.log(10) + Math.log(parseFloat('0.' + s));
}

export function log2(a: bigint): number {
  if (a < 0n) {
    throw new RangeError('a < 0');
  }
  const s = a.toString();
  const order = s.length;
  return order * Math.log2(10) + Math.log2(parseFloat('0.' + s));
}

export function rho(n: bigint, r: bigint): bigint {
  function rand(x: bigint, n: bigint, c: bigint): bigint {
    return (x * x + c) % n;
  }

  let x = 2n;
  let y = 2n;
  let d = 1n;
  let i = 0;
  while (d == 1n) {
    x = rand(x, n, r);
    y = rand(rand(y, n, r), n, r);
    d = gcd(abs(x - y), n);
    if (++i > 1e4) { throw new Error('loop limit'); }
  }
  if (d == n) { return 0n; }
  return d;
}
