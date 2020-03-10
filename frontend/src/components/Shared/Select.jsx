import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';

const BaseSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  display: block;
  appearance: none;
  font-size: 120%;
  color: ${props => props.theme.grey5};
  width: 100%;
  margin: 1.5rem 0rem;
  padding: .5rem 0rem;
  background-color: transparent;
  border-width: 0 0 2px;
  border-color: ${props => props.theme.grey5};
  &::after {
    content: '>';
    font: 17px "Consolas", monospace;
    color: #333;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 11px;
    /*Adjust for position however you want*/
    
    top: 18px;
    padding: 0 0 2px;
    border-bottom: 1px solid #999;
    /*left line */
    
    position: absolute;
    pointer-events: none;
  }
`;

const Select = ({ children, ...props }) => (
  <div style={{position: 'relative'}}>
    <BaseSelect
      { ...props }
    >
      { children }
    </BaseSelect>
  </div>
  
);

export default withTheme(Select);

Select.propTypes = {
  children: PropTypes.object,
};