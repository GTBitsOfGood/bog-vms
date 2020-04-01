import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

// const defaultColors = {
//   back: 'hsl(0, 0%, 95%)',
//   text: 'hsl(0, 0%, 10%)'
// };

const InputBase = styled.input`
  font-size: 120%;
  outline: 0;
  border-width: 0 0 2px;
  border-color: ${props => props.theme.grey5};
  width: 100%;
  margin: 1.5rem 0rem;
  padding: .5rem 0rem;
`;

const Input = ({children, ...props }) => (
  <InputBase {...props} >
    {children}
  </InputBase>
);

export default withTheme(Input);

Input.propTypes = {
  children: PropTypes.object,
};