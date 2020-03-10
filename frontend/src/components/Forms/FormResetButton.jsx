import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ClearButton } from "../Shared";
import { connect } from 'formik';

const Styled = {
  Button: styled(ClearButton)`
    display: block;
    margin-left: auto;
    max-width: 120px;
    font-size: 14px;
  `
};

const FormResetButton = ({ formik, onClick, children, className, style }) => {
  return (
    <Styled.Button
      onClick={useCallback(() => {
        onClick();
        formik.resetForm();
      }, [formik, onClick])}
      className={className}
      style={style}
    >
      {children}
    </Styled.Button>
  );
};

export default connect(FormResetButton);

FormResetButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};
