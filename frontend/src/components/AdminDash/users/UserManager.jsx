import React from 'react';
import UserTable from './UserTable';
import styled from 'styled-components';
import { fetchUserManagementData, fetchUserCount } from '../queries';
import { Button } from 'reactstrap';
import FilterSidebar from './FilterSidebar';
import InfiniteScroll from 'components/Shared/InfiniteScroll';
import MailingListCollapsed from './MailingListCollapsed';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    display: flex;
    flex-direction: row;
    align-items: center;
  `,
  ListContainer: styled.div`
    height: 100%;
    width: 100%;
  `,
  Button: styled(Button)`
    background: white;
    border: none;

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
    isLoading: false
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

  render() {
    const { isLoading, users } = this.state;
    return (
      <Styled.Container>
        <FilterSidebar />
        <Styled.ListContainer>
          <InfiniteScroll loadCallback={this.loadMoreUsers} isLoading={isLoading}>
            <UserTable users={users} editUserCallback={this.onEditUser} />
          </InfiniteScroll>
        </Styled.ListContainer>
        <MailingListCollapsed />
      </Styled.Container>
    );
  }
}

export default UserManager;
