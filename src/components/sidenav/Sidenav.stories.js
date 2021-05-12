import AxSidenav from './Sidenav.vue';
import AxSidenavLink from './SidenavLink.vue';

export default {
  title: 'Axentix/Components/Sidenav',
  component: AxSidenav,
  subcomponents: { AxSidenavLink },
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
      defaultValue: 'airforce shadow-1',
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxSidenav, AxSidenavLink },
  template: `<ax-sidenav :class="classes" v-bind="$props" v-model="value" >
    <template v-slot:header v-if="header">
      <span v-html="header"></span>
    </template>

    <ax-sidenav-link>Link 1</ax-sidenav-link>
    <ax-sidenav-link :active="true">Link 2</ax-sidenav-link>
    <ax-sidenav-link>Link 3</ax-sidenav-link>

    <template v-slot:footer v-if="footer">
      <span v-html="footer"></span>
    </template>
  </ax-sidenav>`,
});

export const Normal = Template.bind({});
Normal.args = {};

export const Large = Template.bind({});
Large.args = {
  large: true,
};

export const RightAligned = Template.bind({});
RightAligned.args = {
  rightAligned: true,
};
