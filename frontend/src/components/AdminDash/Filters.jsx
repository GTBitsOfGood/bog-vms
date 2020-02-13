import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';
import { Form, Checkbox, FormOnChange, FormResetButton } from '../Forms';
import { Collapse } from '../Shared';
import { UserFilterContext } from './users/context';
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

const noop = () => {};

const Filters = ({ onChange, onClear }) => {
  const { labels, initialValues } = useContext(UserFilterContext);
  return (
    <Form initialValues={initialValues} onSubmit={noop}>
      <FormOnChange onChange={onChange} />
      {Object.entries(initialValues).map(([groupKey, filterGroup]) => (
        <FormGroup key={groupKey}>
          <Collapse title={filterGroup.label}>
            <Styled.GroupWrapper>
              {Object.keys(filterGroup.values).map(filter => (
                <Styled.Checkbox
                  small
                  key={filter}
                  name={`${groupKey}.values.${filter}`}
                  value={labels[groupKey][filter]}
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
