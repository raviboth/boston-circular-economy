import { useEffect, useState } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Search services…' }: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [inputValue, onChange])

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full rounded-lg border border-gray-200 bg-white',
          'pl-10 pr-4 py-3',
          'font-display text-sm text-charles-blue',
          'placeholder:font-body placeholder:text-gray-300 placeholder:italic',
          'focus:outline-none focus:ring-2 focus:ring-optimistic-blue focus:border-transparent',
          'transition-shadow duration-150',
        ].join(' ')}
      />
    </div>
  )
}
