import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';
import ApplicantViewer from './ApplicantViewer';
import UserManager from './users/UserManager';
import Settings from './users/Settings';
import {EventManager, EventPageManager } from './events/EventManager';

const Container = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;

class AdminDash extends React.Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={ApplicantViewer} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/user-manager" component={UserManager} />
          <Route path="/events" component={EventPageManager} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    );
  }
}
export default AdminDash;
