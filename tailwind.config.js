/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        dark: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#D1D5DB',
            a: {
              color: '#60A5FA',
              '&:hover': {
                color: '#93C5FD',
              },
            },
            h1: {
              color: '#F3F4F6',
            },
            h2: {
              color: '#F3F4F6',
            },
            h3: {
              color: '#F3F4F6',
            },
            strong: {
              color: '#F3F4F6',
            },
            code: {
              color: '#F3F4F6',
            },
            blockquote: {
              color: '#D1D5DB',
              borderLeftColor: '#4B5563',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

