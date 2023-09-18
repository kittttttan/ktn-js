export function bucketSort(a: number[], min: number, max: number) {
    const buckets: number[] = [];
    for(let i = min; i <= max; i++){
      buckets[i] = 0;
    }
    for(let i = 0, l = a.length; i < l; i++){
      buckets[a[i]]++;
    }
    for(let i = 0, l = min; l <= max; l++){
      while (buckets[l] > 0) {
        a[i++] = l;
        buckets[l]--;
      }
    }
}