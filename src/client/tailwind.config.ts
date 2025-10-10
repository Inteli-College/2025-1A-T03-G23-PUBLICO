import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#4A90E2', // Botão 'Publish' e outros elementos de destaque
        'brand-secondary': '#D4AF37', // Cor do material da pirâmide
        'base-100': '#FFFFFF',
        'base-200': '#F9FAFB', // Fundo dos painéis laterais
        'base-300': '#F3F4F6', // Bordas, divisórias
        'base-content': '#1F2937', // Texto principal
        'content-secondary': '#6B7280', // Texto secundário, placeholders
      },
    },
  },
  plugins: [],
}
export default config