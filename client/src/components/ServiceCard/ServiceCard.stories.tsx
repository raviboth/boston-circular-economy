import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ServiceCard } from './ServiceCard'

const meta: Meta<typeof ServiceCard> = {
  title: 'Design System/ServiceCard',
  component: ServiceCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An expandable service detail card that displays a circular economy service location. Shows the service name, type badges, location, and hours in the collapsed state; clicking or pressing Enter/Space reveals the full description.',
      },
    },
  },
  argTypes: {
    name: { control: 'text' },
    serviceTypes: { control: 'object' },
    location: { control: 'text' },
    hours: { control: 'text' },
    description: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ServiceCard>

const repairShopArgs = {
  name: 'Fenway Community Repair Cafe',
  serviceTypes: ['repair', 'repair-cafe'],
  location: '1282 Boylston St, Boston, MA 02215',
  hours: 'Sat 10am–2pm',
  description:
    'A volunteer-run repair cafe where skilled fixers help you repair broken household items, electronics, clothing, and more. No appointment needed — just bring your broken item and learn to fix it yourself.',
}

export const Collapsed: Story = {
  args: repairShopArgs,
}

export const Expanded: Story = {
  args: repairShopArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('button')
    await userEvent.click(card)
    await expect(
      canvas.getByText(
        'A volunteer-run repair cafe where skilled fixers help you repair broken household items, electronics, clothing, and more. No appointment needed — just bring your broken item and learn to fix it yourself.',
      ),
    ).toBeVisible()
  },
}

export const KeyboardExpand: Story = {
  args: repairShopArgs,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const card = canvas.getByRole('button')
    card.focus()
    await userEvent.keyboard('{Enter}')
    await expect(
      canvas.getByText(
        'A volunteer-run repair cafe where skilled fixers help you repair broken household items, electronics, clothing, and more. No appointment needed — just bring your broken item and learn to fix it yourself.',
      ),
    ).toBeVisible()
  },
}

export const DonationCenter: Story = {
  args: {
    name: 'South End Donation Hub',
    serviceTypes: ['donation', 'exchange'],
    location: '700 Harrison Ave, Boston, MA 02118',
    hours: 'Mon–Fri 9am–5pm, Sat 10am–3pm',
    description:
      'Drop off gently used clothing, housewares, and furniture. Items are redistributed to families in need across the Greater Boston area. Free exchange table available — take what you need, leave what you can.',
  },
}

export const LendingLibrary: Story = {
  args: {
    name: 'Jamaica Plain Tool Library',
    serviceTypes: ['lending'],
    location: '301 Centre St, Jamaica Plain, MA 02130',
    hours: 'Tue & Thu 4–7pm, Sat 10am–2pm',
    description:
      'Borrow tools, kitchen equipment, camping gear, and more with a free JP resident membership. Over 2,000 items available for weekly loan. Reduces unnecessary purchases and storage for neighborhood residents.',
  },
}

export const MultipleServices: Story = {
  args: {
    name: 'Roxbury Resource Center',
    serviceTypes: ['repair', 'donation', 'lending', 'exchange'],
    location: '2010 Washington St, Roxbury, MA 02119',
    hours: 'Mon–Sat 8am–6pm',
    description:
      'A comprehensive circular economy hub offering repair workshops, donation drop-off, tool lending, and a free exchange marketplace. Community events every second Saturday.',
  },
}
