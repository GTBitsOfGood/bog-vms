import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'components/Shared';
import { transparentize } from "polished";

const RemoveButton = styled.div`
  border-radius: 20rem;
  transition: opacity 0.15s;
  opacity: 0;
  position: absolute;
  left: 0.35rem;
  top: 50%;
  transform: translateY(-50%);

  & svg {
    height: 1.6rem;
    width: 1.6rem;
  }
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

  &:hover,
  &:focus {
    ${RemoveButton} {
      opacity: 0.7;
    }
  }

  &:active,
  &:focus {
    background-color: ${props => transparentize(0.7, props.theme.grey10)};
  }

  &:active {
    transform: translateY(1px);
    ${RemoveButton} {
      opacity: 1;
    }
  }

  &:hover,
  &:active,
  &:focus {
    border-color: ${props => props.theme.grey5};
    color: ${props => props.theme.grey3};
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
      <Icon name="close" color="grey5" />
    </Styled.RemoveButton>
    <Styled.Label>{label}</Styled.Label>
  </Styled.FilterButton>
);

const FilterList = ({ filters, clearFilter, vertical = false, className }) => (
  <Styled.Outer vertical={vertical} className={className}>
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
