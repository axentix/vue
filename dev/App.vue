<template>
  <div id="app" class="layout-sidenav-fixed">
    <header>
      <nav class="navbar primary">
        <span class="navbar-brand">Vue Axentix</span>
      </nav>
    </header>

    <ax-sidenav v-model="isSidenavOpened" class="airforce" fixed>
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
      <ax-dropdown class="mr-2" content-classes="white shadow-1">
        <template #trigger="{ trigger }">
          <ax-btn class="airforce dark-1 text-white rounded-1" @click="trigger">
            Dropdown without vmodel
          </ax-btn>
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
        <ax-tooltip position="bottom" content="sidenav toggler">
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

      <div class="d-flex mt-4">
        <ax-btn class="airforce dark-1 shadow-1 rounded-1 d-block" @click="validateForm">
          Validate form
        </ax-btn>
        <ax-btn class="meadow dark-3 shadow-1 rounded-1 d-block ml-2" @click="resetForm">Reset form</ax-btn>
      </div>

      <ax-form material ref="form">
        <ax-form-field label="Choisissez une option">
          <ax-form-autocomplete :items="items" v-model="selectedValue"></ax-form-autocomplete>
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
          <ax-form-control tag="textarea" v-model="test" lazy :rules="[rules.required]"></ax-form-control>
        </ax-form-field>

        <ax-form-field label="Select">
          <ax-form-control tag="select">
            <option value>1</option>
            <option value>2</option>
          </ax-form-control>
        </ax-form-field>

        <ax-form-field>
          <ax-form-control tag="textarea">rho</ax-form-control>
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

      <ax-data-table
        :headers="headers"
        :items="tableItems"
        :search="search"
        classes="hover"
        v-model="page"
        expandable
        single-expand
        pagination
        :total="tableTotal"
        @update:options="updateDatatable"
      >
        <template v-slot:[`item.actions`]="{ item }"> L'id est {{ item.id }} </template>

        <template v-slot:expanded-item="{ item }"> {{ item.name }} | <em>Soon</em> </template>
      </ax-data-table>

      <ax-dropdown v-model="isDropdownOpened" constrain-width content-classes="red light-4">
        <template #trigger>
          <ax-btn class="btn blue" @click="isDropdownOpened = !isDropdownOpened">Trigger dropdown</ax-btn>
        </template>

        <div class="dropdown-item">Hello</div>
        <div class="dropdown-item">Hello</div>
      </ax-dropdown>
      <div class="card">
        <ax-lightbox
          v-model="lightbox"
          caption="PGM WTF"
          responsive
          src="https://picsum.photos/1280/720?random=2"
        ></ax-lightbox>
      </div>
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
    tableTotal: 20,
    radio: 'Yes',
    checked: true,
    items: ['Voiture', 'Moto', 'Bus', 'Velo', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    // items: [],
    // items: [
    //   { name: 'Voiture', value: 0, disabled: false, selected: false },
    //   { name: 'Moto', value: 2, disabled: false },
    // ],
    selectedValue: '',
    multipleSelectedValue: [],
    test: 'hey',
    lightbox: false,
    page: 0,
    search: '',
    headers: [
      {
        text: 'ID',
        value: 'id',
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Test',
        value: 'test',
      },
      {
        text: 'Validated at',
        value: 'validated_at',
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
      },
    ],
    tableItems: [],
    fakeTableItems: [
      {
        id: 0,
        name: 'Huber Gilmore',
        test: true,
        validated_at: new Date('2018-06-11T09:40:17'),
      },
      {
        id: 1,
        name: 'Mayo Dickson',
        test: true,
        validated_at: new Date('2017-03-15T10:38:38'),
      },
      {
        id: 2,
        name: 'Augusta Butler',
        test: true,
        validated_at: new Date('2020-10-10T08:41:35'),
      },
      {
        id: 3,
        name: 'James Lewis',
        test: true,
        validated_at: new Date('2016-06-29T02:03:22'),
      },
      {
        id: 4,
        name: 'Jarvis Solis',
        test: false,
        validated_at: new Date('2014-04-26T05:48:25'),
      },
      {
        id: 5,
        name: 'Barker Donaldson',
        test: false,
        validated_at: new Date('2014-03-27T08:36:58'),
      },
      {
        id: 6,
        name: 'Clark Long',
        test: false,
        validated_at: new Date('2015-09-29T04:40:03'),
      },
      {
        id: 7,
        name: 'Theresa Kinney',
        test: false,
        validated_at: new Date('2018-09-29T09:11:48'),
      },
      {
        id: 8,
        name: 'Liliana Andrews',
        test: false,
        validated_at: new Date('2018-01-04T03:22:21'),
      },
      {
        id: 9,
        name: 'Boyer Decker',
        test: true,
        validated_at: new Date('2014-01-04T01:15:37'),
      },
      {
        id: 10,
        name: 'Villarreal Robinson',
        test: true,
        validated_at: new Date('2016-06-09T05:23:33'),
      },
      {
        id: 11,
        name: 'Greer Bolton',
        test: true,
        validated_at: new Date('2016-11-05T03:53:03'),
      },
      {
        id: 12,
        name: 'Camacho Emerson',
        test: true,
        validated_at: new Date('2014-08-11T09:03:19'),
      },
      {
        id: 13,
        name: 'Willie Myers',
        test: true,
        validated_at: new Date('2016-01-16T04:05:38'),
      },
      {
        id: 14,
        name: 'Koch Leonard',
        test: true,
        validated_at: new Date('2017-05-19T09:13:35'),
      },
      {
        id: 15,
        name: 'Espinoza Dennis',
        test: true,
        validated_at: new Date('2018-07-29T11:04:35'),
      },
      {
        id: 16,
        name: 'Latoya Rodgers',
        test: true,
        validated_at: new Date('2019-05-24T07:49:45'),
      },
      {
        id: 17,
        name: 'Pamela Castro',
        test: true,
        validated_at: new Date('2015-08-15T10:35:59'),
      },
      {
        id: 18,
        name: 'Karina Brock',
        test: true,
        validated_at: new Date('2021-02-10T12:20:45'),
      },
      {
        id: 19,
        name: 'Dale Hughes',
        test: true,
        validated_at: new Date('2020-04-01T07:14:28'),
      },
      {
        id: 20,
        name: 'Oscar White',
        test: true,
        validated_at: new Date('2020-04-01T07:14:28'),
      },
    ],
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
    resetForm() {
      this.selectedValue = '';
      console.log('reset', this.$refs.form.reset());
    },
    say() {
      console.log('hey');
    },
    updateDatatable(data) {
      console.log('update datatable', data);
      if (data.page === 2) {
        this.tableItems = this.fakeTableItems.slice(9, 20);
      } else this.tableItems = this.fakeTableItems;
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.multipleSelectedValue = ['Voiture'];
    //   setTimeout(() => {
    //     this.multipleSelectedValue = [];
    //     setTimeout(() => {
    //       this.multipleSelectedValue = ['Moto'];
    //     }, 1000);
    //   }, 1000);
    // }, 1000);

    setTimeout(() => {
      this.tableItems = this.fakeTableItems;
    }, 3000);
  },
};
</script>

<style lang="scss">
.pagination li {
  transition: none !important;
}
</style>
