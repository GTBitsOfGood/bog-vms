import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterList from './FilterList';
import VolunteerPill from './VolunteerPill';
import EmptyDisplay from './EmptyDisplay';
import { Button } from 'reactstrap';
import { ClearButton } from '../../Shared';

const Styled = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => props.theme.greyBg};
  `,
  Title: styled.h1`
    font-size: 24px;
    color: #969696;
  `,
  Text: styled.p`
    margin: 0.5rem 0;
  `,
  Count: styled(VolunteerPill)`
    text-align: center;
    display: block;
  `,
  TopSection: styled.div`
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 2rem 1rem 0.5rem;
  `,
  ButtonSection: styled.div`
    padding: 1rem 1rem 0.5rem;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    margin-bottom: 1rem;
    min-width: 5rem;

    button {
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  `,
  FilterList: styled(FilterList)`
    margin-top: 1rem;
  `
};

const MailingListCollapsed = ({
  listSize,
  filters,
  onClearFilter,
  onClearClick,
  onExportClick,
  isEmpty
}) => (
  <Styled.Container>
    {isEmpty ? (
      <EmptyDisplay />
    ) : (
      <>
        <Styled.TopSection>
          <Styled.Title>Mailing List</Styled.Title>
          <Styled.Text>Currently you have</Styled.Text>
          <Styled.Count count={listSize} />
          <Styled.Text>in your mailing list with the filters:</Styled.Text>
          <Styled.FilterList filters={filters} clearFilter={onClearFilter} vertical />
        </Styled.TopSection>
        <Styled.ButtonSection>
          <Button onClick={onExportClick} color="dark" disabled={listSize === 0}>
            Export
          </Button>
          <ClearButton onClick={onClearClick} disabled={listSize === 0}>
            Clear List
          </ClearButton>
        </Styled.ButtonSection>
      </>
    )}
  </Styled.Container>
);

MailingListCollapsed.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node
    })
  ).isRequired,
  listSize: PropTypes.number.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onExportClick: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired,
  isEmpty: PropTypes.bool
};

export default MailingListCollapsed;
