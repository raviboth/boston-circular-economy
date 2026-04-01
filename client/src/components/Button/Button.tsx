import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantClasses = {
  primary:
    'bg-optimistic-blue text-white border-transparent hover:bg-blue-300 active:bg-charles-blue',
  secondary:
    'bg-transparent text-optimistic-blue border-optimistic-blue hover:bg-gray-100 active:bg-gray-200',
  ghost:
    'bg-transparent text-optimistic-blue border-transparent hover:bg-gray-100 active:bg-gray-200',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', disabled, children, className = '', ...rest }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[
          'inline-flex items-center justify-center',
          'font-display font-bold uppercase tracking-wide',
          'rounded-lg border',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-optimistic-blue focus-visible:ring-offset-2',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
