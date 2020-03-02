import React from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';
import ApplicantViewer from './ApplicantViewer';
import UserManager from './users/UserManager';
import Settings from './Settings/Settings';
import EventManager from './events/EventManager';

const Container = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;

class AdminDash extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.user);
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={ApplicantViewer} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/user-manager" component={UserManager} />
          <Route exact path="/events" component={EventManager} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Container>
    );
  }
}
export default AdminDash;
