const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const vue = require('vue');

const version = vue.version;
const isVue2 = +version.split('.')[0] === 2;

let v;
if (isVue2) {
  console.log('[Vue Axentix] Detected Vue 2, switch main entry to Vue 2');
  v = '2';
} else {
  console.log('[Vue Axentix] Detected Vue 3, switch main entry to Vue 3');
  v = '3';
}

pkg.main = `dist/vue${v}/vue-axentix.cjs.js`;
pkg.module = `dist/vue${v}/vue-axentix.es.js`;
pkg.browser = `dist/vue${v}/vue-axentix.es.js`;
pkg.unpkg = `dist/vue${v}/vue-axentix.iife.js`;

fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(pkg, null, 2), {
  encoding: 'utf-8',
});
