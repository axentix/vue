import AxModal from './Modal.vue';

export default {
  title: 'Axentix/Components/Modal',
  component: AxModal,
  argTypes: {
    value: { control: { type: 'boolean' } },
    mode: { control: { type: 'select', options: ['falling', '', 'bouncing'] } },
    header: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    footer: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    content: {
      control: {
        type: 'text',
      },
      defaultValue: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus voluptas ipsam rerum repellendus,
      quibusdam architecto laboriosam quia itaque voluptates et, fuga tenetur possimus debitis quisquam
      assumenda fugit modi magnam earum.`,
    },
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: 'white rounded-1',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxModal },
  template: `<ax-modal :class="classes" v-bind="$props">
    <template v-slot:header v-if="header">
      <span v-html="header"></span>
    </template>

    <span v-html="content"></span>

    <template v-slot:footer v-if="footer">
      <span v-html="footer"></span>
    </template>
    
    </ax-modal>`,
});

export const Normal = Template.bind({});
Normal.args = {};

export const Falling = Template.bind({});
Falling.args = {
  mode: 'falling',
};

export const Bouncing = Template.bind({});
Bouncing.args = {
  mode: 'bouncing',
};

export const Header = Template.bind({});
Header.args = {
  header: 'Header title',
};

export const Footer = Template.bind({});
Footer.args = {
  footer: 'Footer content',
};
