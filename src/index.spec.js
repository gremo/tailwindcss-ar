const expect = require('chai').expect;
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');

const generateCss = (pluginConfig = {}) => postcss(tailwindcss({
  corePlugins: false,
  plugins: [
    require('./index')
  ],
  ...pluginConfig,
})).process('@tailwind utilities', { from: undefined }).then(({ css }) => css);

describe('tailwindcss-ar', () => {
  it('classes aren\'t added when unconfigured', async () => {
    const cssOutput = await generateCss();

    expect(cssOutput).not.match(/^\.ar-/);
  });

  it('classes and default variants are added', async () => {
    const config = {
      theme: {
        screens: {
          sm: '640px',
        },
        aspectRatios: {
          'square': 1,
          '4-by-3': 4 / 3,
          '16/9': 16 / 9,
        },
      },
    };
    const expectedClasses = {
      'square': '.ar-square',
      '4-by-3': '.ar-4-by-3',
      '16/9': '.ar-16\\/9',
    };
    const expectedVariantClasses = {
      'square': '.sm\\:ar-square',
      '4-by-3': '.sm\\:ar-4-by-3',
      '16/9': '.sm\\:ar-16\\/9',
    };

    const cssOutput = await generateCss(config);

    Object.keys(config.theme.aspectRatios).forEach(modifier => {
      expect(cssOutput).to.contain(expectedClasses[modifier]);
      expect(cssOutput).to.contain(expectedVariantClasses[modifier]);
    });
  });

  it('variants can be changed', async () => {
    const config = {
      theme: {
        screens: {
          sm: '640px',
        },
        aspectRatios: {
          square: 1,
        },
      },
      variants: {
        aspectRatios: ['hover'],
      },
    };

    const cssOutput = await generateCss(config);

    expect(cssOutput).to.not.contain('.sm\\:ar-square');
    expect(cssOutput).to.contain('.hover\\:ar-square');
  });
});
