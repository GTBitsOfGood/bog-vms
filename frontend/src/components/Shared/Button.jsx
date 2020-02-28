import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const defaultColors = {
  back: 'hsl(0, 0%, 95%)',
  text: 'hsl(0, 0%, 10%)'
};

const ButtonBase = styled.button`
  background: ${props => (props.theme[props.type] || defaultColors).back};
  color: ${props => (props.theme[props.type] || defaultColors).text};
  border-radius: 0.5rem;
`;

const Button = ({ children, type, ...props }) => (
  <ButtonBase 
    {...props}
    type={type}
  >
    {children}
  </ButtonBase>
);

export default withTheme(Button);

Button.propTypes = {
  children: PropTypes.object,
  type: PropTypes.string
};
