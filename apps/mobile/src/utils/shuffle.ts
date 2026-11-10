/**
 * Returns a new shuffled copy of the array (Fisher–Yates, O(n)). The input is not mutated.
 * `random` can be replaced in tests to get a deterministic order.
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
