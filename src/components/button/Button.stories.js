import AxBtn from './Button.vue';

export default {
  title: 'Axentix/Components/Button',
  component: AxBtn,
  argTypes: {
    tag: { control: { type: 'select', options: ['button', 'a', 'div', 'router-link'] } },
    circle: false,
    press: false,
    outline: false,
    outlineOpening: false,
    outlineInvert: false,
    disabled: false,
    size: { control: { type: 'select', options: ['small', '', 'large'] } },
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'Button',
    },
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: 'primary rounded-1',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxBtn },
  template: '<ax-btn :class="classes" v-bind="$props"><span v-html="content"></span></ax-btn>',
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

export const Circle = Template.bind({});
Circle.args = {
  circle: true,
  content: 'I',
};

export const Press = Template.bind({});
Press.args = {
  press: true,
};

export const Outline = Template.bind({});
Outline.args = {
  outline: true,
  classes: 'txt-airforce rounded-1',
};

export const OutlineOpening = Template.bind({});
OutlineOpening.args = {
  outline: true,
  outlineOpening: true,
  classes: 'txt-airforce rounded-1',
};

export const OutlineInvert = Template.bind({});
OutlineInvert.args = {
  outline: true,
  outlineInvert: true,
  classes: 'txt-blue txt-light-3 rounded-1',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
