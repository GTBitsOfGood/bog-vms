import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Route, Redirect, Switch } from 'react-router-dom';
import OnboardingManager from './onboarding/OnboardingManager';
import Onboarding1 from './onboarding/Onboarding1';
import Onboarding2 from './onboarding/Onboarding2';
import Onboarding3 from './onboarding/Onboarding3';
import Onboarding4 from './onboarding/Onboarding4';

const Styled = {
  Container: styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
  `
};

const Splash = () => {
  return (
    <Styled.Container>
      <Switch>
        <Route exact path="/" component={OnboardingManager} />
        <Route exact path="/onboarding1" component={Onboarding1} />
        <Route exact path="/onboarding2" component={Onboarding2} />
        <Route exact path="/onboarding3" component={Onboarding3} />
        <Route exact path="/onboarding4" component={Onboarding4} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Styled.Container>
  );
};

export default Splash;
