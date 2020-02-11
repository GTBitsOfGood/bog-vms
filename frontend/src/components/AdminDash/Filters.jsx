import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { Form, Checkbox, FormOnChange, FormResetButton } from '../Forms';
import { Collapse } from '../Shared';
import { formValues } from './userFilters';
import styled from 'styled-components';

const Styled = {
  GroupWrapper: styled.div`
    padding-top: 1rem;
  `,
  Checkbox: styled(Checkbox)`
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    .form-check {
      padding-left: 0.6rem;
    }

    // Increase spacing between checkbox and label
    .custom-control {
      // Default: 1.5rem
      padding-left: 1.75rem;
    }
    .custom-control-label {
      &::before,
      &::after {
        // Default: -1.5rem
        left: -1.75rem;
      }
    }
  `
};

const keyToLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  var d = new Date();
  if (key === 'from_current_year') {
    return d.getFullYear();
  } else if (key === 'from_one_year_ago') {
    return d.getFullYear() - 1;
  } else if (key === 'from_two_years_ago') {
    return d.getFullYear() - 2;
  } else if (key === 'older') {
    return d.getFullYear() - 3 + ' and older';
  } else {
    return capitalizedWords.join(' ');
  }
};

const noop = () => {};

const Filters = ({ onChange, onClear }) => {
  return (
    <Form initialValues={formValues} onSubmit={noop}>
      <FormOnChange onChange={onChange} />
      {Object.entries(formValues).map(([groupKey, filterGroup]) => (
        <FormGroup key={groupKey}>
          <Collapse title={filterGroup.label}>
            <Styled.GroupWrapper>
              {Object.keys(filterGroup.values).map(filter => (
                <Styled.Checkbox
                  small
                  key={filter}
                  name={`${groupKey}.values.${filter}`}
                  value={keyToLabel(filter)}
                />
              ))}
            </Styled.GroupWrapper>
          </Collapse>
        </FormGroup>
      ))}
      <FormResetButton onClick={onClear}>Clear Filters</FormResetButton>
    </Form>
  );
};

export default Filters;

Filters.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func
};
