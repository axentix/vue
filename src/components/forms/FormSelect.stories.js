import AxForm from './Form.vue';
import AxFormSelect from './FormSelect.vue';
import AxFormControl from './FormControl.vue';
import AxFormCheck from './FormCheck.vue';
import AxFormField from './FormField.vue';

AxFormSelect.components = {
  AxFormControl,
  AxFormCheck,
};

export default {
  title: 'Axentix/Components/Forms/Select',
  component: AxFormSelect,
  subcomponents: { AxForm, AxFormField, AxFormControl, AxFormCheck },
  argTypes: {
    multipleSelectedValue: {
      control: {
        type: 'array',
      },
      defaultValue: [],
    },
    selectedValue: { control: { type: 'text' } },
    items: {
      control: {
        type: 'array',
      },
      defaultValue: ['Voiture', 'Moto', 'Bus', 'Velo', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
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
  components: { AxFormSelect, AxForm, AxFormField, AxFormControl, AxFormCheck },
  template: `
    <ax-form material>
      <ax-form-field label="Choose an option">
        <ax-form-select v-bind="$props" :class="classes" v-model="selectedValue"></ax-form-select>
      </ax-form-field>
    </ax-form>
  `,
});

export const Normal = Template.bind({});
Normal.args = {};

const MultipleTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormSelect, AxForm, AxFormField, AxFormControl, AxFormCheck },
  template: `
    <ax-form material>
      <ax-form-field label="Choose options">
        <ax-form-select v-bind="$props" :class="classes" v-model="multipleSelectedValue"></ax-form-select>
      </ax-form-field>
    </ax-form>
  `,
});

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  multiple: true,
};

export const Chips = MultipleTemplate.bind({});
Chips.args = {
  multiple: true,
  chips: true,
};

export const ChipsClosable = MultipleTemplate.bind({});
ChipsClosable.args = {
  multiple: true,
  chips: true,
  chipsClosable: true,
};

export const SingleLine = MultipleTemplate.bind({});
SingleLine.args = {
  multiple: true,
  chips: true,
  chipsClosable: true,
  singleLine: true,
};
