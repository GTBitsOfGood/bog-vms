import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FilterList from './FilterList';
import { Button } from 'reactstrap';
import { ClearButton, Icon } from '../../Shared';

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
  UserCountBlock: styled.div`
    padding: 0.6rem 1rem 0.5rem;
    background: #e5e5e5;
    border-radius: 2px;
    font-weight: bold;
    text-align: center;
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
  `,
  EmptyContainer: styled.div`
    margin: auto;
    padding: 2rem;
    text-align: center;
  `,
  EmptyText: styled.h4`
    margin-bottom: 0;
    font-size: 1.5rem;
    line-height: 1.3;
    color: ${props => props.theme.grey5};
  `,
  EmptyIcon: styled(Icon)`
    transform: scale(3);
    margin-bottom: 2.5rem;
  `
};

const MailingListCollapsed = ({ users, filters, onClearFilter, onClearClick, isEmpty }) => {
  const onExportClick = () => {
    let url = users.reduce((prev, user) => prev + user.email + ',', 'mailto:');
    window.open(url, '_blank');
  };

  return (
    <Styled.Container>
      {isEmpty && (
        <Styled.EmptyContainer>
          <Styled.EmptyIcon name="empty" color="grey7" />
          <Styled.EmptyText>Your mailing list is empty.</Styled.EmptyText>
        </Styled.EmptyContainer>
      )}
      {!isEmpty && (
        <>
          <Styled.TopSection>
            <Styled.Title>Mailing List</Styled.Title>
            <Styled.Text>Currently you have</Styled.Text>
            <Styled.UserCountBlock>{users.length || 0} volunteers</Styled.UserCountBlock>
            <Styled.Text>in your mailing list with the filters:</Styled.Text>
            <Styled.FilterList filters={filters} clearFilter={onClearFilter} vertical />
          </Styled.TopSection>
          <Styled.ButtonSection>
            <Button onClick={onExportClick} color="dark" disabled={users.length === 0}>
              Export
            </Button>
            <ClearButton onClick={onClearClick} disabled={users.length === 0}>
              Clear List
            </ClearButton>
          </Styled.ButtonSection>
        </>
      )}
    </Styled.Container>
  );
};

MailingListCollapsed.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }))
    .isRequired,
  users: PropTypes.array.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onClearFilter: PropTypes.func.isRequired
};

export default MailingListCollapsed;
