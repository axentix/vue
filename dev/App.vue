<template>
  <div id="app" class="layout with-sidenav fixed-sidenav">
    <header>
      <nav class="navbar primary"><span class="navbar-brand">Vue Axentix</span></nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true">
      <template v-slot:header> Test </template>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true" :right-aligned="true" :large="true">
      <template v-slot:header> Test </template>

      <div
        class="sidenav-link"
        :class="{ active: isCollapsibleOpened }"
        @click="isCollapsibleOpened = !isCollapsibleOpened"
      >
        Collapse
      </div>
      <ax-collapsible v-model="isCollapsibleOpened">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>
      <div
        class="sidenav-link"
        :class="{ active: isCollapsibleOpened2 }"
        @click="isCollapsibleOpened2 = !isCollapsibleOpened2"
      >
        Collapse
      </div>
      <ax-collapsible v-model="isCollapsibleOpened2">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>
    </ax-sidenav>

    <main class="m-5">
      <div class="d-flex fx-col">
        <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isSidenavOpened = !isSidenavOpened"
          >Toggle sidenav</ax-btn
        >
        <ax-btn
          class="airforce dark-2 rounded-1 shadow-1 mt-3"
          @click="isCollapsibleOpened3 = !isCollapsibleOpened3"
          >Toggle collapsible</ax-btn
        >
      </div>

      <ax-collapsible v-model="isCollapsibleOpened3">
        <p class="m-0 p-3 red">You can collapse me.</p>
      </ax-collapsible>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isSidenavOpened: false,
    isCollapsibleOpened: false,
    isCollapsibleOpened2: false,
    isCollapsibleOpened3: false,
  }),
  watch: {
    isSidenavOpened(state) {
      console.log(state);
    },
  },
};
</script>

<style lang="scss"></style>
