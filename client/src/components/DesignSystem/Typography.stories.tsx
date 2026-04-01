import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Tokens/Typography',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ─── Font Family Samples ──────────────────────────────────────────────────────

const montserratWeights = [
  { weight: 400, label: 'Regular (400)', tailwind: 'font-display font-normal' },
  { weight: 600, label: 'SemiBold (600)', tailwind: 'font-display font-semibold' },
  { weight: 700, label: 'Bold (700)', tailwind: 'font-display font-bold' },
]

const loraWeights = [
  { weight: 400, italic: false, label: 'Regular (400)', tailwind: 'font-body font-normal' },
  { weight: 600, italic: false, label: 'SemiBold (600)', tailwind: 'font-body font-semibold' },
  { weight: 400, italic: true,  label: 'Italic (400)',   tailwind: 'font-body font-normal italic' },
]

export const FontFamilies: Story = {
  render: () => (
    <div className="space-y-10">
      {/* Montserrat */}
      <section>
        <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">
          Montserrat — Display / Headings
        </h2>
        <div className="space-y-4">
          {montserratWeights.map(({ weight, label, tailwind }) => (
            <div key={weight} className="flex items-baseline gap-6">
              <span
                className="font-display text-3xl text-charles-blue"
                style={{ fontWeight: weight }}
              >
                The circular economy starts here.
              </span>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {label} — <code className="bg-gray-100 px-1 rounded">{tailwind}</code>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Lora */}
      <section>
        <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">
          Lora — Body / Prose
        </h2>
        <div className="space-y-4">
          {loraWeights.map(({ weight, italic, label, tailwind }) => (
            <div key={`${weight}-${italic}`} className="flex items-baseline gap-6">
              <p
                className={`font-body text-base text-charles-blue max-w-md ${italic ? 'italic' : ''}`}
                style={{ fontWeight: weight }}
              >
                Boston's circular economy connects residents with repair, donation, lending, and exchange services across the city.
              </p>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {label} — <code className="bg-gray-100 px-1 rounded">{tailwind}</code>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}

// ─── Type Scale ───────────────────────────────────────────────────────────────

const typeScale = [
  {
    Component: 'h1',
    label: 'Heading 1',
    tailwind: 'font-display font-bold text-4xl',
    sample: 'Circular Economy Services',
  },
  {
    Component: 'h2',
    label: 'Heading 2',
    tailwind: 'font-display font-bold text-3xl',
    sample: 'Repair & Reuse Near You',
  },
  {
    Component: 'h3',
    label: 'Heading 3',
    tailwind: 'font-display font-semibold text-2xl',
    sample: 'Find a Repair Café',
  },
  {
    Component: 'h4',
    label: 'Heading 4',
    tailwind: 'font-display font-semibold text-xl',
    sample: 'Upcoming Events',
  },
  {
    Component: 'p',
    label: 'Body',
    tailwind: 'font-body font-normal text-base',
    sample:
      'Browse services that help you repair, donate, lend, and exchange items instead of throwing them away.',
  },
  {
    Component: 'p',
    label: 'Body Small',
    tailwind: 'font-body font-normal text-sm',
    sample: 'Last updated March 2026 · Boston, MA',
  },
] as const

export const TypeScale: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">
        Type Scale
      </p>
      {typeScale.map(({ Component, label, tailwind, sample }) => {
        const Tag = Component as any
        return (
          <div key={`${Component}-${label}`} className="flex items-baseline gap-4 border-b border-gray-200 pb-4">
            <div className="w-28 shrink-0 text-xs text-gray-400">
              <div className="font-semibold">{label}</div>
              <code className="text-[10px] bg-gray-100 px-1 rounded break-all">{tailwind}</code>
            </div>
            <Tag className={`${tailwind} text-charles-blue`}>{sample}</Tag>
          </div>
        )
      })}
    </div>
  ),
}
