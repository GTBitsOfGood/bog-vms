import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ClearButton } from 'components/Shared';
import { transparentize } from "polished";

const Styled = {
  Outer: styled.div`
    background-color: ${props => props.theme.grey9};
    border-radius: 0 0 8px 8px;
    margin-left: 2rem;
    margin-right: 2rem;
    padding: 1rem 1.75rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 4px 0 ${props => props.theme.shadowLight};
    z-index: 1;
    position: relative;
  `,
  Count: styled.span`
    background-color: ${props => transparentize(0.5, props.theme.grey8)};
    border-radius: 4px;
    display: inline-block;
    padding: 0.5rem 0.85rem;
    margin-right: 0.75rem;
  `,
  AddButton: styled(ClearButton)`
    // Override default styles
    & > span {
      padding: 0.9rem 1rem;
      background-color: ${props => props.theme.grey10} !important;
    }

    &:hover > span {
      box-shadow: 0 4px 4px 0 ${props => props.theme.shadowLight};
      background-color: ${props => props.theme.grey10} !important;
    }

    &:active > span {
      box-shadow: 0 4px 8px 0 ${props => props.theme.shadow};
      background-color: ${props => props.theme.grey10} !important;
    }
  `
};

const formatVolunteerCount = amount =>
  amount === 1 ? `${amount} volunteer` : `${amount} volunteers`;

const FilterInfo = ({ filtersApplied, onClickAddAll, matchedCount }) => (
  <Styled.Outer>
    <div>
      {filtersApplied ? (
        <>
          <Styled.Count>{formatVolunteerCount(matchedCount)}</Styled.Count>match your search filters
        </>
      ) : (
        <>No search filters applied.</>
      )}
    </div>
    <Styled.AddButton onClick={onClickAddAll}>Add all to mailing list</Styled.AddButton>
  </Styled.Outer>
);

export default FilterInfo;

FilterInfo.propTypes = {
  filtersApplied: PropTypes.bool,
  matchedCount: PropTypes.number.isRequired,
  onClickAddAll: PropTypes.func
};
