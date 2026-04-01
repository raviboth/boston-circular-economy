import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  createRouter,
  createMemoryHistory,
  RouterProvider,
  createRootRoute,
} from '@tanstack/react-router'
import { within, userEvent, expect } from 'storybook/test'
import { NavBar } from './NavBar'

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
]

function makeRouter(links: typeof defaultLinks) {
  const rootRoute = createRootRoute({
    component: () => <NavBar links={links} />,
  })
  return createRouter({ routeTree: rootRoute, history: createMemoryHistory() })
}

const meta: Meta<typeof NavBar> = {
  title: 'Design System/NavBar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Fixed header navigation bar with responsive design. Displays inline links on desktop (md+) and collapses to a slide-in mobile panel with an overlay on smaller screens.',
      },
    },
  },
  argTypes: {
    links: {
      description:
        'Array of navigation links, each with a `label` (display text) and `to` (route path).',
    },
  },
}

export default meta
type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  decorators: [
    (_Story, context) => {
      const router = makeRouter(context.args.links ?? defaultLinks)
      return <RouterProvider router={router} />
    },
  ],
  args: {
    links: defaultLinks,
  },
}

export const MobileView: Story = {
  decorators: [
    (_Story, context) => {
      const router = makeRouter(context.args.links ?? defaultLinks)
      return <RouterProvider router={router} />
    },
  ],
  args: {
    links: defaultLinks,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Open the mobile menu via the hamburger button
    const hamburger = canvas.getByRole('button', { name: 'Open menu' })
    await userEvent.click(hamburger)

    // Assert the mobile nav panel is visible (button becomes aria-expanded)
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true')

    // Click a nav link inside the mobile panel
    const mobileNav = canvas.getByRole('dialog', { name: 'Navigation menu' })
    const homeLink = within(mobileNav).getByRole('link', { name: 'Home' })
    await userEvent.click(homeLink)

    // Assert the panel has closed after link click
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false')
  },
}
