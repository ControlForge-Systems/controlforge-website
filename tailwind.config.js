/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#008CFF',
        'brand-navy': '#0A0F1F',
        'brand-gray': '#E0E0E0',
      }
    }
  },
  plugins: []
};
