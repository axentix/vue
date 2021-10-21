import AxForm from './Form.vue';
import AxFormField from './FormField.vue';
import AxFormControl from './FormControl.vue';

export default {
  title: 'Axentix/Components/Forms/Inputs',
  component: AxFormField,
  subcomponents: { AxForm, AxFormControl },
  argTypes: {
    material: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    readonly: { control: { type: 'boolean' } },
    tag: {
      control: {
        type: 'text',
      },
      defaultValue: 'input',
    },
    type: {
      control: {
        type: 'text',
      },
      defaultValue: 'text',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Text input',
    },
    fieldClasses: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    controlClasses: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
    multiple: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormField, AxForm, AxFormControl },
  template: `
    <ax-form :material="material">
      <ax-form-field v-bind="$props" :class="fieldClasses">
        <ax-form-control :tag="tag" :type="type" :class="controlClasses" :disabled="disabled" :readonly="readonly" :placeholder="placeholder"></ax-form-control>
      </ax-form-field>
    </ax-form>
  `,
});

export const Basic = Template.bind({});
Basic.args = {};

export const BasicMaterial = Template.bind({});
BasicMaterial.args = {
  material: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const DisabledMaterial = Template.bind({});
DisabledMaterial.args = {
  material: true,
  disabled: true,
};

export const Readonly = Template.bind({});
Readonly.args = {
  readonly: true,
};

export const ReadonlyMaterial = Template.bind({});
ReadonlyMaterial.args = {
  material: true,
  readonly: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Axentix <3',
};

export const PlaceholderMaterial = Template.bind({});
PlaceholderMaterial.args = {
  material: true,
  placeholder: 'Axentix <3',
};

export const Inline = Template.bind({});
Inline.args = {
  inline: true,
};

export const Helper = Template.bind({});
Helper.args = {
  helper: 'This is a helper text.',
};

export const HelperCustom = Template.bind({});
HelperCustom.args = {
  helper: 'Error message.',
  helperClasses: 'text-red text-center',
};

export const Textarea = Template.bind({});
Textarea.args = {
  tag: 'textarea',
};

export const TextareaMaterial = Template.bind({});
TextareaMaterial.args = {
  material: true,
  tag: 'textarea',
};

const SelectTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormField, AxForm, AxFormControl },
  template: `
    <ax-form :material="material">
      <ax-form-field v-bind="$props" :class="fieldClasses">
        <ax-form-control :tag="tag" :class="controlClasses" :disabled="disabled" :readonly="readonly" :multiple="multiple">
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </ax-form-control>
      </ax-form-field>
    </ax-form>
  `,
});

export const Select = SelectTemplate.bind({});
Select.args = {
  type: '',
  tag: 'select',
  label: 'Select',
};

export const SelectMaterial = SelectTemplate.bind({});
SelectMaterial.args = {
  material: true,
  type: '',
  tag: 'select',
  label: 'Select',
};

export const MultipleSelect = SelectTemplate.bind({});
MultipleSelect.args = {
  type: '',
  multiple: true,
  tag: 'select',
  label: 'Select',
};
