import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import postcss from 'postcss';
import cssnano from 'cssnano';
import shader from 'rollup-plugin-shader';
import sass from 'rollup-plugin-sass';
import closure from '@ampproject/rollup-plugin-closure-compiler';

var input = (path) => ({
  input: `resources/assets/scripts/${path}.js`,
  output: {
    file: `public/scripts/${path}.js`,
    format: 'iife',
    sourcemap: true,
  },
})

var main = {
  ...input('main'),
  plugins: [
    shader(),
    closure(),
    sass({
      output: 'public/styles/main.css',
      processor: (css) => postcss([autoprefixer, cssnano])
        .process(css)
        .then(
          (result) => result.css
        )
    })
  ]
}

var editor = {
  ...input('editor'),
  plugins: [
    closure()
  ]
}

export default [main, editor]
  