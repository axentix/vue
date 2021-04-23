import '!style-loader!css-loader!sass-loader!./global.scss';

import '@storybook/addon-console';

const viewportsBreakpoints = {
  xs: {
    name: 'xs',
    styles: {
      width: '599px',
      height: '100%',
    },
  },
  sm: {
    name: 'sm',
    styles: {
      width: '959px',
      height: '100%',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '1279px',
      height: '100%',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1919px',
      height: '100%',
    },
  },
  xl: {
    name: 'xl',
    styles: {
      width: '2000px',
      height: '100%',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  html: {
    highlighter: {
      showLineNumbers: true,
    },
  },
  viewport: {
    viewports: viewportsBreakpoints,
  },
};
