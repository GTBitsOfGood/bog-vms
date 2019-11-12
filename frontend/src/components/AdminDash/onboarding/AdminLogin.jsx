import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Icon } from 'components/Shared';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import image from '../../../images/onboardingArt.png';
import logo from '../../../images/bog_logo.png';

const Styled = {
  Container: styled.div`
    width: 100%;
    height: 100%;
    background: ${props => props.theme.grey9};
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    align-items: space-between;
  `,
  ContainerTest: styled.div`
    display: flex; 
    align-items: space-between;
    flex-direction: column;
    margin-left: 8rem;
  `,
  ImgContainer: styled.div`
    display: flex;
    justify-content: center;
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
    border: none;
  `,
  ButtonContainer: styled.div`
    display: flex;
    justify-content: center;
    align-items: center
    flex-direction: row
  `
};

const AdminLogin = () => {
  const [loading] = useState(true);

  return (
    <Styled.Container>
      <Styled.ContainerTest style={{ marginTop: '5rem'}}>
        <Styled.ImgContainer style={{ marginTop: '10rem', marginBottom: '2rem'}}>
          <img style={{ width: '240px', height: '42px' }} alt="bogLogo" src={logo}/>
        </Styled.ImgContainer>
        <legend>Login</legend>
        <Form>
          <FormGroup style={{ border: 'none' }}>
            <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Styled.ButtonContainer>
            <Styled.Button>
                Login
            </Styled.Button>
            <Styled.Button>
              Forgot Password?
            </Styled.Button>
          </Styled.ButtonContainer>
          <FormText>
            Don't have an account? Let's set it up.
          </FormText>
        </Form>
      </Styled.ContainerTest>
      <Styled.ContainerTest>
        <Styled.ImgContainer>
          <img style={{ width: '720px', height: '783px' }}alt="onboardingImage" src={image} />
        </Styled.ImgContainer>
      </Styled.ContainerTest>
    </Styled.Container>
  );
};

export default AdminLogin;
