<template>
  <div id="app">
    <header>
      <nav class="navbar primary">
        <span class="navbar-brand">Vue Axentix</span>
      </nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce">
      <template v-slot:header>Test</template>

      <ax-sidenav-link :active="isCollapsibleOpened" @click="isCollapsibleOpened = !isCollapsibleOpened"
        >Collapse</ax-sidenav-link
      >
      <ax-collapsible :auto-close="false" v-model="isCollapsibleOpened">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>
      <ax-sidenav-link :active="isCollapsibleOpened2" @click="isCollapsibleOpened2 = !isCollapsibleOpened2"
        >Collapse</ax-sidenav-link
      >
      <ax-collapsible v-model="isCollapsibleOpened2">
        <div class="sidenav-link">Link 1</div>
        <div class="sidenav-link">Link 2</div>
      </ax-collapsible>
    </ax-sidenav>

    <main class="m-5">
      <ax-btn circle class="grey dark-3 mr-2" size="small">&#9996;</ax-btn>
      <ax-btn circle press class="grey dark-3 mr-2">&#9996;</ax-btn>
      <ax-btn circle outline class="text-grey text-dark-3 mr-2" size="large">&#9996;</ax-btn>
      <ax-btn outline outline-invert class="text-red text-light-2 mr-2" size="large">Invert</ax-btn>
      <ax-btn outline outline-opening outline-invert class="text-red text-light-2" size="large"
        >Invert</ax-btn
      >
      <br />
      <div class="grix xs1 sm2">
        <div class>
          <ax-btn-group class="my-2" size="small">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
          <ax-btn-group class="mb-2">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
          <ax-btn-group size="large">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
        </div>
        <div class="d-flex">
          <ax-btn-group vertical class="mr-2" size="small">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
          <ax-btn-group vertical class="mr-2">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
          <ax-btn-group vertical size="large">
            <ax-btn class="airforce dark-1">1</ax-btn>
            <ax-btn class="airforce dark-1">2</ax-btn>
            <ax-btn class="airforce dark-1">3</ax-btn>
          </ax-btn-group>
        </div>
      </div>

      <!-- Dropdown -->
      <ax-dropdown
        class="mr-2"
        v-model="isDropdownOpened2"
        @click="isDropdownOpened2 = !isDropdownOpened2"
        content-classes="white shadow-1"
      >
        <template #trigger>
          <ax-btn class="airforce dark-1 text-white rounded-1">Dropdown</ax-btn>
        </template>
        <div class="dropdown-item">Dropdown-item</div>
        <div class="dropdown-item">Dropdown-item</div>
      </ax-dropdown>

      <ax-dropdown
        v-model="isDropdownOpened2"
        @click="isDropdownOpened2 = !isDropdownOpened2"
        content-classes="white shadow-1 dropdown-right"
      >
        <template #trigger>
          <ax-btn class="airforce dark-1 text-white rounded-1">Dropdown Right</ax-btn>
        </template>
        <div class="dropdown-item">Dropdown-item</div>
        <div class="dropdown-item">Dropdown-item</div>
      </ax-dropdown>

      <div class="d-flex" style="justify-content: flex-end">
        <ax-tooltip content="modal toggler">
          <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="modal = !modal">Toggle modal</ax-btn>
        </ax-tooltip>
        <ax-tooltip content="sidenav toggler">
          <ax-btn class="airforce dark-1 rounded-1 shadow-1 ml-2" @click="isSidenavOpened = !isSidenavOpened"
            >Toggle sidenav</ax-btn
          >
        </ax-tooltip>
      </div>

      <ax-modal class="white rounded-1 shadow-1" v-model="modal">
        <ax-form>
          <ax-form-field>
            <ax-form-control></ax-form-control>
          </ax-form-field>
        </ax-form>
        <ax-btn class="airforce dark-1 rounded-1 shadow-1" @click="modal2 = !modal2">Toggle modal 2</ax-btn>
      </ax-modal>
      <ax-modal class="white rounded-1 shadow-1" v-model="modal2">Hey</ax-modal>

      <div class="mt-5"></div>

      <ax-tab
        v-model="currentTab"
        class="shadow-1"
        full-width
        arrow
        prevClasses="shadow-1"
        nextClasses="shadow-1"
      >
        <template #left-arrow>&lsaquo;</template>

        <template #right-arrow>&rsaquo;</template>

        <template #menu>
          <ax-tab-link href="#tab1">Tab 1</ax-tab-link>
          <ax-tab-link href="#tab2">Tab 2</ax-tab-link>
          <ax-tab-link href="#tab3">Long tab content long tab content</ax-tab-link>
        </template>

        <ax-tab-item id="tab1">Content 1</ax-tab-item>
        <ax-tab-item id="tab2">Content 2</ax-tab-item>
        <ax-tab-item id="tab3">This is the 3rd content</ax-tab-item>
      </ax-tab>

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
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>City</th>
              <th>Country</th>
              <th>Car</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Paul</td>
              <td>24</td>
              <td>Paris</td>
              <td>France</td>
              <td>Mustang</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Patrick</td>
              <td>34</td>
              <td>Nice</td>
              <td>France</td>
              <td>Renault</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Robert</td>
              <td>62</td>
              <td>Limoges</td>
              <td>France</td>
              <td>
                <ax-tooltip content="test">
                  <span>Ferrari</span>
                </ax-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ax-btn class="airforce dark-1 shadow-1 rounded-1 d-block" @click="validateForm">Validate form</ax-btn>

      <ax-form material ref="form">
        <ax-form-field label="Choisissez une option">
          <ax-form-select :items="items" v-model="selectedValue"></ax-form-select>
        </ax-form-field>

        <!-- <ax-form-field>
          <ax-form-select
            :items="items"
            multiple
            v-model="multipleSelectedValue"
            single-line
            chips
            chips-closable
          >
            <template #prepend="{ toggle }">
              <div @click.prevent="selectAll(toggle)" class="form-select-item">Select all</div>
            </template>
          </ax-form-select>
        </ax-form-field> -->

        <ax-form-field label="Toto">
          <ax-form-autocomplete
            :items="items"
            :rules="[rules.autocomplete]"
            multiple
            chips
            chips-closable
            v-model="multipleSelectedValue"
          >
            <template #prepend="{ toggle }">
              <div @click.prevent="selectAll(toggle)" class="form-select-item">Select all</div>
            </template>
          </ax-form-autocomplete>
        </ax-form-field>

        <ax-form-field label="Test input">
          <ax-form-control tag="input" type="text" :rules="[rules.required]"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Select">
          <ax-form-control tag="select">
            <option value>1</option>
            <option value>2</option>
          </ax-form-control>
        </ax-form-field>

        <ax-form-field>
          <ax-form-control tag="textarea">Hey</ax-form-control>
        </ax-form-field>

        <ax-form-field>
          <ax-form-group>
            <ax-form-control tag="input" type="text"></ax-form-control>
            <span class="form-group-item">@</span>
          </ax-form-group>
        </ax-form-field>

        <ax-form-file label="Upload" label-classes="btn red" multiple class="test"></ax-form-file>

        <ax-form-field>
          <ax-form-check type="radio" v-model="radio" name="yon" native-value="Yes">Yes</ax-form-check>
          <ax-form-check type="radio" v-model="radio" name="yon" full native-value="No">No</ax-form-check>
          <ax-form-check type="checkbox" v-model="checked" @click.native="say">Ok</ax-form-check>
        </ax-form-field>

        <ax-form-field default>
          <ax-form-switch>
            <template v-slot:false-value>Off</template>
            On
          </ax-form-switch>
        </ax-form-field>
      </ax-form>

      <ax-pagination :max-visible="maxVisible" v-model="current" :total="15" :per-page="1">
        <template #first-arrow="{ goto, isDisabled }">
          <li
            class="txt-blue arrow pb-1 grey light-4 bd-solid bd-1 bd-grey bd-light-3"
            :class="{ disabled: isDisabled }"
            @click="goto(1)"
          >
            <a>&#8592;</a>
          </li>
        </template>

        <template #prev-arrow="{ prev, isDisabled }">
          <li
            class="txt-blue grey light-4 bd-solid bd-1 bd-grey bd-light-3"
            :class="{ disabled: isDisabled }"
            @click="prev"
          >
            <a>prev</a>
          </li>
        </template>

        <template #default="{ pageNumber, goto, isActive }">
          <li
            :class="isActive ? 'active' : 'grey light-4 bd-solid bd-1 bd-grey bd-light-3'"
            @click="goto(pageNumber)"
          >
            <a>{{ pageNumber }}</a>
          </li>
        </template>

        <template #next-arrow="{ next, isDisabled }">
          <li
            class="txt-blue grey light-4 bd-solid bd-1 bd-grey bd-light-3"
            :class="{ disabled: isDisabled }"
            @click="next"
          >
            <a>next</a>
          </li>
        </template>

        <template #last-arrow="{ goto, pageCount, isDisabled }">
          <li
            class="arrow txt-blue pb-1 grey light-4 bd-solid bd-1 bd-grey bd-light-3"
            :class="{ disabled: isDisabled }"
            @click="goto(pageCount)"
          >
            <a>&#8594;</a>
          </li>
        </template>
      </ax-pagination>
      <ax-dropdown v-model="isDropdownOpened" constrain-width content-classes="red light-4">
        <template #trigger>
          <ax-btn class="btn blue" @click="isDropdownOpened = !isDropdownOpened">Trigger dropdown</ax-btn>
        </template>

        <div class="dropdown-item">Hello</div>
        <div class="dropdown-item">Hello</div>
      </ax-dropdown>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    currentTab: null,
    rules: {
      required: (value) => !!value || 'Required.',
      autocomplete: (v) => v.length > 0 || 'Required.',
    },
    modal: false,
    modal2: false,
    isSidenavOpened: false,
    isCollapsibleOpened: false,
    isCollapsibleOpened2: true,
    isDropdownOpened: false,
    isDropdownOpened2: false,
    current: 4,
    maxVisible: 5,
    radio: 'Yes',
    checked: true,
    items: ['Voiture', 'Moto', 'Bus', 'Velo', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    // items: [],
    // items: [
    //   { name: 'Voiture', value: 'voiture', disabled: false, selected: true },
    //   { name: 'Moto', value: 'moto', disabled: false },
    // ],
    selectedValue: '',
    multipleSelectedValue: [],
    test: '',
  }),
  watch: {
    currentTab(val) {
      console.log('currentTab', val);
    },
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
  methods: {
    selectAll(toggle) {
      this.multipleSelectedValue = this.multipleSelectedValue.length > 0 ? [] : this.items;
      console.log(this.multipleSelectedValue);
      toggle(false);
    },
    validateForm() {
      console.log('validate', this.$refs.form.validate());
    },
    say() {
      console.log('hey');
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.multipleSelectedValue.push('Voiture');
    //   setTimeout(() => {
    //     this.multipleSelectedValue = [];
    //     setTimeout(() => {
    //       this.multipleSelectedValue = ['Moto'];
    //     }, 1000);
    //   }, 1000);
    // }, 1000);
  },
};
</script>

<style lang="scss">
.pagination li {
  transition: none !important;
}
</style>
