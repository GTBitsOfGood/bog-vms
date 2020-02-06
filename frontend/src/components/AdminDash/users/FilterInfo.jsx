import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ClearButton } from 'components/Shared';

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
  `,
  Count: styled.span`
    background-color: ${props => props.theme.grey8};
    border-radius: 4px;
    display: inline-block;
    padding: 0.5rem 0.75rem;
    margin-right: 0.5rem;
  `,
  AddButton: styled(ClearButton)`
    // Override default styles
    & > span {
      padding: 0.9rem 1rem;
      background-color: ${props => props.theme.grey10} !important;
    }

    &:hover > span {
      background-color: ${props => props.theme.grey8} !important;
    }

    &:active > span {
      background-color: ${props => props.theme.grey7} !important;
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
