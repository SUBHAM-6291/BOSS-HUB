const config = {
  plugins: ["@tailwindcss/postcss"],
  theme: {
    extend: {
      screens: {
        'sm': '40rem',
        'md': '48rem',
        'lg': '64rem',
        'xl': '80rem',
        '2xl': '96rem',
      },
    },
  },
};

export default config;