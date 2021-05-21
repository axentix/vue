import AxForm from './Form.vue';
import AxFormCheck from './FormCheck.vue';
import AxFormField from './FormField.vue';

export default {
  title: 'Axentix/Components/Forms/Check',
  component: AxFormCheck,
  subcomponents: { AxForm, AxFormField },
  argTypes: {
    full: false,
    checked: { control: { type: 'boolean' } },
    value: '',
    nativeValue: '',
    type: { control: { type: 'select', options: ['checkbox', 'radio'] } },
    material: { control: { type: 'boolean' } },
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'Ok',
    },
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
  },
};

const CheckboxTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormCheck, AxForm, AxFormField },
  template: `
    <ax-form :material="material">
      <ax-form-field>
        <ax-form-check v-bind="$props" v-model="checked" :class="classes"><span v-html="content"></span></ax-form-check>
      </ax-form-field>
    </ax-form>
  `,
});

export const Checkbox = CheckboxTemplate.bind({});
Checkbox.args = {};

export const MaterialCheckbox = CheckboxTemplate.bind({});
MaterialCheckbox.args = {
  material: true,
};

const RadioTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormCheck, AxForm, AxFormField },
  template: `
    <ax-form :material="material">
      <ax-form-field>
        <ax-form-check v-bind="$props" v-model="value" :class="classes" native-value="1">1</ax-form-check>
        <ax-form-check v-bind="$props" v-model="value" :class="classes" native-value="2">2</ax-form-check>
        <ax-form-check v-bind="$props" v-model="value" :class="classes" native-value="3">3</ax-form-check>
      </ax-form-field>
    </ax-form>
  `,
});

export const Radio = RadioTemplate.bind({});
Radio.args = {
  type: 'radio',
  value: 1,
};

export const MaterialRadio = RadioTemplate.bind({});
MaterialRadio.args = {
  type: 'radio',
  value: 1,
  material: true,
};

export const FullMaterialRadio = RadioTemplate.bind({});
FullMaterialRadio.args = {
  type: 'radio',
  value: 1,
  material: true,
  full: true,
};
