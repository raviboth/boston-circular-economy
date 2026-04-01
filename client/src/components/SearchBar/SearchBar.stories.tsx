import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { SearchBar } from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Design System/SearchBar',
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component:
          'A debounced search input that delays calling `onChange` by 300ms after the user stops typing. Use it to trigger search queries without firing on every keystroke.',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: {
    placeholder: 'Search services…',
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('repair')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: {
    placeholder: 'Search services…',
  },
}

export const CustomPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
  args: {
    placeholder: 'Find a repair shop, donation center…',
  },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div className="space-y-4 p-6 max-w-lg">
        <SearchBar value={value} onChange={setValue} placeholder="Search services…" />
        {value && (
          <p className="font-body text-sm text-gray-400 italic">
            Searching for: <span className="text-charles-blue not-italic font-display">{value}</span>
          </p>
        )}
      </div>
    )
  },
}

export const TypingInteraction: Story = {
  render: () => {
    const [debouncedValue, setDebouncedValue] = useState('')
    return (
      <div className="space-y-4 p-6 max-w-lg">
        <SearchBar value="" onChange={setDebouncedValue} placeholder="Search services…" />
        <p data-testid="debounced-output" className="font-body text-sm text-gray-400 italic">
          {debouncedValue ? `Searching for: ${debouncedValue}` : 'Type to search…'}
        </p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox')
    await userEvent.type(input, 'repair')
    await waitFor(
      () => expect(canvas.getByTestId('debounced-output')).toHaveTextContent('repair'),
      { timeout: 1000 },
    )
  },
}

export const ClearInteraction: Story = {
  render: () => {
    const [debouncedValue, setDebouncedValue] = useState('')
    return (
      <div className="space-y-4 p-6 max-w-lg">
        <SearchBar value="" onChange={setDebouncedValue} placeholder="Search services…" />
        <p data-testid="debounced-output" className="font-body text-sm text-gray-400 italic">
          {debouncedValue !== '' ? `Searching for: ${debouncedValue}` : 'No search query'}
        </p>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox')
    await userEvent.type(input, 'repair')
    await waitFor(
      () => expect(canvas.getByTestId('debounced-output')).toHaveTextContent('repair'),
      { timeout: 1000 },
    )
    await userEvent.clear(input)
    await waitFor(
      () => expect(canvas.getByTestId('debounced-output')).toHaveTextContent('No search query'),
      { timeout: 1000 },
    )
  },
}
