/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      // => @media (min-width: 475px) { ... }

      presm: '576px',
      // => @media (min-width: 576px) { ... }

      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lmg: '856px',
      // => @media (min-width: 856px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        main: ['Red Hat Display', 'sans-serif'],
        noto: ['Noto Sans Avestan', 'sans-serif'],
        didact: ['Didact Gothic', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%': {
            // box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
            transform: 'translatey(0px)',
          },
          '50%': {
            // box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
            transform: 'translatey(-20px)',
          },
          '100%': {
            // box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
            transform: 'translatey(0px)',
          },
        },
        'float-s': {
          '0%': {
            // box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
            transform: 'translatey(0px)',
          },
          '50%': {
            // box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
            transform: 'translatey(-5px)',
          },
          '100%': {
            // box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
            transform: 'translatey(0px)',
          },
        },
        'ping-s': {
          '0%': {
            transform: 'scale(1) translateX(-50%) translateY(-50%)',
            opacity: '1',
          },
          '7.5%, 10%': {
            transform: 'scale(2) translateX(-25%) translateY(-25%)',
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
      animation: {
        'float-8': 'float 8s ease-in-out infinite',
        'float-6': 'float 6s ease-in-out infinite',
        'float-4': 'float 4s ease-in-out infinite',
        'float-3': 'float 3s ease-in-out infinite',
        'float-2': 'float 2s ease-in-out infinite',
        'float-1': 'float 1s ease-in-out infinite',
        'float-s-8': 'float-s 8s ease-in-out infinite',
        'float-s-6': 'float-s 6s ease-in-out infinite',
        'float-s-4': 'float-s 4s ease-in-out infinite',
        'float-s-3': 'float-s 3s ease-in-out infinite',
        'float-s-2': 'float-s 2s ease-in-out infinite',
        'float-s-1': 'float-s 1s ease-in-out infinite',
        'spin-5': 'spin 5s linear infinite',
        'ping-once': 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards',
        'ping-s': 'ping-s 10s 10s cubic-bezier(0, 0, 0.2, 1) forwards infinite',
      },
      height: {
        main: 'calc(100vh - 3rem)',
      },
    },
  },
  plugins: [],
};
