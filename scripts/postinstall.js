const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const vue = require('vue');

const version = vue.version;
const isVue3 = +version.split('.')[0] === 3;

let v;
if (isVue3) {
  console.log('[Vue Axentix] Detected Vue 3, switch main entry to Vue 3');
  v = '3';
} else {
  console.log('[Vue Axentix] Detected Vue 2, switch main entry to Vue 2');
  v = '2';
}

pkg.main = `dist/vue${v}/vue-axentix.cjs.js`;
pkg.module = `dist/vue${v}/vue-axentix.esm.js`;
pkg.browser = `dist/vue${v}/vue-axentix.esm.js`;
pkg.unpkg = `dist/vue${v}/vue-axentix.min.js`;

fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(pkg, null, 2), {
  encoding: 'utf-8',
});
