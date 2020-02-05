import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { connect } from 'formik';

const Inner = styled.span`
  position: relative;
  padding: 0.6rem 0.8rem 0.4rem;
  transition-property: background-color, box-shadow;
  transition-duration: 0.25s;
  transition-timing-function: ease;
  border-radius: 0.5rem;
`;

const Styled = {
  Inner,
  ClearButton: styled.button`
    display: block;
    margin-left: auto;
    background: none;
    border: none;
    max-width: 120px;
    font-size: 14px;

    // Select using inner button span to prevent focus style on mouse focus
    // See https://www.kizu.ru/keyboard-only-focus/
    &:focus > ${Inner} {
      background-color: ${props => transparentize(0.95, props.theme.grey5)};
      box-shadow: 0 0 0 0.2rem ${props => transparentize(0.8, props.theme.grey5)};
    }

    // Remove base focus style
    &:focus, ${Inner}:focus {
      outline: none;
    }

    &:hover > ${Inner} {
      background-color: ${props => transparentize(0.85, props.theme.grey5)};
    }

    &:active > ${Inner}  {
      background-color: ${props => transparentize(0.7, props.theme.grey5)};
    }
  `
};

const FormResetButton = ({ formik, onClick, children, className, style }) => {
  return (
    <Styled.ClearButton
      onClick={useCallback(() => {
        formik.resetForm();
        onClick();
      }, [formik.resetForm, onClick])}
      className={className}
      style={style}
      tabIndex="0"
    >
      <Styled.Inner tabIndex="-1">{children}</Styled.Inner>
    </Styled.ClearButton>
  );
};

export default connect(FormResetButton);

FormResetButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
