// clean-tailwind.ts
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  plugins: [
    typography(), // ✅ 先什么都不传
  ],
} satisfies Config