export function bisect_left(a: number[], x: number): number {
  let lo = 0;
  let hi = a.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (a[mid] < x) {
      lo = mid + 1
    } else {
      hi = mid
    }
  }

  return lo;
}

export function bisect_right(a: number[], x: number): number {
  let lo = 0;
  let hi = a.length;
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (a[mid] > x) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }

  return lo;
}

export function insort_left(a: number[], x: number): void {
  const i = bisect_left(a, x);
  a.splice(i, 0, x);
}

export function insort_right(a: number[], x: number): void {
  const i = bisect_right(a, x);
  a.splice(i, 0, x);
}
