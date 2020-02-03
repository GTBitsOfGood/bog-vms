import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Checkbox } from '../Forms';
import {  Collapse } from '../Shared';
import { statuses } from './applicantInfoHelpers';
import styled from 'styled-components';

const Styled = {
  Label: styled.label`
    font-weight: 600;
  `
};

const defaultValues = {
  date: {
    label: 'Date Range',
    values: {
      past_6_months: false,
      past_month: false,
      from_current_year: false,
      from_one_year_ago: false,
      from_two_years_ago: false,
      older: false
    }
  },
  status: {
    label: 'Status',
    values: Object.keys(statuses).reduce((obj, status) => {
      obj[status] = false;
      return obj;
    }, {})
  },
  role: {
    label: 'Role',
    values: {
      admin: false,
      volunteer: false,
      manager: false
    }
  },
  skills_interests: {
    label: 'Skills and Interests',
    values: {
      admin_office: false,
      admin_virtual: false,
      atlanta_shelter: false,
      orlando_shelter: false,
      graphic_web_design: false,
      special_events: false,
      grant_writing: false,
      writing_editing: false,
      social_media: false,
      fundraising: false,
      finance: false,
      office_maintenance_housekeeping: false,
      international_projects: false,
      volunteer_coordination: false,
      outreach: false
    }
  }
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

const Filters = ({ changeCallback, appliedFilters }) => (
  <Form
    initialValues={appliedFilters || defaultValues}
    onChange={values => {
      changeCallback(values);
    }}
  >
    {Object.entries(defaultValues).map(([groupKey, filterGroup]) => (
      <FormGroup key={groupKey}>
        <Collapse title={filterGroup.label}>
          {Object.keys(filterGroup.values).map(filter => (
            <Checkbox
              key={filter}
              name={`${groupKey}.values.${filter}`}
              value={keyToLabel(filter)}
            />
          ))}
        </Collapse>
      </FormGroup>
    ))}
  </Form>
);

export default Filters;

Filters.propTypes = {
  changeCallback: PropTypes.func.isRequired,
  appliedFilters: PropTypes.object
};
