/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/app/**/*.{js,ts,jsx,tsx,html}',
    './src/components/**/*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        // Core Colors
        background: 'var(--color-background)',
        'on-background': 'var(--color-on-background)',
        surface: 'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        primary: 'var(--color-primary)',
        'on-primary': 'var(--color-on-primary)',
        secondary: 'var(--color-secondary)',
        'on-secondary': 'var(--color-on-secondary)',
        tertiary: 'var(--color-tertiary)',
        'on-tertiary': 'var(--color-on-tertiary)',
        error: 'var(--color-error)',
        'on-error': 'var(--color-on-error)',

        // Containers
        'primary-container': 'var(--color-primary-container)',
        'on-primary-container': 'var(--color-on-primary-container)',
        'secondary-container': 'var(--color-secondary-container)',
        'on-secondary-container': 'var(--color-on-secondary-container)',
        'tertiary-container': 'var(--color-tertiary-container)',
        'on-tertiary-container': 'var(--color-on-tertiary-container)',
        'error-container': 'var(--color-error-container)',
        'on-error-container': 'var(--color-on-error-container)',

        // Surface Variants
        'surface-variant': 'var(--color-surface-variant)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        'surface-bright': 'var(--color-surface-bright)',
        'surface-dim': 'var(--color-surface-dim)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'surface-container-lowest': 'var(--color-surface-container-lowest)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',

        // Fixed Colors
        'primary-fixed': 'var(--color-primary-fixed)',
        'primary-fixed-dim': 'var(--color-primary-fixed-dim)',
        'on-primary-fixed': 'var(--color-on-primary-fixed)',
        'on-primary-fixed-variant': 'var(--color-on-primary-fixed-variant)',
        'secondary-fixed': 'var(--color-secondary-fixed)',
        'secondary-fixed-dim': 'var(--color-secondary-fixed-dim)',
        'on-secondary-fixed': 'var(--color-on-secondary-fixed)',
        'on-secondary-fixed-variant': 'var(--color-on-secondary-fixed-variant)',
        'tertiary-fixed': 'var(--color-tertiary-fixed)',
        'tertiary-fixed-dim': 'var(--color-tertiary-fixed-dim)',
        'on-tertiary-fixed': 'var(--color-on-tertiary-fixed)',
        'on-tertiary-fixed-variant': 'var(--color-on-tertiary-fixed-variant)',

        // Utilities
        outline: 'var(--color-outline)',
        'outline-variant': 'var(--color-outline-variant)',
        'inverse-surface': 'var(--color-inverse-surface)',
        'inverse-on-surface': 'var(--color-inverse-on-surface)',
        'inverse-primary': 'var(--color-inverse-primary)',
        'surface-tint': 'var(--color-surface-tint)',
      },
      fontFamily: {
        h1: ['var(--font-h1)'],
        h2: ['var(--font-h2)'],
        h3: ['var(--font-h3)'],
        'body-lg': ['var(--font-body-lg)'],
        'body-md': ['var(--font-body-md)'],
        'label-caps': ['var(--font-label-caps)'],
      },
      spacing: {
        unit: 'var(--spacing-unit)',
        xl: 'var(--spacing-xl)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        xs: 'var(--spacing-xs)',
        gutter: 'var(--spacing-gutter)',
        lg: 'var(--spacing-lg)',
        'container-margin': 'var(--spacing-container-margin)',
      }
    }
  },
  plugins: [],
}
