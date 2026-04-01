import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Tokens/Spacing',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// Tailwind's default spacing scale (base unit: 4px = 1rem/4)
const spacingScale = [
  { token: '1', tailwind: 'p-1 / m-1 / gap-1', px: 4, rem: '0.25rem' },
  { token: '2', tailwind: 'p-2 / m-2 / gap-2', px: 8, rem: '0.5rem' },
  { token: '3', tailwind: 'p-3 / m-3 / gap-3', px: 12, rem: '0.75rem' },
  { token: '4', tailwind: 'p-4 / m-4 / gap-4', px: 16, rem: '1rem' },
  { token: '5', tailwind: 'p-5 / m-5 / gap-5', px: 20, rem: '1.25rem' },
  { token: '6', tailwind: 'p-6 / m-6 / gap-6', px: 24, rem: '1.5rem' },
  { token: '8', tailwind: 'p-8 / m-8 / gap-8', px: 32, rem: '2rem' },
  { token: '10', tailwind: 'p-10 / m-10 / gap-10', px: 40, rem: '2.5rem' },
  { token: '12', tailwind: 'p-12 / m-12 / gap-12', px: 48, rem: '3rem' },
  { token: '16', tailwind: 'p-16 / m-16 / gap-16', px: 64, rem: '4rem' },
]

const maxPx = 64

export const VisualScale: Story = {
  render: () => (
    <div className="space-y-2">
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Spacing Scale</h2>
      {spacingScale.map(({ token, px }) => (
        <div key={token} className="flex items-center gap-4">
          <span className="text-sm font-mono text-gray-400 w-8 text-right shrink-0">{px}px</span>
          <div
            className="h-5 bg-optimistic-blue rounded-sm shrink-0"
            style={{ width: `${(px / maxPx) * 320}px` }}
          />
          <span className="text-sm font-mono text-gray-400">space-{token}</span>
        </div>
      ))}
    </div>
  ),
}

export const ProjectPatterns: Story = {
  render: () => (
    <div className="space-y-8">
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400">Common Project Patterns</h2>

      {/* Card padding — p-4 (16px) */}
      <div>
        <p className="text-sm font-mono text-gray-400 mb-2">Card padding — p-4 (16px)</p>
        <div className="inline-block border border-dashed border-gray-300 rounded-lg">
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="bg-white border border-gray-200 rounded px-3 py-2 text-sm text-gray-400">
              Card content
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-1">16px padding applied via <code className="bg-gray-100 px-1 rounded">p-4</code></p>
      </div>

      {/* Badge gap — gap-1.5 (6px) */}
      <div>
        <p className="text-sm font-mono text-gray-400 mb-2">Badge gap — gap-1.5 (6px)</p>
        <div className="flex gap-1.5">
          {['Repair', 'Donation', 'Lending'].map((label) => (
            <span
              key={label}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-optimistic-blue"
            >
              {label}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">6px gap between badges via <code className="bg-gray-100 px-1 rounded">gap-1.5</code></p>
      </div>

      {/* Section spacing — space-y-6 (24px) */}
      <div>
        <p className="text-sm font-mono text-gray-400 mb-2">Section spacing — space-y-6 (24px)</p>
        <div className="space-y-6 border border-dashed border-gray-300 p-4 rounded-lg">
          {['Section A', 'Section B', 'Section C'].map((section) => (
            <div key={section} className="bg-gray-100 rounded px-3 py-2 text-sm text-gray-400">
              {section}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">24px vertical space between sections via <code className="bg-gray-100 px-1 rounded">space-y-6</code></p>
      </div>
    </div>
  ),
}

export const ReferenceTable: Story = {
  render: () => (
    <div>
      <h2 className="font-display font-bold text-sm uppercase tracking-widest text-gray-400 mb-4">Spacing Reference</h2>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-4 font-semibold text-charles-blue">Token</th>
            <th className="text-left py-2 pr-4 font-semibold text-charles-blue">Rem</th>
            <th className="text-left py-2 pr-4 font-semibold text-charles-blue">Pixels</th>
            <th className="text-left py-2 pr-4 font-semibold text-charles-blue">Example Classes</th>
            <th className="text-left py-2 font-semibold text-charles-blue">Visual</th>
          </tr>
        </thead>
        <tbody>
          {spacingScale.map(({ token, rem, px, tailwind }) => (
            <tr key={token} className="border-b border-gray-100 hover:bg-gray-100">
              <td className="py-2 pr-4 font-mono text-charles-blue">{token}</td>
              <td className="py-2 pr-4 font-mono text-gray-400">{rem}</td>
              <td className="py-2 pr-4 font-mono text-gray-400">{px}px</td>
              <td className="py-2 pr-4 font-mono text-gray-400 text-xs">{tailwind}</td>
              <td className="py-2">
                <div
                  className="h-3 bg-optimistic-blue rounded-sm"
                  style={{ width: `${(px / maxPx) * 128}px` }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}
