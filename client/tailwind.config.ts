import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'charles-blue': '#091F2F',
        'optimistic-blue': '#1871BD',
        'freedom-red': '#FB4D42',
        'blue-100': '#D6E8F7',
        'blue-200': '#A3C9EB',
        'blue-300': '#5C9FD4',
        'blue-400': '#2275B8',
        'gray-100': '#F2F2F2',
        'gray-200': '#D8D8D8',
        'gray-300': '#A7A9AC',
        'gray-400': '#58595B',
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
