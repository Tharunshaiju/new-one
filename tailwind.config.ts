import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'handwriting': ['"Dancing Script"', 'cursive'],
        'handwriting-fancy': ['"Great Vibes"', 'cursive'],
        'handwriting-bold': ['"Pacifico"', 'cursive'],
      },
      keyframes: {
        float: {
          '0%': { 
            transform: 'translateY(0) translateX(0)',
            opacity: '0'
          },
          '10%': { 
            opacity: '1'
          },
          '90%': { 
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(-100vh) translateX(20px)',
            opacity: '0'
          },
        },
        heartbeat: {
          '0%, 100%': { 
            transform: 'scale(1)',
          },
          '50%': { 
            transform: 'scale(1.05)',
          },
        },
        slideIn: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0'
          },
          '100%': { 
            opacity: '1'
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-1000px 0'
          },
          '100%': {
            backgroundPosition: '1000px 0'
          }
        }
      },
      animation: {
        float: 'float 8s ease-out forwards',
        heartbeat: 'heartbeat 2s ease-in-out infinite',
        slideIn: 'slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        fadeIn: 'fadeIn 0.8s ease-in',
        shimmer: 'shimmer 2s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
export default config;
