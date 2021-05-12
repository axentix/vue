<template>
  <div id="app" class="container my-5">
    <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isSidenavOpened = !isSidenavOpened"
      >Toggle sidenav</ax-btn
    >

    <ax-sidenav v-model="isSidenavOpened" class="airforce">
      <template v-slot:header> Test </template>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>
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
