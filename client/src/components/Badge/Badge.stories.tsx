import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Design System/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pill-shaped labels that identify the service type of a circular economy listing (e.g. Repair, Donation, Lending). Badges are static display components — they carry no interactive behavior.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['repair', 'donation', 'lending', 'exchange', 'repair-cafe', 'alert'],
    },
    label: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Repair: Story = {
  args: { label: 'Repair', variant: 'repair' },
}

export const Donation: Story = {
  args: { label: 'Donation', variant: 'donation' },
}

export const Lending: Story = {
  args: { label: 'Lending', variant: 'lending' },
}

export const Exchange: Story = {
  args: { label: 'Exchange', variant: 'exchange' },
}

export const RepairCafe: Story = {
  args: { label: 'Repair Cafe', variant: 'repair-cafe' },
}

export const Alert: Story = {
  args: { label: 'Alert', variant: 'alert' },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge label="Repair" variant="repair" />
      <Badge label="Donation" variant="donation" />
      <Badge label="Lending" variant="lending" />
      <Badge label="Exchange" variant="exchange" />
      <Badge label="Repair Cafe" variant="repair-cafe" />
      <Badge label="Alert" variant="alert" />
    </div>
  ),
}
