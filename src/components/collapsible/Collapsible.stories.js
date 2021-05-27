import AxCollapsible from './Collapsible.vue';
import AxSidenav from '../sidenav/Sidenav.vue';
import AxSidenavLink from '../sidenav/SidenavLink.vue';

export default {
  title: 'Axentix/Components/Collapsible',
  component: AxCollapsible,
  argTypes: {
    value: {
      control: {
        type: 'boolean',
      },
    },
    animationDuration: 300,
    isInSidenav: false,
    autoClose: false,
    content: {
      control: {
        type: 'text',
      },
      defaultValue: `<span>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Error, soluta asperiores nobis, iusto tenetur illum sunt modi quisquam
      blanditiis aspernatur sequi minus corporis quibusdam quam voluptatem!
      Cumque nemo debitis porro.</span>`,
    },
    secondValue: {
      control: {
        type: 'boolean',
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxCollapsible },
  template: `<ax-collapsible v-model="value" v-bind="$props">
    <span v-html="content"></span>
  </ax-collapsible>`,
});

export const Normal = Template.bind({});
Normal.args = {};

const AutoCloseTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxCollapsible },
  template: `<div class="grey light-2 p-5">
    <ax-collapsible v-model="value" v-bind="$props">
      <span class="red d-block rounded-bl1 rounded-br1 py-3" v-html="content"></span>
    </ax-collapsible>
    <ax-collapsible v-model="secondValue" v-bind="$props">
      <span class="blue d-block rounded-tl1 rounded-tr1 py-3" v-html="content"></span>
    </ax-collapsible>
  </div>`,
});

export const AutoClose = AutoCloseTemplate.bind({});
AutoClose.args = {
  autoClose: true,
};

const SidenavTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxCollapsible, AxSidenav, AxSidenavLink },
  template: `<ax-sidenav :fixed="true" class="shadow-1">
  <ax-sidenav-link>Link 1</ax-sidenav-link>
  <ax-sidenav-link :active="value">Collapse</ax-sidenav-link>
  <ax-collapsible v-model="value">
    <ax-sidenav-link>Collapsed 1</ax-sidenav-link>
    <ax-sidenav-link>Collapsed 2</ax-sidenav-link>
  </ax-collapsible>

  <ax-sidenav-link :active="secondValue">Collapse 2</ax-sidenav-link>
  <ax-collapsible v-model="secondValue">
    <ax-sidenav-link>Collapsed 1</ax-sidenav-link>
    <ax-sidenav-link>Collapsed 2</ax-sidenav-link>
  </ax-collapsible>
</ax-sidenav>`,
});

export const InSidenav = SidenavTemplate.bind({});
InSidenav.args = {
  isInSidenav: true,
};