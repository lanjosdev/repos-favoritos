/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  daisyui: {
    themes: [
      {
        mytheme: {
        
          "primary": "#1F75CB",
                  
          "secondary": "#f000b8",
                  
          "accent": "#1dcdbc",
                  
          "neutral": "#2b3440",
                  
          "base-100": "#ffffff",
                  
          "info": "#3abff8",
                  
          "success": "#36d399",
                  
          "warning": "#fbbd23",
                  
          "error": "#f87272",
        },
      },
    ],
  },
  plugins: [
    // require('flowbite/plugin'),
    require("daisyui")
  ],
}

