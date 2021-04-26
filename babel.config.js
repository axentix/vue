const devPresets = ['@vue/cli-plugin-babel/preset'];
const buildPresets = [['@babel/preset-env', {}]];

module.exports = {
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets,
};
