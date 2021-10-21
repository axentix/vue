import AxForm from './Form.vue';
import AxFormGroup from './FormGroup.vue';
import AxFormField from './FormField.vue';
import AxFormControl from './FormControl.vue';

export default {
  title: 'Axentix/Components/Forms/Group (Suffix & Prefix)',
  component: AxFormGroup,
  subcomponents: { AxForm, AxFormField, AxFormControl },
  argTypes: {
    material: { control: { type: 'boolean' } },
    classes: {
      control: {
        type: 'text',
      },
      defaultValue: '',
    },
  },
};

const PrefixTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormGroup, AxForm, AxFormField, AxFormControl },
  template: `
    <ax-form :material="material">
      <ax-form-field>
        <ax-form-group v-bind="$props" :class="classes">
          <span class="form-group-text">@</span>
          <ax-form-control tag="input" type="text"></ax-form-control>
        </ax-form-group>
      </ax-form-field>
    </ax-form>
  `,
});

export const Prefix = PrefixTemplate.bind({});
Prefix.args = {};

const SuffixTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormGroup, AxForm, AxFormField, AxFormControl },
  template: `
    <ax-form :material="material">
      <ax-form-field>
        <ax-form-group v-bind="$props" :class="classes">
        <ax-form-control tag="input" type="text"></ax-form-control>
        <span class="form-group-text">@</span>
        </ax-form-group>
      </ax-form-field>
    </ax-form>
  `,
});

export const Suffix = SuffixTemplate.bind({});
Suffix.args = {};

const BothTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxFormGroup, AxForm, AxFormField, AxFormControl },
  template: `
    <ax-form :material="material">
      <ax-form-field>
        <ax-form-group v-bind="$props" :class="classes">
          <span class="form-group-text bd-1 bd-solid bd-r-0 bd-grey bd-light-1" v-if="!material">@</span>
          <span class="form-group-text" v-else>@</span>

          <ax-form-control tag="input" type="text"></ax-form-control>

          <span class="form-group-text bd-1 bd-solid bd-l-0 bd-grey bd-light-1 grey light-3" v-if="!material">useaxentix.com</span>
          <span class="form-group-text" v-else>useaxentix.com</span>
        </ax-form-group>
      </ax-form-field>
    </ax-form>
  `,
});

export const Both = BothTemplate.bind({});
Both.args = {
  classes: 'rounded-1',
};
