const createPlugin = require('tailwindcss/plugin');

const defaultConfiguration = {
  theme: {
    aspectRatios: {}
  },
  variants: {
    aspectRatios: ['responsive']
  }
};

const plugin = ({ addUtilities, e, theme, variants }) => {
  const utilities = Object.entries(theme('aspectRatios'))
    .map(([modifier, ratio]) => ({
      [`.${e(`ar-${modifier}`)}`]: {
        '&::before': {
          'float': 'left',
          'margin-left': '-1px',
          // eslint-disable-next-line eqeqeq
          'padding-top': isNaN(parseFloat(ratio)) || 0 == ratio ? 0 : `${(1 / ratio) * 100}%`,
          'width': '1px',
          'height': 0,
          'content': '\'\'',
        },
        '&::after': {
          display: 'table',
          clear: 'both',
          content: '\'\'',
        },
      }
    }));

  addUtilities(utilities, variants('aspectRatios'));
};

module.exports = createPlugin(plugin, defaultConfiguration);
