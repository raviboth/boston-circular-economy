import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Design System/Guidelines/Photography',
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj

// ─── Photography Guidelines ─────────────────────────────────────────────────

export const Guidelines: Story = {
  render: () => (
    <div className="space-y-10">
      {/* People / Candid Photos */}
      <section>
        <h2 className="font-display font-bold text-lg text-charles-blue mb-3">
          People / Candid Photos
        </h2>
        <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
          <li>Candid and up-close, real and genuine</li>
          <li>
            <em>
              "Don't use models. Don't use stock. And don't ask anyone to pose."
            </em>
          </li>
          <li>Wide angles, lower vantage points, interesting focal points</li>
          <li>No selfies, avoid eye-level shooting (looks like stock)</li>
          <li>Can imply human presence without actual people</li>
        </ul>
      </section>

      {/* Headshots */}
      <section>
        <h2 className="font-display font-bold text-lg text-charles-blue mb-3">
          Headshots
        </h2>
        <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
          <li>Always cropped to a circle</li>
          <li>Distinguishes formal photos from candid shots</li>
          <li>Establish consistent style for team cohesion</li>
        </ul>
      </section>

      {/* Skylines */}
      <section>
        <h2 className="font-display font-bold text-lg text-charles-blue mb-3">
          Skylines
        </h2>
        <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
          <li>
            <em>"Nothing more optimistic than a city's skyline"</em>
          </li>
          <li>Unusual, atypical perspectives</li>
          <li>
            <em>"If it looks like it could be in a tour book, throw it away!"</em>
          </li>
        </ul>
      </section>

      {/* Landmarks */}
      <section>
        <h2 className="font-display font-bold text-lg text-charles-blue mb-3">
          Landmarks
        </h2>
        <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
          <li>Show city in iconic light with human perspective</li>
          <li>
            <em>"Zoom in and crop to create a bold statement"</em>
          </li>
          <li>Ground-level, not aerial</li>
        </ul>
      </section>

      {/* Photo Treatments */}
      <section>
        <h2 className="font-display font-bold text-lg text-charles-blue mb-3">
          Photo Treatments
        </h2>
        <ul className="list-disc list-inside font-body text-sm text-charles-blue space-y-1">
          <li>Full color</li>
          <li>Blue overlay with type</li>
        </ul>
      </section>

      <p className="text-gray-400 font-body text-sm mt-6">
        Photography should always feel authentic to Boston. Avoid generic imagery
        that could represent any city.
      </p>
    </div>
  ),
}
