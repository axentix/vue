const path = require('path');

module.exports = {
  staticDirs: ['../public'],
  framework: '@storybook/vue',
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-postcss',
    '@whitespace/storybook-addon-html',
    'storybook-addon-pseudo-states',
    'storybook-dark-mode',
    'storybook-addon-turbo-build',
  ],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};
