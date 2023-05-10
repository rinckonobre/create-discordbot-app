export function countMatchingNumbers(arr1: number[], arr2: number[]): number {
    const set2 = new Set(arr2);
    let count = 0;
    for (const num of arr1) {
      if (set2.has(num)) {
        count++;
      }
    }
    return count;
}
  