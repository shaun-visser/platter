import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue: {
          DEFAULT: '#3a649e',
        },
        gray: {
          300: '#f2f6f6',
          400: '#c5c5c5',
          DEFAULT: '#f0f0f0',
          600: '#f2f6f7',
          700: '#f2f2f2',
        },
        black: {
          DEFAULT: '#4d4d4d',
        },
        slate: {
          DEFAULT: '#fcfcfa',
        },
        green: {
          400: '#e2eced',
          DEFAULT: '#0f747e',
        },
        orange: {
          DEFAULT: '#f16a35',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
};
export default config;
