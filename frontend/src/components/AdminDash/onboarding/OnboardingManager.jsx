import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Icon } from 'components/Shared';

import image from '../../../images/onboardingArt.png';

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
  HeaderContainer: styled.div`
    width: 95%;
    max-width: 80rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  `,
  Button: styled(Button)`
    background: white;
    border: none;
  `
};

const OnboardingManager = () => {
  const [loading] = useState(true);

  return (
    <Styled.Container>
      <Styled.HeaderContainer>
      </Styled.HeaderContainer>
      <Styled.Container>
        <img alt="onboardingImage" src={image} />
      </Styled.Container>
    </Styled.Container>
  );
};

export default OnboardingManager;
