// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import minimist from 'minimist';

import packageJson from '../package.json';

const esbrowserslist = fs
  .readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const babelPresetEnvConfig = require('../babel.config').presets.filter(
  (entry) => entry[0] === '@babel/preset-env'
)[0][1];

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const banner = `/*! VueAxentix version ${packageJson.version} | MIT License | https://github.com/axentix/vue */`;

const baseConfig = {
  input: 'src/index.js',
  output: {
    banner,
  },
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
        ],
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      resolve({
        extensions: ['.js', '.vue'],
      }),
      commonjs(),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};

const external = ['vue'];

const globals = {
  vue: 'Vue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'esm') {
  const esmConfig = {
    ...baseConfig,
    input: 'src/index.esm.js',
    external,
    output: {
      file: 'dist/vue-axentix.esm.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              ...babelPresetEnvConfig,
              targets: esbrowserslist,
            },
          ],
        ],
      }),
    ],
  };
  buildFormats.push(esmConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-axentix.cjs.js',
      format: 'cjs',
      name: 'VueAxentix',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-axentix.min.js',
      format: 'iife',
      name: 'VueAxentix',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
