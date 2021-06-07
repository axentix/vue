import AxPagination from './Pagination.vue';

export default {
  title: 'Axentix/Components/Pagination',
  component: AxPagination,
  argTypes: {
    value: { control: { type: 'number' }, defaultValue: 1 },
    size: {
      control: { type: 'select', options: ['', 'small', 'large'] },
    },
    total: {
      control: { type: 'number' },
      defaultValue: 10,
    },
    perPage: {
      control: { type: 'number' },
      defaultValue: 1,
    },
    maxVisible: 0,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxPagination },
  template: '<ax-pagination v-bind="$props" v-model="value"></ax-pagination>',
});

export const Normal = Template.bind({});
Normal.args = {};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
};

export const maxVisible = Template.bind({});
maxVisible.args = {
  maxVisible: 5,
};

const ArrowTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxPagination },
  template: `<ax-pagination v-bind="$props" v-model="value">
    <template #first-arrow="{ goto, isDisabled }">
      <li class="txt-blue arrow pb-1" :class="{ disabled: isDisabled }" @click="goto(1)"><a>&#8592;</a></li>
    </template>

    <template #prev-arrow="{ prev, isDisabled }">
      <li class="txt-blue" :class="{ disabled: isDisabled }" @click="prev"><a>prev</a></li>
    </template>

    <template #next-arrow="{ next, isDisabled }">
      <li class="txt-blue" :class="{ disabled: isDisabled }" @click="next"><a>next</a></li>
    </template>

    <template #last-arrow="{ goto, pageCount, isDisabled }">
      <li class="arrow txt-blue pb-1" :class="{ disabled: isDisabled }" @click="goto(pageCount)"><a>&#8594;</a></li>
    </template>
  </ax-pagination>`,
});

export const customArrows = ArrowTemplate.bind({});
customArrows.args = {};

const ItemsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxPagination },
  template: `<ax-pagination v-bind="$props" v-model="value">
    <template #default="{ pageNumber, goto, isActive }">
      <li :class="isActive ? 'active' : 'grey light-4 bd-solid bd-1 bd-grey bd-light-3'" @click="goto(pageNumber)">
        <a> {{ pageNumber }} </a>
      </li>
    </template>
  </ax-pagination>`,
});

export const customItems = ItemsTemplate.bind({});
customItems.args = {};

const TotallyCustom = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxPagination },
  template: `<ax-pagination v-bind="$props" v-model="value">
    <template #first-arrow="{ goto, isDisabled }">
      <li class="txt-blue arrow pb-1 grey light-4 bd-solid bd-1 bd-grey bd-light-3" :class="{ disabled: isDisabled }" @click="goto(1)"><a>&#8592;</a></li>
    </template>

    <template #prev-arrow="{ prev, isDisabled }">
      <li class="txt-blue grey light-4 bd-solid bd-1 bd-grey bd-light-3" :class="{ disabled: isDisabled }" @click="prev"><a>prev</a></li>
    </template>

    <template #default="{ pageNumber, goto, isActive }">
      <li :class="isActive ? 'active' : 'grey light-4 bd-solid bd-1 bd-grey bd-light-3'" @click="goto(pageNumber)">
        <a> {{ pageNumber }} </a>
      </li>
    </template>

    <template #next-arrow="{ next, isDisabled }">
      <li class="txt-blue grey light-4 bd-solid bd-1 bd-grey bd-light-3" :class="{ disabled: isDisabled }" @click="next"><a>next</a></li>
    </template>

    <template #last-arrow="{ goto, pageCount, isDisabled }">
      <li class="arrow txt-blue pb-1 grey light-4 bd-solid bd-1 bd-grey bd-light-3" :class="{ disabled: isDisabled }" @click="goto(pageCount)"><a>&#8594;</a></li>
    </template>
  </ax-pagination>`,
});

export const totallyCustom = TotallyCustom.bind({});
totallyCustom.args = {};
