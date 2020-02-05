import React from 'react';
import styled from 'styled-components';
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

const FilterSidebar = () => {
  const onSearchSubmit = (textInput, type) => {};
  const onApplyFilters = filters => {};

  return (
    <Styled.Container>
      <ApplicantSearch
        searchSubmitCallback={onSearchSubmit}
        applyFiltersCallback={onApplyFilters}
      />
    </Styled.Container>
  );
};

export default FilterSidebar;
