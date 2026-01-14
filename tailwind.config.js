/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'forest': {
          dark: 'rgb(var(--color-forest-dark) / <alpha-value>)',
          medium: 'rgb(var(--color-forest-medium) / <alpha-value>)',
          light: 'rgb(var(--color-forest-light) / <alpha-value>)',
        },
        'parchment': {
          DEFAULT: 'rgb(var(--color-parchment) / <alpha-value>)',
          dark: 'rgb(var(--color-parchment-dark) / <alpha-value>)',
        },
        'gold': {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          dark: 'rgb(var(--color-gold-dark) / <alpha-value>)',
        },
        'error': {
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
        },
        'text': {
          dark: 'rgb(var(--color-text-dark) / <alpha-value>)',
          medium: 'rgb(var(--color-text-medium) / <alpha-value>)',
        },
        dark: {
          950: 'rgb(var(--color-ui-dark-950) / <alpha-value>)',
          900: 'rgb(var(--color-ui-dark-900) / <alpha-value>)',
          850: 'rgb(var(--color-ui-dark-850) / <alpha-value>)',
          800: 'rgb(var(--color-ui-dark-800) / <alpha-value>)',
          700: 'rgb(var(--color-ui-dark-700) / <alpha-value>)',
          600: 'rgb(var(--color-ui-dark-600) / <alpha-value>)',
          500: 'rgb(var(--color-ui-dark-500) / <alpha-value>)',
          400: 'rgb(var(--color-ui-dark-400) / <alpha-value>)',
        },
        'dark-border': {
          DEFAULT: 'rgb(var(--color-ui-border) / <alpha-value>)',
          light: 'rgb(var(--color-ui-border-light) / <alpha-value>)',
          lighter: 'rgb(var(--color-ui-border-lighter) / <alpha-value>)',
        },
        'worm': 'rgb(var(--color-worm) / <alpha-value>)',
        'olive': 'rgb(var(--color-olive) / <alpha-value>)',
        'lime': 'rgb(var(--color-lime) / <alpha-value>)',
        'poppy': 'rgb(var(--color-poppy) / <alpha-value>)',
        'lite-black': 'rgb(var(--color-lite-black) / <alpha-value>)',
        'dark-white': 'rgb(var(--color-dark-white) / <alpha-value>)',
        'dice-d4': 'rgb(var(--color-dice-d4) / <alpha-value>)',
        'dice-d6': 'rgb(var(--color-dice-d6) / <alpha-value>)',
        'dice-d8': 'rgb(var(--color-dice-d8) / <alpha-value>)',
        'dice-d10': 'rgb(var(--color-dice-d10) / <alpha-value>)',
        'dice-d12': 'rgb(var(--color-dice-d12) / <alpha-value>)',
        'dice-d20': 'rgb(var(--color-dice-d20) / <alpha-value>)',
        'dice-result': 'rgb(var(--color-dice-result) / <alpha-value>)',
        'dice-bg': 'rgb(var(--color-dice-bg) / <alpha-value>)',
        'tab-bg': 'rgb(var(--color-tab-bg) / <alpha-value>)',
        'tab-active': 'rgb(var(--color-tab-active) / <alpha-value>)',
        'tab-text-light': 'rgb(var(--color-tab-text-light) / <alpha-value>)',
        'tab-text-dark': 'rgb(var(--color-tab-text-dark) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
