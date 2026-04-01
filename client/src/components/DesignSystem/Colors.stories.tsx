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
}

interface ColorGroup {
  label: string
  tokens: ColorToken[]
}

const colorGroups: ColorGroup[] = [
  {
    label: 'Primary',
    tokens: [
      { name: 'charles-blue', hex: '#091F2F', tailwindClass: 'bg-charles-blue' },
      { name: 'optimistic-blue', hex: '#1871BD', tailwindClass: 'bg-optimistic-blue' },
      { name: 'freedom-red', hex: '#FB4D42', tailwindClass: 'bg-freedom-red' },
    ],
  },
  {
    label: 'Blue Scale',
    tokens: [
      { name: 'blue-100', hex: '#51ACFF', tailwindClass: 'bg-blue-100' },
      { name: 'blue-200', hex: '#45789C', tailwindClass: 'bg-blue-200' },
      { name: 'blue-300', hex: '#0C2639', tailwindClass: 'bg-blue-300' },
      { name: 'blue-400', hex: '#061622', tailwindClass: 'bg-blue-400' },
    ],
  },
  {
    label: 'Gray Scale',
    tokens: [
      { name: 'gray-100', hex: '#F2F2F2', tailwindClass: 'bg-gray-100' },
      { name: 'gray-200', hex: '#E0E0E0', tailwindClass: 'bg-gray-200' },
      { name: 'gray-300', hex: '#D2D2D2', tailwindClass: 'bg-gray-300' },
      { name: 'gray-400', hex: '#58585B', tailwindClass: 'bg-gray-400' },
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
              </div>
            ))}
          </div>
        </section>
      ))}

      <aside className="rounded border border-gray-300 bg-gray-100 p-4 text-sm text-charles-blue">
        <strong>Contrast Rule:</strong> Optimistic Blue must never be placed on Freedom Red or vice
        versa.
      </aside>
    </div>
  )
}

export const AllColors: Story = {
  render: () => <SwatchGrid />,
}
