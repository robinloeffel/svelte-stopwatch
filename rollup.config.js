import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const development = process.env.ROLLUP_WATCH === 'true';

export default {
  input: 'src/index.js',
  plugins: [
    development && eslint(),
    svelte({
      dev: development,
      css: css => {
        css.write('public/bundle.css', development);
      }
    }),
    resolve(),
    commonjs(),
    !development && terser({
      output: {
        comments: false
      }
    }),
    development && livereload('public'),
    development && serve({
      open: true,
      contentBase: 'public'
    })
  ].filter(plugin => plugin),
  output: {
    sourcemap: development,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  watch: {
    clearScreen: false
  }
};
