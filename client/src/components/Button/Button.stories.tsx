import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'Primary action element styled with Boston brand tokens. Supports three variants (primary, secondary, ghost) and three sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Find Services',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Learn More',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    children: 'Clear Filters',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Unavailable',
  },
}

export const ClickInteraction: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Click Me',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /click me/i })
    await userEvent.click(button)
    expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const DisabledInteraction: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    children: 'Unavailable',
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: /unavailable/i })
    await userEvent.click(button)
    expect(args.onClick).not.toHaveBeenCalled()
    expect(button).toBeDisabled()
  },
}

export const AllVariantsAndSizes: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <p className="font-display text-xs uppercase font-bold text-gray-400 tracking-wider">
            {variant}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <Button key={size} variant={variant} size={size}>
                {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
              </Button>
            ))}
            <Button variant={variant} size="md" disabled>
              Disabled
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
}
