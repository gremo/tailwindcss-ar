<!-- markdownlint-disable no-inline-html -->
<p align="center">
  <a href="https://tailwindcss.com/"><img src="https://user-images.githubusercontent.com/1532616/84816157-5b8ca580-b014-11ea-9102-574c70528838.png" alt="Tailwind CSS Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tailwindcss-ar"><img src="https://img.shields.io/npm/v/tailwindcss-ar.svg" alt="NPM version" /></a>
  <a href="https://www.npmjs.com/package/tailwindcss-ar"><img src="https://img.shields.io/npm/dw/tailwindcss-ar.svg" alt="NPM downloads" /></a>
  <a href="https://travis-ci.org/gremo/tailwindcss-ar"><img src="https://travis-ci.org/gremo/tailwindcss-ar.svg?branch=master" alt="Travis build" /></a>
  <a href="https://travis-ci.org/gremo/tailwindcss-ar"><img src="https://img.shields.io/github/issues/gremo/tailwindcss-ar.svg" alt="GitHub issues" /></a>
  <a href="https://david-dm.org/gremo/tailwindcss-ar"><img src="https://img.shields.io/david/gremo/tailwindcss-ar.svg" alt="dependencies status"></a>
  <a href="https://david-dm.org/gremo/tailwindcss-ar?type=dev"><img src="https://david-dm.org/gremo/tailwindcss-ar/dev-status.svg" alt="devDependencies status" /></a>
</p>
<!-- markdownlint-restore -->

# tailwindcss-ar

An aspect ratio plugin for Tailwind CSS, based on the [https://css-tricks.com/aspect-ratio-boxes/](https://css-tricks.com/aspect-ratio-boxes/), using the pseudo-element technique.

Inspired by the [webdna/tailwindcss-aspect-ratio](https://github.com/webdna/tailwindcss-aspect-ratio) plugin and improved: no runtime dependencies (plain JavaScript), no need for empty elements because content goes *inside* the box itself.

## Quick start

```bash
npm install --save tailwindcss-ar
```

In your `tailwind.config.js` import the plugin using `require('tailwindcss-ar')` and define ratios under the `theme.aspectRatios` object. This object must provide suffixes for the `.ar-` class as *keys*, and box ratios (expressed as numbers) as *values*:

```javascript
module.exports = {
  theme: {
    // ...
    aspectRatios: {
      'square': 1,
      '4-by-3': 4 / 3,
      '16/9': 16 / 9
    },
  },
  // ...
  plugins: [
    require('tailwindcss-ar')
  ],
}
```

 By default, only the `responsive` variant is enabled. Variants can be changed under the `variants.aspectRatios` array:

```javascript
module.exports = {
  variants: {
    aspectRatios: ['responsive', 'hover'],
  },
  // ...
}
```

## Usage

Use the class`.ar-<suffix>` class to shape any element with the given aspect ratio:

```html
<div class="w-64 bg-gray-300 ar-16/9">
  Your content here.
</div>
```

The ratio box is "safe", if the content exceeds the height, it will grow as necessary.
