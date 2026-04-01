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
      {/* Usage Rules */}
      <section>
        <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">
          Usage Rules
        </h2>
        <ul className="list-disc list-inside text-sm text-charles-blue space-y-1">
          <li>Montserrat must always be used in UPPERCASE bold</li>
          <li>Lora is for body text (small) or large italic for quotes and secondary text</li>
          <li>Pair Lora with Montserrat whenever possible</li>
        </ul>
      </section>

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

      {/* Email Fallback Fonts */}
      <p className="text-xs text-gray-400 mt-6">
        Email fallbacks: Lora → Georgia, Montserrat → Arial
      </p>
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

// ─── Non-Latin Typeface Alternatives ─────────────────────────────────────────

const nonLatinAlternatives = [
  { language: 'Arabic', loraReplacement: 'Markazi Text', montserratReplacement: 'Mada' },
  { language: 'Traditional Chinese (\u7E41\u9AD4\u4E2D\u6587)', loraReplacement: 'Noto Serif TC', montserratReplacement: 'Noto Sans TC' },
  { language: 'Simplified Chinese (\u7B80\u4F53\u4E2D\u6587)', loraReplacement: 'Noto Serif SC', montserratReplacement: 'Noto Sans SC' },
  { language: 'Vietnamese (Ti\u1EBFng Vi\u1EC7t)', loraReplacement: 'Palatino or Lora', montserratReplacement: 'Montserrat' },
  { language: 'Spanish, French, Russian, Portuguese, Haitian Creole, Cape Verdean Creole', loraReplacement: 'Lora (no change)', montserratReplacement: 'Montserrat (no change)' },
]

export const NonLatinAlternatives: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-2">
        Non-Latin Typeface Alternatives
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 text-charles-blue font-semibold">Language</th>
            <th className="text-left py-2 pr-4 text-charles-blue font-semibold">Lora Replacement</th>
            <th className="text-left py-2 text-charles-blue font-semibold">Montserrat Replacement</th>
          </tr>
        </thead>
        <tbody>
          {nonLatinAlternatives.map(({ language, loraReplacement, montserratReplacement }) => (
            <tr key={language} className="border-b border-gray-200">
              <td className="py-2 pr-4 text-gray-400">{language}</td>
              <td className="py-2 pr-4 text-gray-400">{loraReplacement}</td>
              <td className="py-2 text-gray-400">{montserratReplacement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
