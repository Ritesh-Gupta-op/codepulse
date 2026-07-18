/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f7f5f2',
          100: '#eee7dd',
          200: '#d8cab8',
          300: '#c1ad8f',
          400: '#aa8f6a',
          500: '#8f6f4f',
          600: '#71563e',
          700: '#563f2e',
          800: '#35271d',
          900: '#19120d'
        },
        pulse: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34, 211, 238, 0.12), 0 24px 80px rgba(2, 6, 23, 0.35)'
      },
      backgroundImage: {
        'radial-grid': 'radial-gradient(circle at top, rgba(34,211,238,0.18), transparent 45%), linear-gradient(180deg, rgba(15,23,42,0.94), rgba(2,6,23,1))'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
