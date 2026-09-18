/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A0E1F',
          900: '#0F1428',
          800: '#161B33',
          700: '#1F2640',
          600: '#2B3352',
          500: '#3D4770',
        },
        accent: {
          DEFAULT: '#1FBF8F',
          light: '#4FDDAE',
          dark: '#159A72',
          soft: '#E7FBF3',
        },
        ink: {
          900: '#0D1120',
          700: '#3A4256',
          500: '#6B7280',
          300: '#9CA3AF',
          100: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(13,17,32,0.04), 0 4px 16px rgba(13,17,32,0.06)',
        cardHover: '0 4px 12px rgba(13,17,32,0.08), 0 12px 32px rgba(13,17,32,0.10)',
      },
    },
  },
  plugins: [],
}
