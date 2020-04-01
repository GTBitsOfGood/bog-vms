import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import VolunteerPill from './VolunteerPill';
import { ClearButton, Loading } from 'components/Shared';

const Styled = {
  AddButtonContents: styled.span`
    flex-grow: 1;
  `,
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
    z-index: 1;
    position: relative;
  `,
  Count: styled(VolunteerPill)`
    margin-right: 0.75rem;
  `,
  AddButton: styled(ClearButton)`
    // Override default styles
    & > span {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      padding: 0.95rem 1rem 0.8rem;
      box-shadow: 0 2px 2px 0 ${props => props.theme.shadowLight};
      background-color: ${props => props.theme.grey10} !important;
      min-width: 12rem;
      min-height: 3rem;

      // Decrease padding on left during loading
      ${props => props.isLoading && `padding-left: 0.7rem;`}
    }

    &:not(:disabled):hover:not(:active) > span {
      box-shadow: 0 4px 4px 0 ${props => props.theme.shadow};
    }

    &:not(:disabled):active > span {
      transform: translateY(1px);
    }
  `,
  Loading: styled(Loading)`
    transform: scale(0.9);
    width: initial !important;
    margin: 0 auto !important;
    opacity: 0.6;
  `
};

const FilterInfo = ({ filtersApplied, onClickAddAll, matchedCount, loading }) => (
  <Styled.Outer>
    <div>
      {filtersApplied ? (
        <>
          <Styled.Count count={matchedCount} />
          match your search filters
        </>
      ) : (
        <>No search filters applied.</>
      )}
    </div>
    <Styled.AddButton onClick={onClickAddAll} disabled={loading} isLoading={loading}>
      {loading ? (
        <Styled.Loading />
      ) : (
        <Styled.AddButtonContents>Add all to mailing list</Styled.AddButtonContents>
      )}
    </Styled.AddButton>
  </Styled.Outer>
);

export default FilterInfo;

FilterInfo.propTypes = {
  loading: PropTypes.bool,
  filtersApplied: PropTypes.bool,
  matchedCount: PropTypes.number.isRequired,
  onClickAddAll: PropTypes.func
};
