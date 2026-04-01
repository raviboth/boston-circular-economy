import { useState } from 'react'
import { Badge } from '../Badge/Badge'

type BadgeVariant = 'repair' | 'donation' | 'lending' | 'exchange' | 'repair-cafe' | 'alert'

interface ServiceCardProps {
  name: string
  serviceTypes: string[]
  location: string
  hours: string
  description: string
}

function formatLabel(type: string): string {
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function ServiceCard({ name, serviceTypes, location, hours, description }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsExpanded((prev) => !prev)
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-optimistic-blue"
      onClick={() => setIsExpanded((prev) => !prev)}
      onKeyDown={handleKeyDown}
    >
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-charles-blue text-base leading-snug">
            {name}
          </h3>
          <span className="text-gray-400 mt-0.5 shrink-0" aria-hidden="true">
            {isExpanded ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {serviceTypes.map((type) => (
            <Badge key={type} label={formatLabel(type)} variant={type as BadgeVariant} />
          ))}
        </div>

        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-1.5 text-sm text-gray-400 font-body">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-400 font-body">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{hours}</span>
          </div>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-gray-200">
          <p className="text-sm text-gray-400 font-body leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}
