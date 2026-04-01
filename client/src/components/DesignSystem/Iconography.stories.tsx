import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Guidelines/Iconography',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ─── SVG Example Icons ───────────────────────────────────────────────────────

/** Experiential: bold 3px stroke, hard edges, no fill */
function ExperientialHouseIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Experiential icon example: house outline with 3-pixel stroke"
    >
      {/* Roof */}
      <polyline
        points="8,34 32,10 56,34"
        stroke="#091F2F"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Walls */}
      <polyline
        points="14,30 14,54 50,54 50,30"
        stroke="#091F2F"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
      {/* Door */}
      <rect
        x="26"
        y="38"
        width="12"
        height="16"
        stroke="#091F2F"
        strokeWidth="3"
        strokeLinecap="square"
        strokeLinejoin="miter"
        fill="none"
      />
    </svg>
  )
}

/** Departmental: solid Charles Blue fill with Freedom Trail Red underline */
function DepartmentalGearIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Departmental icon example: solid gear with red underline"
    >
      {/* Simplified solid gear shape */}
      <path
        d="M30 10h4v6l4.5 1.5 4-4 2.8 2.8-4 4L43 24h6v4h-6l-1.5 4.5 4 4-2.8 2.8-4-4L34 37v6h-4v-6l-4.5-1.5-4 4-2.8-2.8 4-4L21 28h-6v-4h6l1.5-4.5-4-4 2.8-2.8 4 4L30 16V10z"
        fill="#091F2F"
      />
      <circle cx="32" cy="26" r="5" fill="white" />
      {/* Freedom Trail Red underline */}
      <rect x="12" y="50" width="40" height="3" rx="1" fill="#FB4D42" />
    </svg>
  )
}

/** Small circular: icon inside a 3px dark-blue circle */
function SmallCircularLinkIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Small circular icon example: link icon inside circle"
    >
      {/* Circle border */}
      <circle cx="32" cy="32" r="24" stroke="#091F2F" strokeWidth="3" fill="#091F2F" />
      {/* Simple chain-link / arrow icon in white */}
      <path
        d="M24 36l-2-2a5.66 5.66 0 010-8l4-4a5.66 5.66 0 018 0l1 1"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 28l2 2a5.66 5.66 0 010 8l-4 4a5.66 5.66 0 01-8 0l-1-1"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// ─── Icon Type Data ──────────────────────────────────────────────────────────

interface IconTypeInfo {
  name: string
  description: string
  rules: string[]
  Example: React.FC
}

const iconTypes: IconTypeInfo[] = [
  {
    name: 'Experiential Icons',
    description: 'Used for specific citizen actions such as paying parking tickets.',
    rules: [
      'Bold line icons with 3-pixel-width strokes.',
      'Hard edges preferred -- avoid unnecessary rounded corners.',
      'No fills; outline only.',
      'Application: transactions that need to jump off the page quickly.',
    ],
    Example: ExperientialHouseIcon,
  },
  {
    name: 'Departmental Icons',
    description: 'Used for content attribution and wayfinding to department pages.',
    rules: [
      'Simple, solid shapes that are recognizable at a glance.',
      'Filled with Charles Blue (#091F2F).',
      'Underlined with Freedom Trail Red (#FB4D42).',
      'Purpose: content attribution and wayfinding to department pages.',
    ],
    Example: DepartmentalGearIcon,
  },
  {
    name: 'Small Circular Icons',
    description: 'Similar in concept to social media icons, used inline and on homepages.',
    rules: [
      'Surrounded by a 3-pixel circle, filled with dark blue (#091F2F).',
      'Inner glyph rendered in white for contrast.',
      'Usage: inline placement and homepages.',
      'Keep the inner glyph simple so it remains legible at small sizes.',
    ],
    Example: SmallCircularLinkIcon,
  },
]

// ─── Story ───────────────────────────────────────────────────────────────────

function IconStylesDoc() {
  return (
    <div className="space-y-10 font-sans">
      <header>
        <h1 className="font-display font-bold text-2xl uppercase tracking-widest text-charles-blue">Iconography</h1>
        <p className="mt-2 max-w-2xl text-sm font-body text-gray-400">
          Boston uses three distinct icon styles, each suited to a specific context. Consistency
          across these styles helps residents navigate city services quickly and confidently.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {iconTypes.map(({ name, description, rules, Example }) => (
          <div
            key={name}
            className="rounded border border-gray-300 bg-white p-6 flex flex-col"
          >
            {/* Icon preview */}
            <div className="mb-4 flex items-center justify-center rounded bg-gray-100 p-4">
              <Example />
            </div>

            {/* Heading */}
            <h2 className="font-display text-lg font-bold text-charles-blue">{name}</h2>

            {/* Description */}
            <p className="mt-1 text-sm font-body text-gray-400">{description}</p>

            {/* Rules */}
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm font-body text-charles-blue">
              {rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <aside className="rounded border border-gray-300 bg-gray-100 p-4 text-sm text-charles-blue">
        <strong>Consistency note:</strong> Always match the icon style to its context. Do not mix
        experiential stroke icons with solid departmental icons in the same UI region.
      </aside>
    </div>
  )
}

export const IconStyles: Story = {
  render: () => <IconStylesDoc />,
}
