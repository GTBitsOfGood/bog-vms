import React from 'react';
import UserTable from './UserTable';
import styled from 'styled-components';
import { fetchUserManagementData, fetchUserCount } from '../queries';
import { Button } from 'reactstrap';
import InfiniteScroll from 'components/Shared/InfiniteScroll';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        <InfiniteScroll loadCallback={this.loadMoreUsers} isLoading={isLoading}>
          <UserTable users={users} editUserCallback={this.onEditUser} />
        </InfiniteScroll>
      </Styled.Container>
    );
  }
}

export default UserManager;
