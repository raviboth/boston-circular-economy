import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { SearchBar } from '../../components/SearchBar/SearchBar'
import { Badge } from '../../components/Badge/Badge'
import { ServiceCard } from '../../components/ServiceCard/ServiceCard'
import { fuzzyMatchIndices } from '../../utils/fuzzyMatch'

type BadgeVariant = 'repair' | 'donation' | 'lending' | 'exchange' | 'repair-cafe'

export const Route = createFileRoute('/services/')({
  component: ServiceDirectory,
})

const SERVICES = [
  {
    name: 'Jamaica Plain Tool Library',
    serviceTypes: ['lending'],
    location: 'Jamaica Plain, Boston',
    hours: 'Sat–Sun 10am–4pm',
    description:
      'A community tool-lending library offering hundreds of hand and power tools, ladders, and garden equipment. Members pay a small annual fee and can borrow up to five items at a time. Volunteers run weekly sharpening and maintenance clinics.',
  },
  {
    name: 'South End Repair Café',
    serviceTypes: ['repair-cafe', 'repair'],
    location: 'South End, Boston',
    hours: 'First Sat of month, 10am–1pm',
    description:
      'Volunteer repair coaches help residents fix clothing, small appliances, bikes, and furniture. No appointment needed — bring your broken item and learn alongside the fixer. Coffee and light snacks provided.',
  },
  {
    name: 'Roslindale Clothes Swap',
    serviceTypes: ['exchange', 'donation'],
    location: 'Roslindale, Boston',
    hours: 'Third Sun of month, 11am–2pm',
    description:
      'Bring up to ten items of gently used clothing and leave with the same number from the swap table. Remaining items are donated to a local shelter at the end of each event. All sizes and styles welcome.',
  },
  {
    name: 'Dorchester ReStore',
    serviceTypes: ['donation', 'exchange'],
    location: 'Dorchester, Boston',
    hours: 'Tue–Sat 9am–5pm',
    description:
      'Accepts donations of used furniture, building materials, and appliances in working condition. Items are resold at low prices to the community. Proceeds support affordable housing construction in Greater Boston.',
  },
  {
    name: 'Cambridge Sewing & Textile Studio',
    serviceTypes: ['repair', 'lending'],
    location: 'Cambridge (near Boston)',
    hours: 'Wed & Sat 12pm–6pm',
    description:
      'Drop in for textile repair help — darning, patching, zipper replacement, and alterations. The studio also loans sewing machines and sergers for use on-site. Classes in visible mending offered monthly.',
  },
  {
    name: 'Allston Bike Kitchen',
    serviceTypes: ['repair', 'exchange'],
    location: 'Allston, Boston',
    hours: 'Mon, Wed, Fri 4pm–8pm',
    description:
      'Community bike workshop where members can use tools and get guidance to repair their own bikes. Donated bikes are refurbished and sold at affordable prices or given to community members in need.',
  },
  {
    name: 'East Boston Community Pantry & Swap',
    serviceTypes: ['donation', 'exchange'],
    location: 'East Boston, Boston',
    hours: 'Mon–Fri 8am–12pm',
    description:
      'A neighborhood pantry supplemented by a free swap shelf where residents can take or leave household goods, books, and children\'s items. No income verification required.',
  },
  {
    name: 'Brighton Electronics Fix-It Clinic',
    serviceTypes: ['repair'],
    location: 'Brighton, Boston',
    hours: 'Second Sat of month, 1pm–4pm',
    description:
      'Volunteer engineers help diagnose and repair laptops, phones, tablets, and small electronics at no charge. Participants are encouraged to observe and learn basic repair skills. Donations of repair tools accepted.',
  },
]

const ALL_TYPES: BadgeVariant[] = ['repair', 'donation', 'lending', 'exchange', 'repair-cafe']

function formatLabel(type: string): string {
  return type
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function ServiceDirectory() {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState<BadgeVariant | null>(null)

  const filtered = useMemo(() => {
    return SERVICES.filter((service) => {
      if (activeType && !service.serviceTypes.includes(activeType)) return false
      if (query.trim()) {
        const searchText = `${service.name} ${service.location} ${service.description}`
        return fuzzyMatchIndices(query.trim(), searchText) !== null
      }
      return true
    })
  }, [query, activeType])

  return (
    <div>
      <h1 className="font-display font-bold text-charles-blue text-2xl sm:text-3xl mb-1">
        Service Directory
      </h1>
      <p className="font-body text-gray-400 mb-6">
        Find circular economy services near you — repair, borrow, donate, and exchange.
      </p>

      <SearchBar value={query} onChange={setQuery} placeholder="Search by name, location, or description…" />

      <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Filter by service type">
        {ALL_TYPES.map((type) => {
          const isActive = activeType === type
          return (
            <button
              key={type}
              aria-pressed={isActive}
              onClick={() => setActiveType(isActive ? null : type)}
              className={[
                'rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optimistic-blue focus-visible:ring-offset-1',
                'transition-opacity duration-150',
                isActive ? 'ring-2 ring-charles-blue ring-offset-1' : 'opacity-60 hover:opacity-90',
              ].join(' ')}
            >
              <Badge label={formatLabel(type)} variant={type} />
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="font-body text-gray-400 mt-10 text-center">
          No services match your search. Try a different query or clear the filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filtered.map((service) => (
            <ServiceCard key={service.name} {...service} />
          ))}
        </div>
      )}
    </div>
  )
}
