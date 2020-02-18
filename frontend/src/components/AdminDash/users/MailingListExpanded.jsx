import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import VolunteerPill from './VolunteerPill';
import EmptyDisplay from './EmptyDisplay';
import FilterList from './FilterList';
import UserTable from './UserTable';
import { Button } from 'reactstrap';
import { ClearButton } from '../../Shared';
import { transparentize } from 'polished';

const Styled = {
  Container: styled.div`
    height: 100%;
    width: 100%;
    padding: 2rem 0
    background-color: ${props => props.theme.greyBg};
    display: flex;
    flex-direction: column;
    align-items: stretch;
  `,
  Top: styled.div`
    padding: 0 3rem;
  `,
  Title: styled.h1`
    font-size: 28px;
    margin-bottom: 1rem;
    color: #969696;
  `,
  Text: styled.p`
    font-size: 18px;
    margin: 0.5rem 0;
  `,
  Count: styled(VolunteerPill)`
    margin-right: 0.35rem;
    margin-left: 0.35rem;
  `,
  UserGrid: styled.div`
    flex-grow: 1;
    height: 100%;
    width: 100%;
    flex-shrink: 1;
    overflow: auto;
    background: ${props =>
      props.isEmpty ? transparentize(0.5, props.theme.grey10) : 'transparent'};
    margin: 1rem 0;
    padding: 0 1.5rem;
  `,
  FilterList: styled(FilterList)`
    margin-top: 1rem;
  `,
  EmptyDisplay: styled(EmptyDisplay)`
    margin: 5rem auto;
  `,
  ButtonSection: styled.div`
    padding: 0 2rem 0;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    flex-grow: 0;
    justify-content: flex-end;

    button {
      min-width: 7.5rem;

      &:not(:last-child) {
        margin-right: 0.75rem;
      }
    }
  `
};

const MailingListExpanded = ({
  listSize,
  filters,
  onClearFilter,
  onClearClick,
  onExportClick,
  onUserRemove,
  usersMap
}) => {
  const usersSeq = useMemo(
    () =>
      usersMap.valueSeq().map(({ user }) => ({
        ...user,
        inMailingList: true
      })),
    [usersMap]
  );
  const onUserToggle = useCallback(idx => () => onUserRemove(usersSeq.get(idx)._id), [
    onUserRemove,
    usersSeq
  ]);
  const isEmpty = listSize === 0;
  return (
    <Styled.Container>
      <Styled.Top>
        <Styled.Title>Mailing List</Styled.Title>
        <Styled.Text>
          Currently, you have <Styled.Count count={listSize} /> on your mailing list with
          {filters.length > 0 ? ' the filters:' : ' no filters.'}
        </Styled.Text>
        <Styled.FilterList filters={filters} clearFilter={onClearFilter} />
      </Styled.Top>
      <Styled.UserGrid isEmpty={isEmpty}>
        <UserTable onUserToggle={onUserToggle} users={usersSeq.toArray()} />
        {isEmpty && <Styled.EmptyDisplay />}
      </Styled.UserGrid>
      <Styled.ButtonSection>
        <ClearButton onClick={onClearClick} disabled={listSize === 0}>
          Clear List
        </ClearButton>
        <Button onClick={onExportClick} color="dark" disabled={listSize === 0}>
          Export
        </Button>
      </Styled.ButtonSection>
    </Styled.Container>
  );
};

export default MailingListExpanded;
