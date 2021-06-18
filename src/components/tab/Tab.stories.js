import AxTab from './Tab.vue';
import AxTabItem from './TabItem.vue';
import AxTabLink from './TabLink.vue';

export default {
  title: 'Axentix/Components/Tab',
  component: AxTab,
  subcomponents: { AxTabItem, AxTabLink },
  argTypes: {
    value: { control: { type: 'text' } },
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
  components: { AxTab, AxTabItem, AxTabLink },
  template: `<ax-tab v-model="value" :class="classes" v-bind="$props">
  <template #menu>
    <ax-tab-link href="#tab1">Tab 1</ax-tab-link>
    <ax-tab-link href="#tab2">Tab 2</ax-tab-link>
    <ax-tab-link href="#tab3">Long tab content long tab content </ax-tab-link>
  </template>

  <ax-tab-item id="tab1"> Content 1 </ax-tab-item>
  <ax-tab-item id="tab2"> Content 2 </ax-tab-item>
  <ax-tab-item id="tab3"> This is the 3rd content </ax-tab-item>
</ax-tab>`,
});

export const Normal = Template.bind({});
Normal.args = {};

export const FullWidth = Template.bind({});
FullWidth.args = {
  fullWidth: true,
};

export const WithoutActiveBar = Template.bind({});
WithoutActiveBar.args = {
  disableActiveBar: true,
};

export const Arrow = Template.bind({});
Arrow.args = {
  arrow: true,
  prevClasses: 'shadow-1',
  nextClasses: 'shadow-1',
};
