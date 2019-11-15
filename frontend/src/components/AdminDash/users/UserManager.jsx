import React from 'react';
import UserTable from './UserTable';
import styled from 'styled-components';
import { fetchUserManagementData, fetchUserCount } from '../queries';
import { Button } from 'reactstrap';
import FilterSidebar from './FilterSidebar';
import InfiniteScroll from 'components/Shared/InfiniteScroll';
import MailingListCollapsed from './MailingListCollapsed';
import MailingListExpanded from './MailingListExpanded';
import { LeftCaretIcon } from 'components/Shared/Icon';
import update from 'immutability-helper';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ListContainer: styled.div`
    height: 100%;
    width: 100%;
  `,
  MailingListContainer: styled.div`
    position: relative;
    height: 100%;
    width: ${props => (props.collapsed ? '25rem' : '100%')};
    ${props => !props.collapsed && 'margin-left: 2rem;'}
  `,
  ToggleButton: styled(Button)`
    position: absolute;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    top: 50%;
    left: -20px;
    width: 40px;
    height: 40px;
    background: white;
    border: none;
    border-radius: 50%;
    color: #969696;
    ${props => !props.collapsed && 'transform: rotate(180deg);'}

    :focus {
      box-shadow: none;
    }

    ${props => props.disabled && 'background: white !important'}
  `,
  ToBeginningButton: styled(Button)`
    background: white;
    border: none;
    margin-left: auto;
    margin-right: 1rem;
  `
};

class UserManager extends React.Component {
  state = {
    users: [],
    isLoading: false,
    collapsed: true
  };

  componentDidMount() {
    this.loadMoreUsers();
  }

  loadMoreUsers = () => {
    const { users } = this.state;
    const lastPaginationId = users.length ? users[users.length - 1]._id : 0;
    this.setState({
      isLoading: true
    });
    fetchUserManagementData(lastPaginationId).then(result => {
      if (result && result.data && result.data.users) {
        this.setState(({ users }) => ({
          users: users.concat(result.data.users),
          isLoading: false
        }));
      }
    });
  };

  onEditUser = () => {};

  onToggleUserMailingList = idx => () => {
    this.setState(({ users }) => ({
      users: update(users, { [idx]: { inMailingList: { $set: !users[idx].inMailingList } } })
    }));
  };

  render() {
    const { isLoading, users, collapsed } = this.state;
    return (
      <Styled.Container>
        <FilterSidebar />
        {collapsed && (
          <Styled.ListContainer>
            <InfiniteScroll loadCallback={this.loadMoreUsers} isLoading={isLoading}>
              <UserTable
                users={users}
                editUserCallback={this.onEditUser}
                onUserToggle={this.onToggleUserMailingList}
              />
            </InfiniteScroll>
          </Styled.ListContainer>
        )}
        <Styled.MailingListContainer collapsed={collapsed}>
          <Styled.ToggleButton collapsed={collapsed} onClick={this.onToggleCollapse}>
            <LeftCaretIcon />
          </Styled.ToggleButton>
          {collapsed ? <MailingListCollapsed /> : <MailingListExpanded />}
        </Styled.MailingListContainer>
      </Styled.Container>
    );
  }
}

export default UserManager;
