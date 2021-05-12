<template>
  <div id="app" class="layout with-sidenav fixed-sidenav">
    <header>
      <nav class="navbar primary"><span class="navbar-brand">Hey tocard</span></nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true">
      <template v-slot:header> Test </template>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true" :right-aligned="true" :large="true">
      <template v-slot:header> Test </template>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>

    <main class="m-5">
      <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isSidenavOpened = !isSidenavOpened"
        >Toggle sidenav</ax-btn
      >
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isSidenavOpened: false,
  }),
  watch: {
    isSidenavOpened(state) {
      console.log(state);
    },
  },
};
</script>

<style lang="scss"></style>
