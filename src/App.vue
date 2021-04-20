<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ax-btn>Hey</ax-btn>
  </div>
</template>

<script>
import AxBtn from './components/Button.vue';

export default {
  name: 'App',
  components: {
    AxBtn,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
