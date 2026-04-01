import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'
import type { IconName } from './Icon'

const iconNames: IconName[] = [
  'alert',
  'book',
  'building',
  'call',
  'cart',
  'clock',
  'community_centers',
  'food',
  'garden',
  'info',
  'location',
  'mail',
  'search',
  'trash_and_recycling',
]

const meta: Meta<typeof Icon> = {
  title: 'Design System/Icons',
  component: Icon,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    size: {
      control: 'number',
    },
  },
}

export default meta
type Story = StoryObj<typeof Icon>

export const Catalog: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-7">
      {iconNames.map((name) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon name={name} size={48} className="text-charles-blue" />
          <span className="text-center text-xs font-display text-gray-400 leading-tight">{name}</span>
        </div>
      ))}
    </div>
  ),
}

export const SingleIcon: Story = {
  args: {
    name: 'location',
    size: 48,
  },
}

export const ColorVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <Icon name="location" size={48} className="text-charles-blue" />
        <span className="text-xs font-display text-gray-400">charles-blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="location" size={48} className="text-optimistic-blue" />
        <span className="text-xs font-display text-gray-400">optimistic-blue</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="location" size={48} className="text-freedom-red" />
        <span className="text-xs font-display text-gray-400">freedom-red</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon name="location" size={48} className="text-gray-400" />
        <span className="text-xs font-display text-gray-400">gray-400</span>
      </div>
    </div>
  ),
}

export const SizeScale: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6 items-end">
      {[16, 24, 32, 48, 64, 96].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="building" size={size} className="text-charles-blue" />
          <span className="text-xs font-display text-gray-400">{size}px</span>
        </div>
      ))}
    </div>
  ),
}

export const WithAriaLabel: Story = {
  args: {
    name: 'alert',
    size: 48,
    'aria-label': 'Alert',
  },
}
