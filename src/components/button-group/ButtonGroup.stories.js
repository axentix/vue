import AxBtnGroup from './ButtonGroup.vue';
import AxBtn from '../button/Button.vue';

export default {
  title: 'Axentix/Components/ButtonGroup',
  component: AxBtnGroup,
  subcomponents: { AxBtn },
  argTypes: {
    vertical: false,
    size: { control: { type: 'select', options: ['small', '', 'large'] } },
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxBtnGroup, AxBtn },
  template: `
  <ax-btn-group :class="classes" v-bind="$props">
    <ax-btn class="airforce dark-2"></ax-btn>
    <ax-btn class="airforce dark-2"></ax-btn>
    <ax-btn class="airforce dark-2"></ax-btn>
  </ax-btn-group>
  `,
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

export const Rounded = Template.bind({});
Rounded.args = {
  classes: 'rounded-1',
};

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  size: 'small',
  vertical: true,
};

export const VerticalLarge = Template.bind({});
VerticalLarge.args = {
  size: 'large',
  vertical: true,
};

export const VerticalRounded = Template.bind({});
VerticalRounded.args = {
  vertical: true,
  classes: 'rounded-1',
};
