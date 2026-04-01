import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Guidelines/Brand Voice',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ─── Brand Voice Attributes ─────────────────────────────────────────────────

interface VoiceAttribute {
  name: string
  quote: string
  rules: string[]
}

const voiceAttributes: VoiceAttribute[] = [
  {
    name: 'Confident',
    quote: 'Make strong statements, not questions.',
    rules: [
      'Be direct and to-the-point.',
      'The words "if, maybe, but, may, could" don\'t live in our vocabulary.',
      'Use fewer adjectives and shorter sentences. Cut the fluff.',
      'Favor full stops over commas.',
    ],
  },
  {
    name: 'Helpful',
    quote: 'Make things easier and simpler for our citizens.',
    rules: [
      'Content must be useful above all else.',
      'Write in language that is easy to understand.',
      'Keep information relevant to the audience.',
    ],
  },
  {
    name: 'Optimistic',
    quote: 'Anything is possible in our world.',
    rules: [
      'If there is a problem, we can fix it with ingenuity.',
      'Problems must always be accompanied by a plan of action.',
      'Frame challenges as opportunities.',
    ],
  },
  {
    name: 'Humble',
    quote: 'Confident, but never arrogant.',
    rules: [
      'Use simple words. Avoid multiple syllables when a shorter word works.',
      'Maintain superb grammar at all times.',
      'Avoid verbosity or exaggeration.',
    ],
  },
  {
    name: 'Personal',
    quote: 'Use "we" and "you."',
    rules: [
      'Be honest, real, approachable, accessible, and inclusive.',
      'Serve individual citizens, not abstract audiences.',
      'Avoid slang or an overly conversational tone in authority contexts.',
    ],
  },
]

export const CoreAttributes: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h1 className="font-display font-bold text-2xl uppercase tracking-widest text-charles-blue mb-2">
          Brand Voice
        </h1>
        <p className="font-body text-sm text-gray-400 max-w-xl">
          These five attributes define how Boston communicates. Every piece of
          content we produce should reflect all five working together.
        </p>
      </section>

      {voiceAttributes.map((attr) => (
        <section
          key={attr.name}
          className="border-b border-gray-200 pb-6 last:border-b-0"
        >
          <h2 className="font-display font-bold text-lg text-charles-blue mb-1">
            {attr.name}
          </h2>
          <p className="font-body text-sm italic text-gray-400 mb-3">
            {attr.quote}
          </p>
          <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
            {attr.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  ),
}
