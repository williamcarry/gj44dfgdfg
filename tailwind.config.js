/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './assets111111/**/*.vue'],
  theme: {
    container: { center: true, padding: '1rem', screens: { xl: '1200px', '2xl': '1500px' } },
    extend: {
      colors: {
        primary: '#CB261C',
        slate: {
          950: '#0b1220',
        },
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          '"Microsoft YaHei"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"'
        ],
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['18px', { lineHeight: '28px' }],
        xl: ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      spacing: {
        'px': '1px',
        '0': '0',
        '0.5': '2px',
        '1': '4px',
        '1.5': '6px',
        '2': '8px',
        '2.5': '10px',
        '3': '12px',
        '3.5': '14px',
        '4': '16px',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'html': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'font-feature-settings': '"kern" 1',
          'text-rendering': 'optimizeLegibility',
        },
        'body': {
          'font-family': theme('fontFamily.sans'),
          'line-height': '1.5',
          '-webkit-text-size-adjust': '100%',
          '-ms-text-size-adjust': '100%',
        },
        'input, textarea, select': {
          'font-family': 'inherit',
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          'appearance': 'none',
        },
        'button': {
          '-webkit-appearance': 'button',
          'cursor': 'pointer',
          'border': 'none',
          'background': 'transparent',
          'padding': '0',
          'font-family': 'inherit',
        },
        'input[type="checkbox"], input[type="radio"]': {
          '-webkit-appearance': 'checkbox',
          'appearance': 'checkbox',
          '-webkit-box-sizing': 'border-box',
          'box-sizing': 'border-box',
          'padding': '0',
        },
        'select': {
          'background': 'white url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%23333%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%3E") no-repeat right 8px center',
          'background-size': '16px 12px',
          'padding-right': '28px',
        },
      })
    }
  ],
  corePlugins: {
    preflight: true,
  },
  important: false,
  separator: ':',
  safelist: [
    {
      pattern: /^(bg|text|border|ring|shadow|divide|from|to|via)-(red|blue|green|yellow|purple|pink|gray|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|fuchsia|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    },
    {
      pattern: /^(w|h)-(0|1|2|3|4|5|6|7|8|9|10|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    },
    {
      pattern: /^p(x|y|t|r|b|l)?-(0|1|2|3|4|5|6|8|10|12|16|20|24)$/,
    },
    {
      pattern: /^m(x|y|t|r|b|l)?-(0|1|2|3|4|5|6|8|10|12|16|20|24|auto)$/,
    },
    {
      pattern: /^(flex|grid|block|inline|hidden)$/,
    },
  ],
}
