import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const defaultColors = {
  back: 'hsl(0, 0%, 95%)',
  text: 'hsl(0, 0%, 10%)'
};

const ButtonBase = styled.button`
  flex: 1;
  background: ${props => (props.theme[props.type] || defaultColors).back};
  color: ${props => (props.theme[props.type] || defaultColors).text};
  border-radius: 0.5rem;
  border: none;
  padding: .70rem 5.75rem;
  font-size: 120%;
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
  children: PropTypes.string,
  type: PropTypes.string
};
