import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'charles-blue': '#091F2F',
        'optimistic-blue': '#1871BD',
        'freedom-red': '#FB4D42',
        'blue-100': '#51ACFF',
        'blue-200': '#45789C',
        'blue-300': '#0C2639',
        'blue-400': '#061622',
        'gray-100': '#F2F2F2',
        'gray-200': '#E0E0E0',
        'gray-300': '#D2D2D2',
        'gray-400': '#58585B',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Lora', 'serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
} satisfies Config
