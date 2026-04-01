/**
 * Returns the indices in `item` that match characters in `query` via fuzzy matching,
 * or null if the query does not match.
 */
export function fuzzyMatchIndices(query: string, item: string): number[] | null {
  const q = query.toLowerCase()
  const s = item.toLowerCase()
  const indices: number[] = []
  let qi = 0
  for (let i = 0; i < s.length && qi < q.length; i++) {
    if (s[i] === q[qi]) {
      indices.push(i)
      qi++
    }
  }
  return qi === q.length ? indices : null
}
