export function mergeSort<T>(a: T[], compare: (a: T, b: T) => number = (a: T, b: T) => a > b ? 1 : a < b ? -1 : 0): T[] {
    if (a.length < 2) {
        return a;
    }
  
    const middle = a.length >> 1;
    const left = a.slice(0, middle);
    const right = a.slice(middle);
  
    return merge(mergeSort(left), mergeSort(right), compare);
  }
  
  function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (compare(left[i], right[j]) < 0) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
  
    return result.concat(left.slice(i)).concat(right.slice(j));
  }
  