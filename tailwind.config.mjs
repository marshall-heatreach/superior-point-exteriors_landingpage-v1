/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Primary brand color - Dark green for header and CTAs
        'sp-green': {
          DEFAULT: '#1a4d3a',
          '50': '#f0f9f6',
          '100': '#d1f0e5',
          '200': '#a3e1cb',
          '300': '#6dc9a8',
          '400': '#3aad85',
          '500': '#1a4d3a', // Main brand green
          '600': '#153d2e',
          '700': '#0f2d22',
          '800': '#0a1e16',
          '900': '#050f0b',
        },
        // Dark gray for section backgrounds - very dark, almost black
        'sp-dark-gray': {
          DEFAULT: '#1a1a1a',
          '50': '#f5f5f5',
          '100': '#e5e5e5',
          '200': '#cccccc',
          '300': '#b3b3b3',
          '400': '#999999',
          '500': '#808080',
          '600': '#666666',
          '700': '#4d4d4d',
          '800': '#333333',
          '900': '#1a1a1a', // Main dark gray - very dark for section backgrounds
        },
        // Light gray for subtle elements
        'sp-light-gray': '#4a4a4a',
      },
      // Spacing scale extracted from ThreeStepsSection
      spacing: {
        '5': '5px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '40': '40px',
        '341': '341px', // Max image width
      },
      // Typography scale extracted from ThreeStepsSection
      fontSize: {
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'step-name': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'step-number': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'step-number-mobile': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'heading': ['32px', { lineHeight: '1', fontWeight: '700' }],
      },
      // Custom breakpoint matching ThreeStepsSection
      screens: {
        'mobile': '480px',
      },
      // Box shadows extracted from ThreeStepsSection
      boxShadow: {
        'subtle': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      // Border widths
      borderWidth: {
        '2': '2px',
      },
      // Max widths
      maxWidth: {
        'image': '341px',
      },
      // Font families
      fontFamily: {
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

