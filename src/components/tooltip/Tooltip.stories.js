import AxTooltip from './Tooltip.vue';
import AxBtn from '../button/Button.vue';

export default {
  title: 'Axentix/Components/Tooltip',
  component: AxTooltip,
  subcomponents: { AxBtn },
  argTypes: {
    content: { control: { type: 'text' }, defaultValue: 'Tooltip' },
    position: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    classes: 'grey dark-4 light-shadow-2 p-2',
    animationDuration: 200,
    animationDelay: 0,
    offset: 10,
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxTooltip, AxBtn },
  template: `
    <div class="d-flex fx-center">
      <ax-tooltip class="my-auto" v-bind="$props">
        <ax-btn class="airforce txt-white rounded-1">Tooltiped</ax-btn>
      </ax-tooltip>
    </div>
  `,
});

export const Top = Template.bind({});
Top.parameters = {
  layout: 'centered',
};
Top.args = {};

export const Right = Template.bind({});
Right.parameters = {
  layout: 'centered',
};
Right.args = {
  position: 'right',
};

export const Bottom = Template.bind({});
Bottom.parameters = {
  layout: 'centered',
};
Bottom.args = {
  position: 'bottom',
};

export const Left = Template.bind({});
Left.parameters = {
  layout: 'centered',
};
Left.args = {
  position: 'left',
};
