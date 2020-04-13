import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { login, getCurrentUser } from './queries';

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
  `
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false, user: null }
    // comment this in if you want user to be logged in by default
    // this.state = { isAuthenticated: true, user: { role: 'admin' }, token: '' };
  }

  componentWillMount() {
    this.getUser();

    // test volunteer view
    this.setState({volunteer: false});
  }

  fakeAuth = () => {
    this.setState({ isAuthenticated: true, user: { role: 'admin' }, token: '' });
  }

  loginAuth = (user, pass) => {
    login(user, pass)
      .then(res => {
        console.log("login response", res.data);
        if (res.status == 200) {
          this.setState({ isAuthenticated: true, user: { role: 'admin' }, token: '' });
        }
      })
      .catch(err => console.log('Error with login: ', err))
  }

  getUser = () => getCurrentUser()
    .then(response => {
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session')
        this.setState({
          isAuthenticated: true,
          user: { role: 'admin', username: response.data.user.username },
          hasLoaded: true
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          user: null,
          hasLoaded: true
        })
      }
    })
    .catch(e => console.log('Error retrieving current user: ', e));


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
    const { isAuthenticated, user, hasLoaded, volunteer } = this.state;
    return (
      <div id="wrapper">
        {hasLoaded ?
          <StyleProvider>
            <RequestProvider>
              <Styled.Container>
                <Header
                  onLogout={this.logout}
                  loggedIn={isAuthenticated}
                  role={user ? user.role : null}
                  volunteer={volunteer}
                />

                <Styled.Content>
                  {user ? <Authenticated user={user} /> : <Splash onAuth={this.loginAuth} />}
                </Styled.Content>
              </Styled.Container>
            </RequestProvider>
          </StyleProvider>
          :
          <div />
        }

      </div>
    );
  }
}

export default withRouter(App);
