import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold font-display text-charles-blue">Boston Circular Economy</h1>
      <p className="mt-2 font-body text-gray-400">Welcome to the Boston Circular Economy project.</p>
    </main>
  )
}
