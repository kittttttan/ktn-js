export function heapify(x: number[]) {
  const n = x.length;
  for (let i = (n >> 1) - 1; i >= 0; i--) {
    _siftup(x, i);
  }
}

export function heappush(heap: number[], item: number) {
  heap.push(item);
  _siftdown(heap, 0, heap.length - 1);
}

export function heappop(heap: number[]) {
  const lastelt = heap.pop();
  if (lastelt && heap) {
    const returnitem = heap[0];
    heap[0] = lastelt;
    _siftup(heap, 0);
    return returnitem;
  }
  return lastelt;
}

export function _siftdown(heap: number[], startpos: number, pos: number) {
  const newitem = heap[pos];

  while (pos > startpos) {
    const parentpos = (pos - 1) >> 1;
    const parent = heap[parentpos];
    if (newitem < parent) {
      heap[pos] = parent;
      pos = parentpos;
      continue;
    }
    break;
  }
  heap[pos] = newitem;
}

export function _siftup(heap: number[], pos: number) {
  const endpos = heap.length;
  const startpos = pos;
  const newitem = heap[pos];

  let childpos = 2 * pos + 1;
  while (childpos < endpos) {
    const rightpos = childpos + 1;
    if (rightpos < endpos && !(heap[childpos] < heap[rightpos])) {
      childpos = rightpos;
    }
    heap[pos] = heap[childpos];
    pos = childpos;
    childpos = 2 * pos + 1;
  }

  heap[pos] = newitem;
  _siftdown(heap, startpos, pos);
}
