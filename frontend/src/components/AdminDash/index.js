import React from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import ApplicantViewer from './ApplicantViewer';
import UserManager from './user/UserManager';
import EventManager from './events/EventManager';
import OnboardingManager from './onboarding/OnboardingManager';
import OnboardingCreate from './onboarding/OnboardingCreate';
import Onboarding1 from './onboarding/Onboarding1';
import Onboarding2 from './onboarding/Onboarding2';
import Onboarding3 from './onboarding/Onboarding3';
import Onboarding4 from './onboarding/Onboarding4';
import loggedin from './onboarding/Loggedin'


const Container = styled.div`
  background: white;
  height: 100%;
  width: 100%;
`;

class AdminDash extends React.Component {
  state = {
    redirectToViewer: false
  };
  componentDidMount = () => {
    if (window.location.pathname === '/') {
      this.setState({ redirectToViewer: true });
    }
  };
  renderRedirect() {
    if (this.state.redirectToViewer) {
      return <Redirect to="/applicant-viewer" />;
    }
  }
  render() {
    return (
      <Container>
        {this.renderRedirect()}
        <Route path="/applicant-viewer" component={ApplicantViewer} />
        <Route path="/user-manager" component={UserManager} />
        <Route path="/events" component={EventManager} />
        <Route path="/onboarding-manager" component={OnboardingManager} />
        <Route path="/onboarding1" component={Onboarding1} />
          <Route path="/onboarding2" component={Onboarding2} />
          <Route path="/onboarding3" component={Onboarding3} />
          <Route path="/onboarding4" component={Onboarding4} />
      </Container>
    );
  }
}
export default AdminDash;
