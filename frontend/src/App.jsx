import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { Header, Authenticated, Splash } from './components';
import { StyleProvider, RequestProvider } from './providers';

const Styled = {
  Container: styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
  `,
  Content: styled.main`
    flex: 1;
    height: 100%;
  `
};

class App extends Component {
  state = { isAuthenticated: true, user: { role: 'admin' }, token: '' };

  fakeAuth = _ => this.setState({ user: { role: null } });

  logout = e => {
    e.preventDefault();
    this.setState({ isAuthenticated: false, user: null });
    axios.get('/auth/logout');
    this.props.history.push('/');
  };
  auth = user => {
    this.setState({ isAuthenticated: true, user });
  };

  render() {
    const { isAuthenticated, user } = this.state;
    return (
      <StyleProvider>
        <RequestProvider>
          <Styled.Container>
            <Header
              onLogout={this.logout}
              loggedIn={isAuthenticated}
              role={user ? user.role : null}
            />
            <Styled.Content>
              {user ? <Authenticated user={user} /> : <Splash onAuth={this.fakeAuth} />}
            </Styled.Content>
          </Styled.Container>
        </RequestProvider>
      </StyleProvider>
    );
  }
}

export default withRouter(App);
