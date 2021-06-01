<template>
  <div id="app" class="layout with-sidenav fixed-sidenav">
    <header>
      <nav class="navbar primary"><span class="navbar-brand">Vue Axentix</span></nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" :fixed="true">
      <template v-slot:header> Test </template>

      <ax-sidenav-link :active="isCollapsibleOpened" @click="isCollapsibleOpened = !isCollapsibleOpened">
        Collapse
      </ax-sidenav-link>
      <ax-collapsible :auto-close="false" v-model="isCollapsibleOpened">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>
      <ax-sidenav-link :active="isCollapsibleOpened2" @click="isCollapsibleOpened2 = !isCollapsibleOpened2">
        Collapse
      </ax-sidenav-link>
      <ax-collapsible v-model="isCollapsibleOpened2">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>

      <ax-btn class="red" @click="isSidenavOpened = !isSidenavOpened">Toggle</ax-btn>
    </ax-sidenav>

    <main class="m-5">
      <ax-tooltip content="sidenav toggler">
        <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="isSidenavOpened = !isSidenavOpened"
          >Toggle sidenav</ax-btn
        >
      </ax-tooltip>

      <div class="mt-5"></div>

      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea
      quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur
      doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis
      distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium
      aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Architecto, officiis distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque
      consectetur praesentium aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea quidem laudantium earum
      ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur doloremque ad voluptates.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea
      quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur
      doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis
      distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium
      aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Architecto, officiis distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque
      consectetur praesentium aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea quidem laudantium earum
      ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur doloremque ad voluptates.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea
      quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur
      doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis
      distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium
      aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Architecto, officiis distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque
      consectetur praesentium aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea quidem laudantium earum
      ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur doloremque ad voluptates.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea
      quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur
      doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis
      distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium
      aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Architecto, officiis distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque
      consectetur praesentium aut. A atque tenetur doloremque ad voluptates. Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea quidem laudantium earum
      ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur doloremque ad voluptates.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis distinctio asperiores ea
      quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium aut. A atque tenetur
      doloremque ad voluptates. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto, officiis
      distinctio asperiores ea quidem laudantium earum ducimus mollitia eos modi atque consectetur praesentium
      aut. A atque tenetur doloremque ad voluptates.

      <ax-form material>
        <ax-form-select :items="items" v-model="selectedValue" label="Choisissez une option"></ax-form-select>

        <ax-form-select :items="items" multiple v-model="multipleSelectedValue"></ax-form-select>

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
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    isSidenavOpened: false,
    isCollapsibleOpened: false,
    isCollapsibleOpened2: true,
    radio: 'Yes',
    checked: true,
    items: ['Voiture', 'Moto', 'Bus', 'Velo', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    // items: [
    //   { name: 'Voiture', value: 'Voiture', disabled: false, selected: true },
    //   { name: 'Moto', value: 'Moto', disabled: false },
    // ],
    selectedValue: '',
    multipleSelectedValue: [],
  }),
  watch: {
    radio(val) {
      console.log('radio', val);
    },
    checked(state) {
      console.log('check', state);
    },
    selectedValue(val) {
      console.log('selected', val);
    },
    multipleSelectedValue(val) {
      console.log('multipleSelectedValue', val);
    },
  },
};
</script>

<style lang="scss"></style>
