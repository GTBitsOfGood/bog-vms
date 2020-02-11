import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { focusBorder } from '../../utility';

const Inner = styled.span`
  position: relative;
  padding: 0.6rem 0.8rem 0.5rem;
  transition-property: background-color, box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  border-radius: 0.5rem;
  display: inline-block;
  line-height: initial;
  flex-grow: 1;
`;

const Styled = {
  Inner,
  ClearButton: styled.button`
    background: none;
    border: none;
    line-height: 1;
    padding: 0;
    display: flex;
    align-items: stretch;

    // Select using inner button span to prevent focus style on mouse focus
    // See https://www.kizu.ru/keyboard-only-focus/
    &:focus:not(:disabled) > ${Inner} {
      background-color: ${props => transparentize(0.95, props.theme.grey5)};
      ${props => focusBorder(props.theme.grey5)}
    }

    // Remove base focus style
    &:focus,
    ${Inner}:focus {
      outline: none;
    }

    &:hover:not(:disabled) > ${Inner} {
      background-color: ${props => transparentize(0.85, props.theme.grey5)};
    }

    &:active:not(:disabled) > ${Inner} {
      background-color: ${props => transparentize(0.7, props.theme.grey5)};
    }
  `
};

const ClearButton = ({ children, ...rest }) => {
  return (
    <Styled.ClearButton tabIndex="0" {...rest}>
      <Styled.Inner tabIndex="-1">{children}</Styled.Inner>
    </Styled.ClearButton>
  );
};

export default ClearButton;
