import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Tokens/Border Radius',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

const radiusTokens = [
  { name: 'rounded-none', value: '0px', twClass: 'rounded-none' },
  { name: 'rounded-sm', value: '2px', twClass: 'rounded-sm' },
  { name: 'rounded', value: '8px', twClass: 'rounded', isProjectDefault: true },
  { name: 'rounded-lg', value: '8px', twClass: 'rounded-lg', isProjectDefault: true },
  { name: 'rounded-xl', value: '12px', twClass: 'rounded-xl' },
  { name: 'rounded-full', value: '9999px', twClass: 'rounded-full', isBadgeShape: true },
]

export const AllRadii: Story = {
  render: () => (
    <div className="space-y-6">
      <p className="text-sm text-gray-400">
        The project default border radius is <strong>8px</strong>, applied via{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs">borderRadius.DEFAULT: &apos;8px&apos;</code> in{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs">tailwind.config.ts</code>. Both{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs">rounded</code> and{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs">rounded-lg</code> resolve to 8px.
      </p>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
        {radiusTokens.map(({ name, value, twClass, isProjectDefault, isBadgeShape }) => (
          <div key={name} className="flex flex-col items-start gap-2">
            <div
              className={`h-16 w-full bg-optimistic-blue ${twClass} ${
                isProjectDefault ? 'ring-2 ring-offset-2 ring-freedom-red' : ''
              }`}
            />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold font-display">
                <code>{name}</code>
                {isProjectDefault && (
                  <span className="ml-2 text-xs font-normal text-freedom-red font-display">
                    project default
                  </span>
                )}
                {isBadgeShape && (
                  <span className="ml-2 text-xs font-normal text-optimistic-blue font-display">
                    Badge shape
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-400">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const ProjectDefault: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        <code className="bg-gray-100 px-1 rounded-sm text-xs">rounded</code> and{' '}
        <code className="bg-gray-100 px-1 rounded-sm text-xs">rounded-lg</code> both produce 8px corners — the
        project&apos;s standard card and button radius.
      </p>
      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-20 w-40 bg-charles-blue rounded" />
          <code className="text-sm">rounded</code>
          <span className="text-xs text-gray-400">8px (config default)</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-20 w-40 bg-charles-blue rounded-lg" />
          <code className="text-sm">rounded-lg</code>
          <span className="text-xs text-gray-400">8px (Tailwind built-in)</span>
        </div>
      </div>
    </div>
  ),
}

export const PillShapeBadge: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-400">
        The <strong>Badge</strong> component uses <code className="bg-gray-100 px-1 rounded-sm text-xs">rounded-full</code>{' '}
        to create the pill shape.
      </p>
      <div className="flex items-center gap-4">
        <div className="h-7 px-3 flex items-center bg-optimistic-blue rounded-full">
          <span className="text-white text-xs font-display font-semibold">Repair</span>
        </div>
        <div className="h-7 px-3 flex items-center bg-freedom-red rounded-full">
          <span className="text-white text-xs font-display font-semibold">Donation</span>
        </div>
        <div className="h-7 px-3 flex items-center bg-charles-blue rounded-full">
          <span className="text-white text-xs font-display font-semibold">Lending</span>
        </div>
      </div>
      <p className="text-xs text-gray-400">
        Tailwind class: <code>rounded-full</code> → 9999px
      </p>
    </div>
  ),
}
