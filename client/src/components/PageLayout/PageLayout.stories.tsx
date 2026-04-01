import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageLayout } from './PageLayout'

const meta: Meta<typeof PageLayout> = {
  title: 'Design System/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'PageLayout is a max-width content container that provides consistent responsive horizontal padding across all pages. It constrains content to a readable line length on wide viewports and ensures comfortable spacing on mobile.',
      },
    },
  },
  argTypes: {
    children: {
      description: 'Page content rendered inside the max-width container.',
    },
  },
}

export default meta
type Story = StoryObj<typeof PageLayout>

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-bold text-charles-blue">
          Boston Circular Economy
        </h1>
        <p className="font-body text-gray-400 max-w-2xl">
          Find repair shops, donation centers, lending libraries, and other
          circular economy services near you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 h-32"
            />
          ))}
        </div>
      </div>
    ),
  },
}

export const NarrowContent: Story = {
  args: {
    children: (
      <div className="max-w-prose">
        <h2 className="font-display text-2xl font-bold text-charles-blue mb-4">
          About This Service
        </h2>
        <p className="font-body text-gray-400 leading-relaxed">
          Circular economy services help reduce waste by keeping goods in use
          longer. Browse our directory to find services in your neighborhood.
        </p>
      </div>
    ),
  },
}
