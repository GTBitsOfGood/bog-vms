import React from 'react';
import styled from 'styled-components';
import PropTypes from "prop-types";
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

const FilterSidebar = ({onSearchSubmit, onApplyFilters}) => {
  return (
    <Styled.Container>
      <ApplicantSearch
        searchSubmitCallback={onSearchSubmit}
        applyFiltersCallback={onApplyFilters}
      />
    </Styled.Container>
  );
};

FilterSidebar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired
}

export default FilterSidebar;
