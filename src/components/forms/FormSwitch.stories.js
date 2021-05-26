import AxForm from './Form.vue';
import AxFormSwitch from './FormSwitch.vue';
import AxFormField from './FormField.vue';

export default {
  title: 'Axentix/Components/Forms/Switch',
  component: AxFormSwitch,
  subcomponents: { AxForm, AxFormField },
  argTypes: {
    thin: false,
    value: { control: { type: 'boolean' } },
    size: { control: { type: 'select', options: ['small', '', 'large'] } },
    color: '#e92626',
    labelClasses: '',
    falseValue: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'On',
    },
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
  components: { AxFormSwitch, AxForm, AxFormField },
  template: `
    <ax-form>
      <ax-form-field default>
        <ax-form-switch v-bind="$props" :class="classes" v-model="value">
          <template v-slot:false-value><span v-html="falseValue"></span></template>
          <span v-html="content"></span>
        </ax-form-switch>
      </ax-form-field>
    </ax-form>
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

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: '#000000',
};
