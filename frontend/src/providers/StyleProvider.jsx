import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

const theme = {
  primary: '#b35fd0',
  grey1: 'hsl(0, 0%, 10%)',
  grey3: 'hsl(0, 0%, 30%)',
  grey5: 'hsl(0, 0%, 50%)',
  grey7: 'hsl(0, 0%, 75%)',
  grey8: 'hsl(0, 0%, 87%)',
  grey9: 'hsl(0, 0%, 95%)',
  grey10: 'hsl(0, 0%, 100%)',
  greyBg: '#F0F0F0',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowLight: 'rgba(0, 0, 0, 0.06)',
  primaryGrey: '#607177',
  danger: {
    base: 'hsl(0, 100%, 63%)',
    text: 'hsl(0, 100%, 30%)'
  },
  warning: {
    base: 'hsl(55, 76%, 87%)',
    text: 'hsl(58, 76%, 25%)'
  },
  success: {
    base: 'hsl(128, 43%, 86%)',
    text: 'hsl(127, 100%, 21%)'
  },
  default: {
    base: 'hsl(0, 0%, 90%)',
    text: 'hsl(0, 0%, 30%)'
  },
  color: {
    bodyBg: 'rgb(194, 239, 255)',
    dark: 'rgba(35, 35, 35, 0.62)',
    secondary: '#efefef',
    success: '#b35fd0',
    info: '#626262',
    warning: '#eff214',
    primary: '#f79a0d',
    danger: '#ff6261'
  },
  button: {
    back: 'hsl(0, 0%, 30%)',
    text: 'hsl(0, 0%, 100%)',
  },
  reset: {
    back: 'hsl(0, 0%, 100%)',
    text: 'hsl(0, 0%, 75%)',
  },
  submit: {
    back: '#f79a0d',
    text: '#FFFFFF'
  }
};

const StyleWrapper = ({ children }) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </React.Fragment>
);

export default StyleWrapper;

StyleWrapper.propTypes = {
  children: PropTypes.object
};
