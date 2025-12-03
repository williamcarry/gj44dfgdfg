export default {
  plugins: {
    'postcss-preset-env': {
      stage: 2,
      features: {
        'custom-properties': false,
      },
      browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'ie 11', 'Chrome > 50'],
    },
    'tailwindcss': {},
    'autoprefixer': {
      overrideBrowserslist: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead', 'ie 11', 'Chrome > 50'],
    },
  },
}
