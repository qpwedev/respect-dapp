import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mpink': '#F7AEF8',
        'spink': '#FDC5F5',
        'lavender': '#B388EB',
        'blue': '#8093F1',
      },
      fontFamily: {
        'zillah': ['"Zilla Slab Highlight"', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config


