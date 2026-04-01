import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Guidelines/Logo & Seals',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ─── Logo & Seal Usage ──────────────────────────────────────────────────────

export const Usage: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Intro Note */}
      <p className="font-body text-sm text-gray-400 italic border-l-2 border-gray-200 pl-4">
        No specific sizing, spacing, or construction rules are provided in the brand guidelines.
      </p>

      {/* City of Boston Logo */}
      <section className="rounded-lg border border-gray-200 p-6">
        <h3 className="font-display font-bold text-lg text-charles-blue mb-2">
          City of Boston Logo
        </h3>
        <div className="font-body text-sm space-y-2">
          <p>
            A bold letter B. Underlined.
          </p>
          <p>
            The philosophy behind the mark is simple: when something matters, we underline it.
            The logo conveys a friendly, human approach to city government -- approachable and
            direct rather than relying on the traditional authority of a formal seal.
          </p>
          <p className="text-gray-400">
            Use the logo as the primary identity across most communications and digital products.
          </p>
        </div>
      </section>

      {/* Digital Seal */}
      <section className="rounded-lg border border-gray-200 p-6">
        <h3 className="font-display font-bold text-lg text-charles-blue mb-2">
          Digital Seal
        </h3>
        <div className="font-body text-sm space-y-2">
          <p>
            Used in place of the official city seal on all digital properties. The digital seal
            was created specifically to work better at small sizes and on screens, where the fine
            detail of the official seal would be lost.
          </p>
          <p className="text-gray-400">
            Prefer the digital seal for websites, applications, social media, and any on-screen context.
          </p>
        </div>
      </section>

      {/* Official City Seal */}
      <section className="rounded-lg border border-gray-200 p-6">
        <h3 className="font-display font-bold text-lg text-charles-blue mb-2">
          Official City Seal
        </h3>
        <div className="font-body text-sm space-y-2">
          <p>
            The authority symbol of the City of Boston. Used on bills, official non-digital forms,
            and any context that requires formal governmental authority.
          </p>
          <p className="text-gray-400">
            Adopted in 1823, first published in 1827, and made official in 1914.
          </p>
        </div>
      </section>
    </div>
  ),
}
