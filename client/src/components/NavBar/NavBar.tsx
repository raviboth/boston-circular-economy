import { useState } from 'react'
import { Link } from '@tanstack/react-router'

interface NavLink {
  label: string
  to: string
}

interface NavBarProps {
  links: NavLink[]
}

export function NavBar({ links }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-charles-blue text-white">
        <div className="flex items-center justify-between px-6 h-14">
          <span className="font-display uppercase font-bold tracking-wide text-sm">
            Boston Circular Economy
          </span>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-sm font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors duration-150"
                activeProps={{ className: 'font-display text-sm font-semibold uppercase tracking-wide text-white' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden flex items-center justify-center w-9 h-9 text-white text-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1 focus-visible:ring-offset-charles-blue rounded"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav"
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        className={[
          'fixed top-14 right-0 bottom-0 z-40 w-64 bg-charles-blue text-white',
          'flex flex-col pt-4 px-6',
          'transform transition-transform duration-300 ease-in-out',
          'md:hidden',
          menuOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="font-display text-sm font-semibold uppercase tracking-wide py-3 border-b border-white/10 text-white/70 hover:text-white transition-colors duration-150"
            activeProps={{ className: 'font-display text-sm font-semibold uppercase tracking-wide py-3 border-b border-white/10 text-white' }}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-black/40 md:hidden"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}
