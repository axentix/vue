import AxSidenav from './Sidenav.vue';
import AxSidenavLink from './SidenavLink.vue';
import AxSidenavHeader from './SidenavHeader.vue';
import AxSidenavFooter from './SidenavFooter.vue';

export default {
  title: 'Axentix/Components/Sidenav',
  component: AxSidenav,
  subcomponents: { AxSidenavLink, AxSidenavHeader, AxSidenavFooter },
  argTypes: {
    value: { control: { type: 'boolean' } },
    overlay: true,
    bodyScrolling: false,
    animationDuration: 300,
    fixed: false,
    large: false,
    rightAligned: false,
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
  components: { AxSidenav, AxSidenavLink, AxSidenavHeader, AxSidenavFooter },
  template: `<ax-sidenav :class="classes" v-bind="$props" v-model="value" >
    <ax-sidenav-header>
      Sidenav header
    </ax-sidenav-header>

    <ax-sidenav-link>Link 1</ax-sidenav-link>
    <ax-sidenav-link :active="true">Link 2</ax-sidenav-link>
    <ax-sidenav-link>Link 3</ax-sidenav-link>

    <ax-sidenav-footer>
      Sidenav footer
    </ax-sidenav-footer>
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
