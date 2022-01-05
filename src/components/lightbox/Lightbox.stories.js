import AxLightbox from './Lightbox.vue';

export default {
  title: 'Axentix/Components/Lightbox',
  component: AxLightbox,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AxLightbox },
  template: ``,
});

export const Normal = Template.bind({});
Normal.args = {};
