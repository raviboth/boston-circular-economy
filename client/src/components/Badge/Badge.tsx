const variantClasses: Record<string, string> = {
  repair: 'bg-blue-100 text-charles-blue',
  donation: 'bg-blue-200 text-white',
  lending: 'bg-blue-300 text-white',
  exchange: 'bg-gray-100 text-gray-400',
  'repair-cafe': 'bg-gray-200 text-charles-blue',
  alert: 'bg-freedom-red text-white',
}

type BadgeVariant = 'repair' | 'donation' | 'lending' | 'exchange' | 'repair-cafe' | 'alert'

interface BadgeProps {
  label: string
  variant: BadgeVariant
}

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-0.5 rounded-full text-xs font-display font-semibold uppercase tracking-wide ${variantClasses[variant]}`}
    >
      {label}
    </span>
  )
}
