import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ITEMS } from './-mock-data/items'
import styles from './fuzzy-search.module.css'
import { fuzzyMatchIndices } from '../../../utils/fuzzyMatch'

export const Route = createFileRoute('/dev/fuzzy-search/')({
  component: FuzzySearch,
})

function HighlightedItem({ item, matchIndices }: { item: string; matchIndices: number[] }) {
  const matched = new Set(matchIndices)
  return (
    <>
      {item.split('').map((char, i) =>
        matched.has(i) ? <b key={i}>{char}</b> : <span key={i}>{char}</span>
      )}
    </>
  )
}

function FuzzySearch() {
  const [query, setQuery] = useState('')

  const results = ITEMS.flatMap((item) => {
    const matchIndices = fuzzyMatchIndices(query, item)
    return matchIndices ? [{ item, matchIndices }] : []
  })

  return (
    <main>
      <h1>Fuzzy Search</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className={styles.resultsBox}>
          <ul className={styles.resultsList}>
            {results.length > 0 ? (
              results.map(({ item, matchIndices }) => (
                <li key={item}>
                  <HighlightedItem item={item} matchIndices={matchIndices} />
                </li>
              ))
            ) : (
              <li>No results</li>
            )}
          </ul>
        </div>
      )}
    </main>
  )
}
