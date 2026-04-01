import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Tokens/Colors',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

interface ColorToken {
  name: string
  hex: string
  tailwindClass: string
  usage: string
}

interface ColorGroup {
  label: string
  tokens: ColorToken[]
}

const colorGroups: ColorGroup[] = [
  {
    label: 'Primary',
    tokens: [
      { name: 'charles-blue', hex: '#091F2F', tailwindClass: 'bg-charles-blue', usage: 'Typographic headers, contrast and weight on lighter pages' },
      { name: 'optimistic-blue', hex: '#1871BD', tailwindClass: 'bg-optimistic-blue', usage: 'Links, buttons, background color, photo overlays' },
      { name: 'freedom-red', hex: '#FB4D42', tailwindClass: 'bg-freedom-red', usage: 'Use minimally — small accents only' },
    ],
  },
  {
    label: 'Blue Scale',
    tokens: [
      { name: 'blue-100', hex: '#51ACFF', tailwindClass: 'bg-blue-100', usage: 'Substitute for primary blue on dark backgrounds' },
      { name: 'blue-200', hex: '#45789C', tailwindClass: 'bg-blue-200', usage: 'Text that needs to recede' },
      { name: 'blue-300', hex: '#0C2639', tailwindClass: 'bg-blue-300', usage: 'Footer backgrounds, contrast with primary dark blue' },
      { name: 'blue-400', hex: '#061622', tailwindClass: 'bg-blue-400', usage: 'Use very rarely' },
    ],
  },
  {
    label: 'Gray Scale',
    tokens: [
      { name: 'gray-100', hex: '#F2F2F2', tailwindClass: 'bg-gray-100', usage: 'Background color' },
      { name: 'gray-200', hex: '#E0E0E0', tailwindClass: 'bg-gray-200', usage: 'Background color, subtle fills' },
      { name: 'gray-300', hex: '#D2D2D2', tailwindClass: 'bg-gray-300', usage: 'Horizontal rules, borders' },
      { name: 'gray-400', hex: '#58585B', tailwindClass: 'bg-gray-400', usage: 'Body copy' },
    ],
  },
]

function SwatchGrid() {
  return (
    <div className="space-y-8 font-sans">
      {colorGroups.map((group) => (
        <section key={group.label}>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            {group.label}
          </h2>
          <div className="flex flex-wrap gap-4">
            {group.tokens.map((token) => (
              <div key={token.name} className="w-36">
                <div
                  className="mb-2 h-16 w-full rounded border border-gray-300"
                  style={{ backgroundColor: token.hex }}
                />
                <p className="text-sm font-medium text-charles-blue">{token.name}</p>
                <p className="font-mono text-xs text-gray-400">{token.hex}</p>
                <p className="font-mono text-xs text-gray-300">{token.tailwindClass}</p>
                <p className="mt-1 text-xs italic text-gray-400">{token.usage}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <aside className="rounded border border-gray-300 bg-gray-100 p-4 text-sm text-charles-blue">
        <strong>Contrast Rule:</strong> Optimistic Blue must never be placed on Freedom Red or vice
        versa.
      </aside>

      <aside className="rounded border border-gray-300 bg-gray-100 p-4 text-sm text-charles-blue">
        <strong>Color Strategy:</strong> Use the blues strongly and purposefully, and use the red
        sparingly. Use the light gray liberally with white, while still keeping white dominant.
      </aside>
    </div>
  )
}

export const AllColors: Story = {
  render: () => <SwatchGrid />,
}
