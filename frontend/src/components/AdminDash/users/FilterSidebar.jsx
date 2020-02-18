import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ApplicantSearch from '../ApplicantSearch';

const Styled = {
  Container: styled.div`
    padding: 1.5rem 1rem;
    max-width: 20rem;
    height: 100%;
    background-color: ${props => props.theme.greyBg};
    overflow-y: auto;
  `
};

const FilterSidebar = ({ onSubmit }) => {
  return (
    <Styled.Container>
      <ApplicantSearch onSubmit={onSubmit} />
    </Styled.Container>
  );
};

FilterSidebar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default React.memo(FilterSidebar);
