import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'components/Shared';

const RemoveButton = styled.div`
  border-radius: 20rem;
  background-color: transparent;
  transition: opacity 0.15s, background-color 0.15s;
  opacity: 0;
  position: absolute;
  left: 0.25rem;
  top: 50%;
  transform: translateY(-50%);
`;

const Label = styled.div`
  padding: 0.5rem 2rem;
  line-height: 1.2;
`;

const FilterButton = styled.button`
  border-radius: 20rem;
  border: 2px solid ${props => props.theme.grey7};
  display: block;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  transition: border-color 0.15s, color 0.15s;
  color: ${props => props.theme.grey5};

  &:hover {
    ${RemoveButton} {
      opacity: 0.7;
    }
  }

  &:active,
  &:focus {
    ${RemoveButton} {
      opacity: 1;
    }
  }

  &:hover,
  &:active,
  &:focus {
    border-color: ${props => props.theme.grey5};
    color: ${props => props.theme.grey3};

    & ${RemoveButton} {
      background-color: ${props => props.theme.grey9};
    }
  }

  &:focus {
    outline: none;
  }
`;

const Styled = {
  RemoveButton,
  Label,
  FilterButton,
  Outer: styled.div`
    display: flex;
    justify-content: flex-start;
    ${props =>
      props.vertical
        ? `flex-direction: column;
           align-items: stretch;
           flex-wrap: nowrap;`
        : `align-items: flex-start;
           flex-wrap: wrap;`}

    ${FilterButton} {
      ${props =>
        props.vertical
          ? `&:not(:last-child) {
               margin-bottom: 0.75rem;
             }`
          : `margin-bottom: 0.75rem;
             margin-right: 0.75rem;
            `}
    }
  `
};

const Filter = ({ name, label, clearFilter }) => (
  <Styled.FilterButton onClick={useCallback(() => clearFilter(name), [clearFilter, name])}>
    <Styled.RemoveButton>
      <Icon name="remove" color="grey7" />
    </Styled.RemoveButton>
    <Styled.Label>{label}</Styled.Label>
  </Styled.FilterButton>
);

const FilterList = ({ filters, clearFilter, vertical = false }) => (
  <Styled.Outer vertical={vertical}>
    {filters.map(({ key, label }) => (
      <Filter name={key} key={key} label={label} clearFilter={clearFilter} />
    ))}
  </Styled.Outer>
);

export default FilterList;

FilterList.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }))
    .isRequired,
  vertical: PropTypes.bool,
  clearFilter: PropTypes.func
};
