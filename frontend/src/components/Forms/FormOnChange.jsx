import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';

const FormOnChange = ({ formik, onChange }) => {
  const { values } = formik;
  React.useEffect(() => {
    onChange(values);
  }, [values, onChange]);
  return null;
};

export default connect(FormOnChange);

FormOnChange.propTypes = {
    onChange: PropTypes.func.isRequired
}
