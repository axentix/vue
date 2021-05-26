import AxForm from './Form.vue';
import AxFormFile from './FormFile.vue';

export default {
  title: 'Axentix/Components/Forms/File',
  component: AxFormFile,
  subcomponents: { AxForm },
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'Upload',
    },
    labelClasses: {
      control: {
        type: 'text',
      },
      defaultValue: 'btn airforce dark-1 rounded-1 shadow-1',
    },
    classes: {
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
  components: { AxFormFile, AxForm },
  template: `
    <ax-form>
      <ax-form-file v-bind="$props" :class="classes"></ax-form-file>
    </ax-form>
  `,
});

export const Normal = Template.bind({});
Normal.args = {};

export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
};
