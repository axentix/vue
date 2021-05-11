import AxSidenav from './Sidenav.vue';

export default {
  title: 'Axentix/Components/Sidenav',
  component: AxSidenav,
  argTypes: {
    value: false,
    overlay: false,
    bodyScrolling: false,
    animationDuration: 300,
    fixed: false,
    large: false,
    rightAligned: false,
    header: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    content: {
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
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: 'shadow-1',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxSidenav },
  template: `<ax-sidenav :class="classes" v-bind="$props" v-model="value" >
    <template v-slot:header>
      <span v-html="header"></span>
    </template>

    <template v-slot>
      <span v-html="content"></span>
    </template>

    <template v-slot:footer>
      <span v-html="footer"></span>
    </template>
  </ax-sidenav>`,
});

export const Normal = Template.bind({});
Normal.args = {};
