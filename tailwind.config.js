/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* gray-200 */
        input: "var(--color-input)", /* white */
        ring: "var(--color-ring)", /* blue-800 */
        background: "var(--color-background)", /* slate-50 */
        foreground: "var(--color-foreground)", /* gray-800 */
        primary: {
          DEFAULT: "var(--color-primary)", /* blue-800 */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* orange-500 */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* red-600 */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* slate-100 */
          foreground: "var(--color-muted-foreground)", /* gray-500 */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* emerald-500 */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* white */
          foreground: "var(--color-popover-foreground)", /* gray-800 */
        },
        card: {
          DEFAULT: "var(--color-card)", /* white */
          foreground: "var(--color-card-foreground)", /* gray-800 */
        },
        success: {
          DEFAULT: "var(--color-success)", /* emerald-600 */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-600 */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* red-600 */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'interactive': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        "micro-celebration": "micro-celebration 200ms ease-out",
        "fade-in": "fadeIn 150ms ease-out",
        "slide-in": "slideIn 200ms ease-out",
      },
      keyframes: {
        "micro-celebration": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        "fadeIn": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slideIn": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}