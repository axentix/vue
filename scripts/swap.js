const { rename, existsSync } = require('fs');
const { join } = require('path');

const Vue2 = join(__dirname, '../node_modules/vue2');
const DefaultVue = join(__dirname, '../node_modules/vue');
const Vue3 = join(__dirname, '../node_modules/vue3');

const version = Number(process.argv[2]) || 3;

const move = (from, to) => {
  if (!existsSync(from)) return;

  rename(from, to, (err) => {
    if (err) console.error(`[Vue Axentix] ${err}`);
  });
};

const useVueVersion = (v) => {
  if (!existsSync(DefaultVue)) {
    if (v === 2 && existsSync(Vue3)) {
      move(Vue3, DefaultVue);
    } else {
      move(Vue2, DefaultVue);
    }

    console.log(`[Vue Axentix] Swapped to Vue ${v}`);
  }

  if (v === 3 && existsSync(Vue3)) {
    move(DefaultVue, Vue2);
    move(Vue3, DefaultVue);
  } else if (v === 2 && existsSync(Vue2)) {
    move(DefaultVue, Vue3);
    move(Vue2, DefaultVue);
  } else {
    console.log(`[Vue Axentix] Vue ${v} is already in use`);
  }
};

useVueVersion(version);
