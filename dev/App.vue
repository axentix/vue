<template>
  <div id="app" class="layout with-sidenav fixed-sidenav">
    <header>
      <nav class="navbar primary"><span class="navbar-brand">Vue Axentix</span></nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true">
      <template v-slot:header> Test </template>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>

    <main class="m-5">
      <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isSidenavOpened = !isSidenavOpened"
        >Toggle sidenav</ax-btn
      >

      <div class="mt-5"></div>

      <ax-form material>
        <ax-form-field label="Test input">
          <ax-form-control tag="input" type="text"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Select">
          <ax-form-control tag="select">
            <option value="">1</option>
            <option value="">2</option>
          </ax-form-control>
        </ax-form-field>

        <ax-form-field>
          <ax-form-control tag="textarea">Hey</ax-form-control>
        </ax-form-field>

        <ax-form-field>
          <ax-form-group>
            <span class="form-group-txt">@</span>
            <ax-form-control tag="input" type="text"></ax-form-control>
          </ax-form-group>
        </ax-form-field>

        <ax-form-file label="Upload" label-classes="btn red" multiple class="test"></ax-form-file>

        <ax-form-field>
          <ax-form-check type="radio" v-model="radio" name="yon" native-value="Yes">Yes</ax-form-check>
          <ax-form-check type="radio" v-model="radio" name="yon" full native-value="No">No</ax-form-check>
          <ax-form-check type="checkbox" v-model="checked">Ok</ax-form-check>
        </ax-form-field>

        <ax-form-field default>
          <ax-form-switch>
            <template v-slot:false-value> Off </template>
            On
          </ax-form-switch>
        </ax-form-field>
      </ax-form>

      <div class="mt-5"></div>

      <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isModalOpened = !isModalOpened"
        >Toggle modal</ax-btn
      >

      <ax-modal class="white rounded-1 shadow-1" v-model="isModalOpened">
        Hey guys

        <template v-slot:footer>
          <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isModal2Opened = !isModal2Opened"
            >Toggle modal 2</ax-btn
          >
        </template>
      </ax-modal>
      <ax-modal class="red rounded-1 shadow-1" v-model="isModal2Opened"> HOLA </ax-modal>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isSidenavOpened: false,
    radio: 'Yes',
    checked: true,
    isModalOpened: false,
    isModal2Opened: false,
  }),
  watch: {
    radio(val) {
      console.log('radio', val);
    },
    checked(state) {
      console.log('check', state);
    },
    isModalOpened(state) {
      console.log('modalOpened', state);
    },
  },
};
</script>

<style lang="scss"></style>
