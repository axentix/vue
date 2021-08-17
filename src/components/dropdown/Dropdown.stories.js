import AxDropdown from './Dropdown.vue';
import AxBtn from '../button/Button.vue';

export default {
  title: 'Axentix/Components/Dropdown',
  component: AxDropdown,
  argTypes: {
    value: {
      control: {
        type: 'boolean',
      },
    },
    animationDuration: 300,
    content: {
      control: {
        type: 'text',
      },
      defaultValue: `<div class="dropdown-item">Hello</div>
      <div class="dropdown-item">Hello number 2</div>`,
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxDropdown, AxBtn },
  template: `<ax-dropdown v-model="value" v-bind="$props">
    <template #trigger>
      <ax-btn class="btn blue" @click="value = !value">Trigger dropdown</ax-btn>
    </template>
    <span v-html="content"></span>
  </ax-dropdown>`,
});

export const Normal = Template.bind({});
Normal.args = {};

export const Constrained = Template.bind({});
Constrained.args = {
  constrainWidth: true,
};

export const Fade = Template.bind({});
Fade.args = {
  animationType: 'fade',
};

const HoverTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxDropdown, AxBtn },
  template: `<ax-dropdown v-model="value" v-bind="$props">
    <template #trigger>
      <ax-btn class="btn blue" @mouseleave="value = !value" @mouseover="value = !value">Trigger dropdown</ax-btn>
    </template>
    <span v-html="content"></span>
  </ax-dropdown>`,
});

export const Hover = HoverTemplate.bind({});
Hover.args = {};
