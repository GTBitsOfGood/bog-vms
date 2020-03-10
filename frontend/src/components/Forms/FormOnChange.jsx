import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';

const FormOnChange = ({ formik, onChange, raiseInitial }) => {
  const { values } = formik;
  const firstOnChange = useRef(true);
  useEffect(() => {
    // Skip first onChange
    if (raiseInitial || !firstOnChange.current) {
      onChange(values);
    }
    if (firstOnChange.current) firstOnChange.current = false;
  }, [values, onChange, raiseInitial]);
  return null;
};

export default connect(FormOnChange);

FormOnChange.propTypes = {
  onChange: PropTypes.func.isRequired,
  raiseInitial: PropTypes.bool
};
